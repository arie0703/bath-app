import React, { Component } from 'react';
import './css/Post.css';
import {db} from './firebase'
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import SavingsIcon from '@mui/icons-material/Savings';
import SpaIcon from '@mui/icons-material/Spa';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { red } from '@mui/material/colors';
import NoImageIcon from './assets/no_image.jpeg'

class Post extends Component {

  constructor() {
    super()

    this.state = {
      isOpenModal: false,
    }
    
  }

  deletePost(docId) {
    db.collection("meals").doc(docId).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }

  handleOpen(){
    this.setState({
      isOpenModal: true
    })
  }

  handleClose(){
    this.setState({
      isOpenModal: false
    })
  }



  
  
  render() {
    const className = 'post'

    

    let image_url = this.props.image_url
    if (!this.props.image_url) {
      image_url = NoImageIcon
    }

    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      bgcolor: '#222',
      boxShadow: 24,
      p: 4,
      outline: "none",
    };

    

    
    return(

      <div>
      <Card 
        className={className}
        sx={{width: "280px"}}
        style={{backgroundColor: '#222', color: "#eee", padding: "4px", margin: "10px"}}
        onClick={() => {this.handleOpen()}}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              U
            </Avatar>
          }
          title={this.props.title}
          subheader={
            <Typography sx={{color: "#ddd"}} variant="caption">
              {this.props.created_at}
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
          <AccessTimeIcon sx={{color: "pink", fontSize: "21px", padding: "2px"}}></AccessTimeIcon>
          <Typography variant="subtitle2">{this.props.ease_score}</Typography>
          <SavingsIcon sx={{color: "gold", fontSize: "21px", padding: "2px"}}></SavingsIcon>
          <Typography variant="subtitle2">{this.props.cost_score}</Typography>
          <SpaIcon sx={{color: "lightgreen", fontSize: "21px", padding: "2px"}}></SpaIcon>
          <Typography variant="subtitle2">{this.props.health_score}</Typography>
        </Box>
        
        
      </Card>

      <Modal
        open={this.state.isOpenModal}
        onClose={this.handleClose.bind(this)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{display: "flex", margin: "5px"}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {this.props.title}
            </Typography>
            <IconButton 
              aria-label="delete" 
              size="small"
              
              onClick={() => {this.deletePost(this.props.id)}}
            >
              <DeleteOutlinedIcon sx={{ color: red[400] }} />
            </IconButton>
          </Box>
          <Box sx={{display: "flex"}}>
            <CardMedia
              component="img"
              height="180"
              width="280"
              image={image_url}
              alt="Paella dish"
            />

            <div class="info-wrapper">
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

              <CardContent style={{padding: "8px"}}>
                <Typography variant="caption">{this.props.description}</Typography>
              </CardContent>
            </div>
          </Box>
        </Box>
      </Modal>
     

      </div>
      

    );
  }

}

export default Post