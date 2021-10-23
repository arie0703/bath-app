import React from 'react'
import '../css/form.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { auth } from '../firebase';
import { useAuthContext } from '../AuthContext';
import { Redirect } from 'react-router-dom';


const SignIn = () => {

  
  const { user } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    auth.signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        console.log("ログイン成功");
    })
  };

  if (user) {
    return <Redirect to="/mypost" />;
  } else {
    return (
      <div className="signin">
        <form onSubmit={handleSubmit} class="post_form">
          <TextField
            name="email" 
            InputProps={{
              style: {color: 'white'}
            }}
            type="text" 
            InputLabelProps={{ style: {color: 'white'}}}
            label="email" 
            defaultValue="" 
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/>
          <TextField
            name="password" 
            InputProps={{
              style: {color: 'white'}
            }}
            type="password" 
            InputLabelProps={{ style: {color: 'white'}}}
            label="password" 
            defaultValue="" 
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/>
          <Button 
            type="submit"
            variant="contained"
          >
            SIGN IN
          </Button>
        </form>
      </div>
    )
  }
  
}


export default SignIn