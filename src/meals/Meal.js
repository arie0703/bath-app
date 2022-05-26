import React, { Component } from 'react';
import '../css/meal.css';
import {db} from '../firebase'
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import SavingsIcon from '@mui/icons-material/Savings';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { red } from '@mui/material/colors';
import NoImageIcon from '../assets/no_image.jpeg';
import MealDetailModal from './MealDetailModal';

class Meal extends Component {

  constructor() {
    super()
    this.modalRef = React.createRef();
    this.state = {
      isOpenModal: false,
    }

  }


  // openModal(){
  //   this.modalRef.current.handleOpen();
  // }

  render() {
    const className = 'meal'

    let image_url = this.props.image_url
    if (!this.props.image_url) {
      image_url = NoImageIcon
    }
    let d = new Date(this.props.created_at)


    let formatted = `
    ${d.getFullYear()}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}
    `.replace(/\n|\r/g, '');

    const created_at = formatted;

    const timeValue = (this.props.cook_time !== null) ? this.props.cook_time : "?";
    const costValue = (this.props.cost !== null) ? this.props.cost : "?";
    const caloriesValue = (this.props.calories !== null) ? this.props.calories : "?";

    const protein = (this.props.protein !== null) ? this.props.protein : "?";
    const fat = (this.props.fat !== null) ? this.props.fat : "?";
    const carbo = (this.props.carbo !== null) ? this.props.carbo : "?";

    return(

      <div>
      <Card 
        className={className}
        sx={{width: "280px"}}
        style={{backgroundColor: '#222', color: "#eee", padding: "4px", margin: "10px"}}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              U
            </Avatar>
          }
          title={this.props.name}
          subheader={
            <Typography sx={{color: "#ddd"}} variant="caption">
              {created_at}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="180"
          width="280"
          image={image_url}
          alt="Dish"
          sx={{
            margin: "0 auto"
          }}
        />
        <Box sx={{display: "flex", padding: "6px"}}>
          <Box sx={{display: "flex"}}>
            <AccessTimeIcon sx={{color: "pink", fontSize: "21px", padding: "2px"}}></AccessTimeIcon>
            <Typography variant="subtitle2">{timeValue}分</Typography>
          </Box>
          <Box sx={{display: "flex"}}>
            <SavingsIcon sx={{color: "gold", fontSize: "21px", padding: "2px"}}></SavingsIcon>
            <Typography variant="subtitle2">{costValue}円</Typography>
          </Box>
          <Box sx={{display: "flex"}}>
            <WhatshotIcon sx={{color: "orange", fontSize: "21px", padding: "2px"}}></WhatshotIcon>
            <Typography variant="subtitle2">{caloriesValue}kcal</Typography>
          </Box>

          

          
        </Box>

        <Box sx={{display: "flex" ,paddingLeft: "6px"}}>
          <BarChartIcon sx={{color: "grey", fontSize: "21px", padding: "2px"}}></BarChartIcon>
          <Typography variant="subtitle2">P: {protein} F: {fat} C: {carbo}</Typography>
        </Box>

      </Card>


      {/* <MealDetailModal
            {...this.props}
            ref={this.modalRef}
            image_url={image_url}
            timeValue={timeValue}
            costValue={costValue}
            caloriesValue={caloriesValue}
            protein={protein}
            fat={fat}
            carbo={carbo}
          >
      </MealDetailModal> */}


      </div>

    );
  }

}

export default Meal