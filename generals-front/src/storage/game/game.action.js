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

export const REMOVE_COMMANDS = 'game.removeCommands'
export const removeCommands = (commandIds) => ({
    type: REMOVE_COMMANDS,
    payload: commandIds
})

export const SET_PLAYER_ROLE = 'game.setPlayerRole'
export const setPlayerRole = (role) => ({
    type: SET_PLAYER_ROLE,
    payload: role
})

export const UPDATE_STATS = 'game.updateStats'
export const updateStats = (stats) => ({
    type: UPDATE_STATS,
    payload: stats
})

export const SET_MOVE_TYPE = 'game.setMoveType'
export const setMoveType = (type) => ({
    type: SET_MOVE_TYPE,
    payload: type
})