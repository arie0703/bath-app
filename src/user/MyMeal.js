import React, { Component } from 'react';
import MealList from '../meals/MealList'
import Form from '../meals/Form';
import axios from 'axios'
import '../css/meal.css';

class MyMeal extends Component {

  constructor() {
    super()
    const meals = []
    const dates = []
    const calories_params = 0

    this.state = {
      meals: meals,
      dates: dates,
      calories_params: calories_params,
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
      });
    });

  }


  handleChange = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0
    } 
    this.setState({
      calories_params: e.target.value
    })
  }

  // onCollectionUpdate = (querySnapshot) => {
  //   //変更の発生源を特定 local:自分, server:他人
  //   // const source = querySnapshot.metadata.hasPendingWrites ? "local" : "server";
  //   // if (source === 'local')  this.getData(); //期待した動きをしない
  //   this.getData();
  // }

  componentDidMount = async () => {
    //mount時に読み込む
    await this.getData();
  }

  // componentWillUnmount = () => {
  //   this.unsubscribe();
  // }


  render() {
    return (
      <div className="myMeal">
        <Form/>
        <MealList
          meals={this.state.meals}
        />
      </div>
    );
  }
}

export default MyMeal;
