import React, { Component } from 'react';
import './css/Post.css';
import {db} from './firebase'
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { red } from '@mui/material/colors';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import NoImageIcon from './assets/no_image.jpeg'

class Post extends Component {

  deletePost(docId) {
    db.collection("meals").doc(docId).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }
  
  render() {
    const className = 'post'

    let image_url = this.props.image_url
    if (!this.props.image_url) {
      image_url = NoImageIcon
    }
    
    return(
      <Card 
        className={className}
        sx={{width: "500px"}}
        style={{backgroundColor: '#222', color: "#eee", padding: "10px", margin: "10px auto"}}
      >
        <span>{this.props.number}: {this.props.title} 
        
          
        </span>
        <IconButton 
          aria-label="delete" 
          size="small"
          sx={{
            margin: 0.4,
          }}
          onClick={() => {this.deletePost(this.props.id)}}
        >
          <DeleteOutlinedIcon sx={{ color: red[400] }} />
        </IconButton>
        

        <Box sx={{display: "flex", flexWrap: "wrap"}}>
          <CardMedia
            component="img"
            height="180"
            width="280"
            image={image_url}
            alt="Paella dish"
          />

          <div class="rating-wrapper" style={{padding: "12px"}}>
            <Box sx={{display: "flex", marginBottom: "5px"}}>
              <Typography variant="caption">手軽さ:</Typography>
              <Rating name="read-only" value={this.props.ease_score} size="small" style={{marginLeft: "auto"}} readOnly />
            </Box>
            <Box sx={{display: "flex", marginBottom: "5px"}}>
              <Typography variant="caption">コスパ:</Typography>
              <Rating name="read-only" value={this.props.cost_score} size="small" style={{marginLeft: "auto"}} readOnly />
            </Box>
            <Box sx={{display: "flex", marginBottom: "5px"}}>
              <Typography variant="caption">ヘルシーさ:</Typography>
              <Rating name="read-only" value={this.props.health_score} size="small" style={{marginLeft: "auto"}} readOnly />
            </Box>
          </div>
        </Box>
        
        <div class="discription">
          <p>{this.props.description}</p>
        </div>
        <p>{this.props.created_at}</p>
        
        
      </Card>

      

    );
  }

}

export default Post