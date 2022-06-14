import axios from 'axios'

export const getUserInfo = (user_id) => {
    return axios.get(
        `https://slack.com/api/users.info&user=${user_id}&pretty=1`, 
        {
            headers: {'Content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + `${process.env.REACT_APP_TOKEN}`}
        }
    )
}