import React, { Component } from 'react'
import './css/form.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class Form extends Component {
  render() {
    return (
      <div className="form">
        <form onSubmit={this.props.handleSubmit} class="post_form">
          <TextField
            name="title" 
            InputProps={{
              style: {color: 'white'}
            }}
            type="text" 
            InputLabelProps={{ style: {color: 'white'}}}
            label="title" 
            defaultValue="" 
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/>
          <TextField 
            name="content" 
            multiline type="text" 
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: {color: 'white'}
            }}
            label="content" 
            defaultValue="" 
            variant="outlined"
            rows={5}
            margin="dense"
            fullWidth
            /><br/>
          <Button 
            type="submit"
            variant="contained"
          >
            POST
          </Button>
        </form>
      </div>
    )
  }
}


export default Form