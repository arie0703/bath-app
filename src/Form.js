import React, { Component } from 'react'
import './css/form.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

class Form extends Component {

  constructor() {
    super()

    this.state = {
      health_score: 1,
      cost_score: 1,
      ease_score: 1,
    }
    
  }
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
            label="料理名" 
            defaultValue="" 
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/>
          <TextField 
            name="description" 
            multiline type="text" 
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: {color: 'white'}
            }}
            label="簡単な概要" 
            defaultValue="" 
            variant="outlined"
            rows={4}
            margin="dense"
            fullWidth
            /><br/>
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <div class="rating">
              <Typography variant="subtitle2" component="legend">手軽さ {this.state.ease_score}</Typography>
              <Rating
                name="ease_score"
                value={this.state.ease_score}
                onChange={(event, newValue) => {
                  this.setState({
                    ease_score: newValue
                  })
                }}
              />

            </div>
            
            <div class="rating">
              <Typography variant="subtitle2" component="legend">コスパ {this.state.cost_score}</Typography>
              <Rating
                name="cost_score"
                value={this.state.cost_score}
                onChange={(event, newValue) => {
                  this.setState({
                    cost_score: newValue
                  })
                }}
              />
            </div>

            <div class="rating">
              <Typography variant="subtitle2" component="legend">ヘルシー度 {this.state.health_score}</Typography>
              <Rating
                name="health_score"
                value={this.state.health_score}
                onChange={(event, newValue) => {
                  this.setState({
                    health_score: newValue
                  })
                }}
              />
            </div>
            
          </Box>
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