import React, { Component } from 'react';
import './css/Post.css';
import {db} from './firebase'
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
      width: 400,
      bgcolor: '#222',
      boxShadow: 24,
      p: 4,
      outline: "none",
    };

    

    
    return(

      <div>
      <Card 
        className={className}
        sx={{width: "500px"}}
        style={{backgroundColor: '#222', color: "#eee", padding: "10px", margin: "10px auto"}}
        onClick={() => {this.handleOpen()}}
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
        
        
        <p>{this.props.created_at}</p>
        
        
      </Card>

      <Modal
        open={this.state.isOpenModal}
        onClose={this.handleClose.bind(this)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {this.props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {this.props.description}
          </Typography>
        </Box>
      </Modal>
     

      </div>
      

    );
  }

}

export default Post