import React, { Component } from 'react';
import '../css/meal.css';
import {db} from '../firebase'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BarChartIcon from '@mui/icons-material/BarChart';

class MenuCard extends Component {

  constructor() {
    super()
    const meals = []
    const total_calories = 0
    const total_protein = 0
    const total_fat = 0
    const total_carbo = 0

    this.state = {
      meals: meals,
      total_calories: total_calories,
      total_protein: total_protein,
      total_fat: total_fat,
      total_carbo: total_carbo,
    }
  }

  getMealData = async () => {
    for (const docID of this.props.meal_id) {
        const ref = db.collection("meals").where('id', '==', docID);
        const snapshots = await ref.get();
        const docs = snapshots.docs.map(doc => doc.data());
        console.log(docs[0].calories)
        await this.setState({
            meals: [...this.state.meals, docs],
            total_calories: this.state.total_calories + Number(docs[0].calories),
            total_protein: this.state.total_protein + Number(docs[0].protein),
            total_fat: this.state.total_fat + Number(docs[0].fat),
            total_carbo: this.state.total_carbo + Number(docs[0].carbo),
        });
        console.log(this.state.total_calories)
    }
  }

  componentDidMount = async () => {
    //mount時に読み込む
    await this.getMealData();
}

  render() {
    const className = 'menuCard'

    const meals = this.state.meals.map( meal =>
      <Card 
          sx={{width: "300px"}}
          style={{backgroundColor: '#555', color: "#eee", padding: "6px", margin: "10px"}}
      >
          <Typography sx={{padding: '8px'}}>{meal[0].title}</Typography>
          <Box sx={{display: "flex"}}>
              <Box sx={{display: "flex", padding: "8px"}}>
                  <Box sx={{display: "flex"}}>
                      <WhatshotIcon sx={{color: "orange", fontSize: "21px", padding: "2px"}}></WhatshotIcon>
                      <Typography variant="subtitle2">{meal[0].calories}kcal</Typography>
                  </Box>
              </Box>

              <Box sx={{display: "flex" ,padding: "8px"}}>
              <BarChartIcon sx={{color: "grey", fontSize: "21px", padding: "2px"}}></BarChartIcon>
              <Typography variant="subtitle2">P: {meal[0].protein} F: {meal[0].fat} C: {meal[0].carbo}</Typography>
              </Box>
          </Box>

      </Card>
    )

    return(

      <div>
      <Card 
        className={className}
        style={{backgroundColor: '#222', color: "#eee", padding: "4px", margin: "10px"}}
      >
        <Typography variant="subtitle2">{this.props.title}</Typography>
        <Box sx={{padding: "6px"}}>
          {meals}
        </Box>
        <Box sx={{padding: "6px"}}>
          <Box sx={{display: "flex"}}>
            <WhatshotIcon sx={{color: "orange", fontSize: "21px", padding: "2px"}}></WhatshotIcon>
            <Typography variant="subtitle2">{this.state.total_calories}kcal</Typography>
          </Box>
          <Box sx={{display: "flex" ,paddingLeft: "6px"}}>
            <BarChartIcon sx={{color: "grey", fontSize: "21px", padding: "2px"}}></BarChartIcon>
            <Typography variant="subtitle2">P: {this.state.total_protein} F: {this.state.total_fat} C: {this.state.total_carbo}</Typography>
          </Box>
        </Box>
        

      </Card>




      </div>

    );
  }

}

export default MenuCard