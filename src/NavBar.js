import React  from 'react'
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import MyPost from './user/MyPost'
import TopPage from './TopPage'
import './css/App.css';
import { useAuthContext } from './AuthContext';
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import { auth } from './firebase';
const NavBar = () => {


  const { user } = useAuthContext();

  const signOut = () => {
    auth.signOut().then(()=>{
      console.log("ログアウトしました");
    })
  }


  if (user) {
    return (
        <div className="navbar">
        <BrowserRouter>
          <nav class="nav-bar">
            <Link to="/">Top</Link>
            <Link to="/mypost">My Post</Link>
            <p class="signout" onClick={signOut}>Sign Out</p>
          </nav>
          <Switch>
            <Route exact path="/" component={TopPage} /> 
            <Route exact path="/mypost" component={MyPost} />   
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />  
          </Switch>
        </BrowserRouter>
        </div>
    );
  } else {
    return (
      <div className="navbar">
          <BrowserRouter>
          <nav class="nav-bar">
            <Link to="/">Top</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={TopPage} /> 
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </BrowserRouter>
        
      </div>
    )
  }
  
}


export default NavBar