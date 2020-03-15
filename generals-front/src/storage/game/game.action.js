export const SET_PLAYERS = 'game.setPlayers'
export const setPlayers = (players) => ({
    type: SET_PLAYERS,
    payload: players
})

export const SET_BOARD = 'game.setBoard'
export const setBoard = (board) => ({
    type: SET_BOARD,
    payload: board
})

export const SET_ACTIVE_FIELD = 'game.setActiveField'
export const setActiveField = (coordinates) => ({
    type: SET_ACTIVE_FIELD,
    payload: coordinates
})

export const SET_COMMANDS = 'game.setCommands'
export const setCommands = (commands) => ({
    type: SET_COMMANDS,
    payload: commands
})