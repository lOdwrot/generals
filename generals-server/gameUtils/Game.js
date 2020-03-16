import { generateMap } from "./mapUtils"


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
    constructor(players) {
        this.tourCounter = 0
        this.intervalId = null
        this.board = generateMap({
            width: 16, 
            height: 16,
            castles: 12,
            mountains: 28,
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
        this.tourCounter++

        return removedCommands
    }

    executeCommand(command, socketId) {
        switch (command.type) {
            case 'MOVE_ALL': {
                const {from, direction} = command
                const to = getNextCoordinates(from, direction)

                const fromField = this.getBoardField(from)
                const toField = this.getBoardField(to)
                toField.units = fromField.units - 1
                fromField.units = 1
                toField.owner = socketId
                break;
            }
            default:
                break;
        }
    }

    isCommandExecutable(command, socketId) {
        if (command.type === 'MOVE_ALL') {
            const {from, direction} = command
                const to = getNextCoordinates(from, direction)

                const fromField = this.getBoardField(from)
                const toField = this.getBoardField(to)

                if(
                    !fromField || !toField ||
                    fromField.owner != socketId ||
                    fromField.units < 2 ||
                    toField.type === 'mountain'
                ) return false
        }

        return true
    }

    getBoardField = ({x, y}) => this.board[y][x]
} 