const sessionStorage = window.sessionStorage

export const setSessionUser = (access_token, user_id) => {
    const sessionUser = JSON.stringify({ access_token, user_id })
    sessionStorage.setItem('oauth-test', sessionUser)
}

export const getSessionUser = () => {
    const sessionUser = JSON.parse(sessionStorage.getItem('oauth-test'))
    return sessionUser
}