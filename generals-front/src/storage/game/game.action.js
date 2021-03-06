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

export const SET_ABILITY_SELECTION = 'game.abilitySelection'
export const setAbilitySelection = (ability) => ({
    type: SET_ABILITY_SELECTION,
    payload: ability
})

export const SET_COOLDOWN = 'game.setCooldown'
export const setCooldown = (name, value) => ({
    type: SET_COOLDOWN,
    payload: {[name]: value}
})

export const COOLDOWN_TIC = 'game.cooldownTic'
export const cooldownTic = () => ({
    type: COOLDOWN_TIC,
})

export const ADD_AILITY_VISIBLE_FIELDS = 'game.addAbilityVisibleFields'
export const addAbilityVisibleFields = (fieldsList) => ({
    type: ADD_AILITY_VISIBLE_FIELDS,
    payload: fieldsList
})

export const ADD_PASSIVE_ABILITY = 'game.addPassiveAbility'
export const addPassiveAbility = (ability) => ({
    type: ADD_PASSIVE_ABILITY,
    payload: ability
})