export const MODIFY_GAME_SETTING = 'MODIFY_GAME_SETTING'
export const modifyGameSetting = (settingName, value) => ({
    type: MODIFY_GAME_SETTING,
    payload: {settingName, value}
})

export const REPLACE_GAME_SETTING = 'REPLACE_GAME_SETTING'
export const replaceGameSetting = (settings) => ({
    type: REPLACE_GAME_SETTING,
    payload: settings
})