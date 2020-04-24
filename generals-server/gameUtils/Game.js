import { generateMap } from "./mapUtils"
import { MOVE_TO_RESP_RATIO } from "../config"
import {flatten, uniq} from 'lodash'
import { notifyRemovedCommands, notifyPeaceEnd, notifyLost, notifyNextBoard, notifyNextStats, notifyGameEnd, notifyCooldownTic, notifySound_conquerCastle, notifySound_archeryShooted, notifySound_autumn, notifySound_conquerCapitol, notifySound_lostCapitol } from "./InstantActions"
import { abilities } from './Abilities'

const isCapitol = (type) => type === 'capitol' || type === 'defendedCapitol'

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
            nonAggression,
            castlesDensity,
            mountainDensity,
            castleProduction,
            fieldProduction,
            turnDuration,
            archeryTowersDensity,
            observerTowersDensity,
            abandonedFortressesDensity
        } = settings

        this.tourCounter = 0
        this.unitMovesCounter = 0
        this.intervalId = null
        this.players = [...players]
        this.playerIdToTeam = players.reduce((acc, v) => ({...acc, [v.socketId]: v.teamId}), {})
        this.roomId = players[0].roomId
        this.nonAggression = nonAggression
        this.turnDuration = turnDuration
        this.CASTLE_INSTANTIATION_INTERVAL = castleProduction
        this.UNITS_INSTANTIATION_INTERVAL = fieldProduction
        this.usersStats = null
        this.isNonAggresionPactValid = true
        this.isGameOver = false
        this.activeDefenders = []
        // TO FIX
        // coordinates missmatch
        this.board = generateMap({
            width: mapHeight, 
            height: mapWidth,
            castles: (mapWidth + mapHeight) * 0.75 * castlesDensity,
            archeryTowers: (mapWidth + mapHeight) * 0.2 * archeryTowersDensity,
            observerTowers: (mapWidth + mapHeight) * 0.2 * observerTowersDensity,
            abondedFotresses: (mapWidth + mapHeight) * 0.05 * abandonedFortressesDensity,
            mountains: (mapWidth * mapHeight) * 0.22 * mountainDensity,
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
        Object.keys(this.moves).forEach(socketId => {
            let moves = this.moves[socketId]
            let executableIndex = moves.findIndex(v => this.isCommandExecutable(v, socketId))
            if (executableIndex >= 0) {
                this.executeCommand(moves[executableIndex], socketId)
                notifyRemovedCommands(
                    socketId,
                    moves.slice(0, executableIndex + 1).map(v => v.id)
                )
                this.moves[socketId] = moves.slice(executableIndex + 1)
            } else {
                notifyRemovedCommands(socketId, moves.map(v => v.id))
                this.moves[socketId] = []
            }
        })
        
        if (this.unitMovesCounter % MOVE_TO_RESP_RATIO === 0) {
            this.tourCounter++
            this.instantiateUnits()
            this.recalculateDefenders()
            notifyCooldownTic(this.roomId)
        }

        this.unitMovesCounter++
        
        if (this.tourCounter === this.nonAggression) {
            this.isNonAggresionPactValid = false
            notifyPeaceEnd(this.roomId)
        }
        
        this.refreshStats()
        
        const remainingTeamIds = uniq(
            this.players
                .filter(v => this.usersStats[v.socketId].units > 0)
                .map(v => v.teamId)
        )

        if (remainingTeamIds.length === 1) {
            console.log('Game Over!')
            this.isGameOver = true
            notifyGameEnd(this.roomId)
        }
    }

    refreshStats() {
        const nextUserStats = this.calculateUserStats()
        if(this.usersStats) {
            Object.keys(nextUserStats)
                .filter(v => nextUserStats[v].units === 0 && this.usersStats[v].units > 0)
                .forEach(v => notifyLost(v))
        }

        this.usersStats = nextUserStats
        notifyNextBoard(this.roomId, this.board)
        notifyNextStats(this.roomId, {
            usersStats: this.usersStats,
            tourCounter: this.tourCounter
        })
    }

    calculateUserStats() {
        const userStats = this.players.reduce((acc, v) => ({
            ...acc, 
            [v.socketId]: {
                units: 0,
                lands: 0,
                castle: 0,
                archeryTower: 0,
                observerTower: 0,
                abandonedFortress: 0,
                ownedSpecialFields: []
            }
        }), {})

        flatten(this.board)
            .forEach((field) => {
                const {owner, units, type} = field
                if (owner == 'n') return
                const stats = userStats[owner]
                stats.units += units
                stats.lands++
                if (type === 'plain') return
                if (type === 'castle' || isCapitol(type)) stats.castle++ 
                if(type === 'archeryTower') stats.archeryTower++
                if(type === 'observerTower') stats.observerTower++
                if(type === 'abandonedFortress') stats.abandonedFortress++
                stats.ownedSpecialFields.push(field)
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

        if(this.playerIdToTeam[toField.owner] === this.playerIdToTeam[fromField.owner]) {
            if (!isCapitol(toField.type)) {
                toField.owner = socketId
            }
            toField.units += movedUnits
            return
        }

        if (toField.type === 'defendedCapitol') toField.units = toField.units * 2
        if (toField.units < movedUnits) {
            if (isCapitol(toField.type)) {
                this.conquerPlayer(fromField.owner, toField.owner, toField)
                toField.type = 'castle'
            }
            else if (toField.type === 'castle') {
                notifySound_conquerCastle(fromField.owner)
            }
            toField.owner = socketId
        }
        
        toField.units = Math.abs(toField.units - movedUnits)
        if (toField.type === 'defendedCapitol' && toField.owner !== fromField.owner) toField.units = Math.floor(toField.units/2)
    }

    instantiateUnits() {
        const ocupiedFields = flatten(this.board).filter(v => v.owner != 'n')
        if (this.tourCounter % this.UNITS_INSTANTIATION_INTERVAL === 0){
            ocupiedFields.forEach(v => v.units++)
        } else if(this.tourCounter % this.CASTLE_INSTANTIATION_INTERVAL === 0) {
            ocupiedFields
                .filter(v =>  isCapitol(v.type) || v.type === 'castle')
                .forEach(v => v.units++)
        }
    }

    conquerPlayer(agressorId, victimId, capitolField) {
        flatten(this.board)
            .filter(v => v.owner === victimId)
            .forEach(v => {
                v.owner = agressorId
                v.units = Math.ceil(v.units / 2)
            })

        notifySound_conquerCapitol(agressorId)
        notifySound_lostCapitol(victimId)
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
                this.playerIdToTeam[toField.owner] !== this.playerIdToTeam[fromField.owner]
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

    getBoardField = ({x, y}) => this.board[y] && this.board[y][x]
    getCurrentPlayerCapitol = (playerId) => flatten(this.board).find(v => isCapitol(v.type) && v.owner === playerId)
    // Instant Actions
    reborn(playerId, coordinates) {
        const field = this.getBoardField(coordinates)
        const {cost} = abilities.reborn
        if(field.type !== 'castle') return console.log('Can not reborn outside of the castle')
        if(field.units < cost) return console.log('Not enough units')
        if(this.playerIdToTeam[playerId] !== this.playerIdToTeam[field.owner]) return console.log('Can not reborn on enemy grounds')
        if(this.usersStats[playerId].lands) return console.log('Can not reborn alive player')
        this.usersStats[playerId].lands = 1

        field.type = 'capitol'
        field.owner = playerId
        field.units -= cost
        return true
    }

    moveCapitol(playerId, coordinates) {
        const field = this.getBoardField(coordinates)
        const currentCapitol = this.getCurrentPlayerCapitol(playerId)
        const {cost} = abilities.moveCapitol

        if (!currentCapitol) return console.log('No capitol for player found')
        if (currentCapitol.units < cost) return console.log('Not enough units in capitol')
        if (field.type !== 'castle') return console.log('Capitol can be moved only to other, own castle')
        if (field.owner !== playerId) return console.log('Can not move capitol to another player')

        field.type = currentCapitol.type
        currentCapitol.type = 'castle'
        currentCapitol.units -= cost

        return true
    }

    plowField(playerId, coordinates) {
        const field = this.getBoardField(coordinates)
        const currentCapitol = this.getCurrentPlayerCapitol(playerId)
        const {cost} = abilities.plowingField

        if (!currentCapitol) return console.log('No capitol for player found')
        if (currentCapitol.units < cost) return console.log('Not enough units in capitol')
        if (field.type !== 'plain') return console.log('Only plain fields can be plowned')
        if (field.owner !== playerId) return console.log('Can not plowned other player fields')

        currentCapitol.units -= cost

        field.units = null
        field.owner = 'n'
        return true
    }

    unite(playerId) {
        const currentCapitol = this.getCurrentPlayerCapitol(playerId) 
        if(!currentCapitol) return console.log('No capitol for player')
        const playerGrounds = flatten(this.board)
                                .filter(v => v.owner === playerId)

        const totalArmy = playerGrounds.reduce((acc, v) => acc + v.units, 0)
        playerGrounds.forEach(v => {
            v.units = null
            v.owner = 'n'
        })

        currentCapitol.owner = playerId
        currentCapitol.units = totalArmy
        return true
    }

    defender(playerId) {
        const currentCapitol = this.getCurrentPlayerCapitol(playerId) 
        if(!currentCapitol) return console.log('No capitol for player')

        const {cost, duaration} = abilities.defender
        if(currentCapitol.units < cost) return console.log('Not enough units')

        currentCapitol.units -= cost
        currentCapitol.type = 'defendedCapitol'
        this.activeDefenders.push({playerId, duaration})
        return true
    }

    // sepcial buildings
    getSpecialField(playerId, buildingType, cost) {
        const currentCapitol = this.getCurrentPlayerCapitol(playerId) 
        if(!currentCapitol) return console.log('No capitol for player')
        const fields = this.usersStats[playerId].ownedSpecialFields.filter(v => v.type === buildingType && v.units >= cost)
        if (!fields[0]) return console.log(`No required fields with enough quantity of units | ${buildingType} ${cost}`)
        fields[0].units -= cost
        return fields[0]
    }

    archeryFire(playerId, coordinates) {
        const {cost} = abilities.archeryFire
        if(!this.getSpecialField(playerId, 'archeryTower', cost)) return

        const {x, y} = coordinates
        const affectedFields = []
        for (let iX = (x - 1); iX <= (x + 1);  iX++) {
            for (let iY = (y - 1); iY <= (y + 1);  iY++) {
                affectedFields.push(this.getBoardField({x: iX, y: iY}))
            }
        }

        affectedFields
            .filter(v => v && v.units)
            .forEach(v => {
                v.units = Math.ceil(v.type === 'plain'
                    ? 0.5 * v.units
                    : 0.8 * v.units 
                )
            })

        uniq(
            affectedFields
                .map(v => v.owner)
                .filter(v => v != 'n')
        ).forEach(v => notifySound_archeryShooted(v))

        return true
    }

    scanArea(playerId, coordinates) {
        const {cost} = abilities.scan
        if(!this.getSpecialField(playerId, 'observerTower', cost)) return
        return true
    }

    revealCapitols(playerId) {
        const {cost} = abilities.revealCapitols
        const currentCapitol = this.getCurrentPlayerCapitol(playerId) 
        if(!currentCapitol) return console.log('No capitol for player')
        if(currentCapitol.units < cost) return console.log('Not enough units')

        currentCapitol.units -= cost
        return true
    }

    autumn(playerId) {
        const {cost} = abilities.scan
        if(!this.getSpecialField(playerId, 'abandonedFortress', cost)) return
        flatten(this.board)
            .forEach((field) => {
                const {type} = field
                if(field.owner === 'n') return
                if (type != 'plain' && type != 'capitol' && type != 'defendedCapitol') {
                    field.owner = 'n'
                    field.units = 10
                } else {
                    field.units = 1
                }
            })

        notifySound_autumn(this.roomId)
        return true
    }
    

    recalculateDefenders() {
        this.activeDefenders.forEach((v) => {
            if(--v.duaration > 0) return
            const capitol = this.getCurrentPlayerCapitol(v.playerId)
            if(capitol) capitol.type = 'capitol'
        })
        this.activeDefenders = this.activeDefenders.filter(v => v.duaration)
    }
} 