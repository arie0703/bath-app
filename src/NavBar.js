import React  from 'react'
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import MyMeals from './meals/MyMeals'
import Box from '@mui/material/Box';
import './css/App.css';
import { useAuthContext } from './AuthContext';
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import { auth } from './firebase';
import { setSessionUser, getSessionUser } from './user/Session';

const NavBar = () => {


  const user = getSessionUser();
  console.log(user)

  const signOut = () => {
    sessionStorage.clear()
    window.location.href = process.env.REACT_APP_SLACK_REDIRECT_URI
  }


  if (user) {
    return (
        <div className="navbar">
        <BrowserRouter>
          <nav class="nav-bar">
            <h1>MEAL MEMO</h1>
            <Link to="/">My Post</Link>
            <p class="signout" onClick={signOut}>Sign Out</p>
          </nav>
          <Box sx={{padding: "20px", width: "80%", margin: "0 auto"}}>
            <Switch>
              <Route exact path="/" component={MyMeals} /> 
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />  
            </Switch>
          </Box>
        </BrowserRouter>
        </div>
    );
  } else {
    return (
      <div className="navbar">
          <BrowserRouter>
          <nav class="nav-bar">
            <h1>MEAL MEMO</h1>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </nav>
          <Box sx={{padding: "20px", width: "80%", margin: "0 auto"}}>
            <Switch>
              <Route exact path="/" component={SignIn} /> 
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
            </Switch>
          </Box>
        </BrowserRouter>
        
      </div>
    )
  }
  
}


export default NavBar