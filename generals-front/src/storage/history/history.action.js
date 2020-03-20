export const ERASE_HISTORY = 'history.erase'
export const eraseHistory = () => ({
    type: ERASE_HISTORY
})

export const SET_USER_COLORS = 'history.setUserColors'
export const setUserColorsInHistory = (userColors) => ({
    type: SET_USER_COLORS,
    payload: userColors
})