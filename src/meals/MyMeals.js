import React, { Component } from 'react';
import Meal from './Meal';
import Box from '@mui/material/Box';
import Form from './Form';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import '../css/meal.css';

class MyMeal extends Component {

  constructor() {
    super()
    const meals = []
    this.formRef = React.createRef();
    this.state = {
      isLoading: true,
      meals: meals,
    }
  }



  getData = async () =>{

    var headers = {
      "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET
    };

    axios({
      url: process.env.REACT_APP_HASURA_ENDPOINT,
      method: 'GET',
      headers: headers,
    })
    .then(res => {
      console.log(res.data.Meals)
      this.setState({
        meals: res.data.Meals,
        isLoading: false,
      });
    });

  }

  componentDidMount = async () => {
    //mount時に読み込む
    await this.getData();
  }

  render() {

    const meals = this.state.meals.map( meal =>
      <Meal
        key={meal.id}
        {...meal}
        getData={this.getData.bind(this)}
        created_at={meal.created_at}
      />
    )
    return (
      <div className="myMeal">
        <Box>
          <Button 
            variant="contained"
            onClick={() => this.formRef.current.handleOpen()}
          >
            NEW POST
          </Button>
        </Box>
        
        <Form
          ref={this.formRef}
          getData={this.getData.bind(this)}
        />

        <Box className="mealList" sx={{display: this.state.isLoading ? "none" : "flex", flexWrap: "wrap", width: "100%"}}>
          {meals}
        </Box>

        <Box sx={{ display: this.state.isLoading ? 'flex' : "none", padding: "10px"}}>
          <CircularProgress />
        </Box>
      </div>
    );
  }
}

export default MyMeal;
