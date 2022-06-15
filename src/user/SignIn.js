import React, { useEffect, useState } from 'react'
import '../css/form.css';
import { Redirect } from 'react-router-dom';
import { getUser } from './SlackAuth';
import { setSessionUser, getSessionUser } from './Session';
import axios from 'axios'
import { userExists } from './UserExists';

const SignIn = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isUserExists, setIsUserExists] = useState(false)


  useEffect(() => {
    (async () => {
      const queryPrams = new URLSearchParams(window.location.search);
      const token = queryPrams.get('code');

      if(token) {
        try {
          const response = await getUser()
          setSessionUser(response.data.access_token, response.data.user_id)
          window.location.href = process.env.REACT_APP_SLACK_REDIRECT_URI
          console.log(response)
        } catch (err) {
          console.log(err)
        }
        const slackData = getUser();
        console.log(slackData);
      } else {
        if (getSessionUser()) {
            const res = await userExists(getSessionUser().user_id);
            if (res.data.users) {
              setIsUserExists(true)
              setIsAuthenticated(true)
              console.log(isUserExists, isAuthenticated)
            }
        } else {
            setHasError(true)
        }
      }
    })()
  },[]);

  if (isAuthenticated) {
    console.log('isUserExists', isUserExists);

    if (!isUserExists) {
      return <Redirect to="/signup" />;
    }
    return <Redirect to="/" />;
  } else {
    return (
      <div className="signin">
        <a href={`https://slack.com/oauth/authorize?scope=team:read,users:read&client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&state=${window.location.href}`}><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" /></a>
      </div>
    )
  }
}


export default SignIn