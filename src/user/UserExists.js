import axios from 'axios'

export const userExists = (user_id) => {


    var headers = {
        "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET
    };

    return axios({
        url: process.env.REACT_APP_HASURA_ENDPOINT + 'users/slack_id/' + user_id,
        method: 'GET',
        headers: headers
    });
}