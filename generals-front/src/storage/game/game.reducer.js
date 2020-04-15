import * as actions from './game.action'

const INIT_COOLDOWNS = {
    reborn: 0,
    unite: 0,
    moveCapitol: 0,
    defender: 0,
    plowingField: 0,
    scan: 0,
    autumn: 0,
    archery: 0
}

const INITIAL_STATE = {
    players: [],
    playerIdToTeamId: {},
    board: [[]],
    activeField: {x: -1, y: -1},
    commands: [],
    userColors: {},
    usersStats: {},
    tourCounter: 0,
    playerRole: 'lobby',
    moveType: 'all',
    abilitySelection: null,
    activeDefenders: [],
    cooldowns: INIT_COOLDOWNS
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.SET_PLAYERS:
            return {
                ...state, 
                players: action.payload,
                playerIdToTeamId: action.payload.reduce((acc, v) => ({...acc, [v.socketId]: v.teamId}), {}),
                userColors: action.payload.reduce((acc, v) => ({...acc, [v.socketId]: v.color}), {})
            }
        case actions.SET_BOARD:
            return {...state, board: action.payload}
        case actions.SET_ACTIVE_FIELD:
            return {...state, activeField: action.payload, moveType: 'all'}
        case actions.SET_COMMANDS:
            return {...state, commands: action.payload}
        case actions.REMOVE_COMMANDS:
            return {...state, commands: state.commands.filter(v => !action.payload.includes(v.id))}
        case actions.SET_PLAYER_ROLE:
            return {...state, playerRole: action.payload, cooldowns: INIT_COOLDOWNS}
        case actions.UPDATE_STATS:
            return {...state, ...action.payload}
        case actions.SET_MOVE_TYPE:
            return {...state, moveType: action.payload}
        case actions.SET_ABILITY_SELECTION:
            return {...state, abilitySelection: action.payload}
        case actions.SET_COOLDOWN:
            return {...state, cooldowns: {...state.cooldowns, ...action.payload}}
        case actions.COOLDOWN_TIC:{
            const nextCooldowns = {...state.cooldowns}
            Object.keys(nextCooldowns).forEach(key => nextCooldowns[key] && nextCooldowns[key]--)
            return {...state, cooldowns: nextCooldowns}
        }
        default:
            return state
    }
}