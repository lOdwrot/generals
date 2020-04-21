import * as actions from './settings.action'


const INITIAL_STATE = ({
    privateSettings: {},
    gameSettings: {
        mapWidth: 20,
        mapHeight: 20,
        gameMode: 'Conquest',
        nonAggression: 50,
        castlesDensity: 0.5,
        mountainDensity: 0.5,
        archeryTowersDensity: 0.3,
        observerTowersDensity: 0.3,
        abandonedFortressesDensity: 0.3,
        castleProduction: 1,
        fieldProduction: 25,
        turnDuration: 1000,
    }
})

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.REPLACE_GAME_SETTING:
            return {...state, gameSettings: action.payload}
        case actions.MODIFY_GAME_SETTING:{
            const {settingName, value} = action.payload
            return {...state, gameSettings: {...state.gameSettings, [settingName]: value}}
        }
        default:
            return state
    }
}