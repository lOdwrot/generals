import { generateMap } from "./mapUtils"
import { MOVE_TO_RESP_RATIO } from "../config"


const getNextCoordinates = (from, direction) => {
    let x = from.x
    let y = from.y

    if (direction === 'u') y--
    if (direction === 'd') y++
    if (direction === 'l') x--
    if (direction === 'r') x++
    return {x, y}
}

export class Game {
    UNITS_INSTANTIATION_INTERVAL = 2500
    CASTLE_INSTANTIATION_INTERVAL = 1

    constructor(players, settings) {
        const {
            mapWidth,
            mapHeight,
            gameMode,
            nonAggression,
            castlesDensity,
            mountainDensity,
            castleProduction,
            fieldProduction,
            turnDuration,
        } = settings

        this.tourCounter = 0
        this.intervalId = null
        this.loosers = []
        this.players = players
        this.nonAggression = nonAggression
        this.turnDuration = turnDuration
        this.CASTLE_INSTANTIATION_INTERVAL = castleProduction
        this.UNITS_INSTANTIATION_INTERVAL = fieldProduction
        this.usersStats = null
        this.isNonAggresionPactValid = true
        // TO FIX
        // coordinates missmatch
        this.board = generateMap({
            width: mapHeight, 
            height: mapWidth,
            castles: (mapWidth + mapHeight) * 0.75 * castlesDensity,
            mountains: (mapWidth * mapHeight) * 0.2 * mountainDensity,
            players: players.map(v => v.socketId)
        }),
        this.moves = players.reduce((acc, user) => ({
            ...acc,
            [user.socketId]:  []
        }), {})
    }

    addCommand(socketId, command) {
        this.moves[socketId].push(command)
    }

    tic() {
        const removedCommands = {}

        Object.keys(this.moves).forEach(socketId => {
            let moves = this.moves[socketId]
            let executableIndex = moves.findIndex(v => this.isCommandExecutable(v, socketId))
            if (executableIndex >= 0) {
                this.executeCommand(moves[executableIndex], socketId)
                removedCommands[socketId] = moves
                                            .filter((v, index) => index <= executableIndex)
                                            .map(v => v.id)
                this.moves[socketId] = moves.slice(executableIndex + 1)
            } else {
                removedCommands[socketId] = moves.map(v => v.id)
                this.moves[socketId] = []
            }
        })
        
        if (this.tourCounter % MOVE_TO_RESP_RATIO === 0) this.instantiateUnits()
        
        if (this.tourCounter === this.nonAggression) this.isNonAggresionPactValid = false
        this.tourCounter++
        
        const nextUserStats = this.calculateUserStats()
        let newLoosers = this.usersStats 
                            ? Object.keys(nextUserStats)
                                .filter(v => nextUserStats[v].units === 0 && this.usersStats[v].units > 0)
                            : []

        this.usersStats = nextUserStats
        return {
            usersStats: this.usersStats,
            tourCounter: this.tourCounter,
            removedCommands,
            newLoosers,
        }
    }

    calculateUserStats() {
        const userStats = this.players.reduce((acc, v) => ({
            ...acc, 
            [v.socketId]: {
                units: 0,
                lands: 0,
                castles: 0
            }
        }), {})

        this.board
            .flat()
            .forEach(({owner, units, type}) => {
                if (owner == 'n') return
                const stats = userStats[owner]
                stats.units += units
                stats.lands++
                if (type === 'castle' || type === 'capitol') {
                    stats.castles++ 
                }
            })

        return userStats
    }

    executeCommand(command, socketId) {
        switch (command.type) {
            case 'MOVE_ALL': {
                this.move(command, socketId, 'all')
                break;
            }
            case 'MOVE_HALF': {
                this.move(command, socketId, 'half')
                break;
            }
            default:
                break;
        }
    }

    move({from, direction}, socketId, type) {
        const to = getNextCoordinates(from, direction)

        const fromField = this.getBoardField(from)
        const toField = this.getBoardField(to)
        const movedUnits = (type == 'all')
            ? fromField.units - 1
            : Math.floor(fromField.units / 2)

        fromField.units = fromField.units - movedUnits

        if(toField.owner === fromField.owner) {
            toField.units += movedUnits
            return
        }

        if (toField.units < movedUnits) {
            if (toField.type == 'capitol') {
                this.conquerPlayer(fromField.owner, toField.owner, toField)
            }
            toField.owner = socketId
        }
        
        toField.units = Math.abs(toField.units - movedUnits)
    }

    instantiateUnits() {
        const ocupiedFields = this.board.flat().filter(v => v.owner != 'n')
        if (this.tourCounter % this.UNITS_INSTANTIATION_INTERVAL === 0){
            ocupiedFields.forEach(v => v.units++)
        } else if(this.tourCounter % this.CASTLE_INSTANTIATION_INTERVAL === 0) {
            ocupiedFields
                .filter(v => v.type === 'capitol' || v.type === 'castle')
                .forEach(v => v.units++)
        }
    }

    conquerPlayer(agressorId, victimId, capitolField) {
        this.loosers.push(victimId)
        this.board
            .flat()
            .filter(v => v.owner === victimId)
            .forEach(v => v.owner = agressorId)

        capitolField.type = 'castle'
    }

    isCommandExecutable(command, socketId) {
        if (command.type === 'MOVE_ALL') {
            const {from, direction} = command
            const to = getNextCoordinates(from, direction)

            const fromField = this.getBoardField(from)
            const toField = this.getBoardField(to)

            if(
                this.isNonAggresionPactValid && 
                toField.owner !== 'n' &&
                toField.owner !== fromField.owner
            ) return false

            if(
                !fromField || !toField ||
                fromField.owner != socketId ||
                fromField.units < 2 ||
                toField.type === 'mountain'
            ) return false
        }

        return true
    }

    eraseCommands(socketId, commandIds) {
        this.moves[socketId] = this.moves[socketId]
                                .filter(v => !commandIds.includes(v.id))
    }

    getBoardField = ({x, y}) => this.board[y][x]
    getWinner = () => {
        if(this.players.length - this.loosers.length > 1) return
        return this.players.find(v => !this.loosers.includes(v.socketId))
    }
} 