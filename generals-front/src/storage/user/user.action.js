export const SET_USER_NAME = 'user.setName'
export const setUserName = (name) => ({
    type: SET_USER_NAME,
    payload: name
})

export const SET_USER = 'user.setUser'
export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})