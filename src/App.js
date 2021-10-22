import React, { Component } from 'react';
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import MyPost from './user/MyPost'
import './css/App.css';
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import { auth } from './firebase';
import {AuthProvider} from './AuthContext'

class App extends Component {

  signOut() {
    auth.signOut().then(()=>{
      console.log("ログアウトしました");
    })
  }

  render() {

    

    return (
      <div className="app">
        <h1>Nikki Hub</h1>

        <AuthProvider><p>logged in now</p></AuthProvider>
        
        <BrowserRouter>
          <nav class="nav-bar">
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/mypost">My Post</Link>
            <p class="signout" onClick={this.signOut}>Sign Out</p>
          </nav>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/mypost" component={MyPost} />
            
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
