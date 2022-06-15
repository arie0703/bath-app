import axios from 'axios'

export const getUserInfo = (user_id) => {

    const params = new URLSearchParams(window.location.search)
    params.append('token', process.env.REACT_APP_SLACK_TOKEN)
    params.append('user', user_id)

    return axios.post(
        'https://slack.com/api/users.info', 
        params,
        {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }
    )
}