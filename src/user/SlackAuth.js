import axios from 'axios'

export const getUser = () => {
    const params = new URLSearchParams(window.location.search)
    params.append('code', params.get('code'))
    params.append('state', params.get('state'))
    params.append('client_id', process.env.REACT_APP_SLACK_CLIENT_ID)
    params.append('client_secret', process.env.REACT_APP_SLACK_CLIENT_SECRET)
    // params.append('redirect_uri', process.env.REACT_APP_SLACK_REDIRECT_URI)

    return axios.post(
        'https://slack.com/api/oauth.access', 
        params,
        {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const slackLoginURI = `https://slack.com/oauth/authorize?client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&amp;scope=identify`