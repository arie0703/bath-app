import React, { Component } from 'react';
import Meal from './Meal';
import Box from '@mui/material/Box';



class MealList extends Component {

  render() {
    const meals = this.props.meals.map( meal =>
      <Meal
        key={meal.id}
        {...meal}
        number={this.props.meals.length - (this.props.meals.indexOf(meal))}
        created_at={meal.created_at}
      />
    )

    return(
      <Box className="mealList" sx={{display: "flex", flexWrap: "wrap", width: "100%"}}>
        {meals}
      </Box>
    );
  }
}

export default MealList