import React, { Component } from 'react';
import './css/Post.css';
import {db} from './firebase'
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { red } from '@mui/material/colors';

class Post extends Component {

  deletePost(docId) {
    db.collection("posts").doc(docId).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }
  
  render() {
    const className = 'post'
    
    return(
      <li className={className}>
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
        <p>{this.props.content}</p>
        <p>{this.props.createdAt}</p>
        
      </li>

      

    );
  }

}

export default Post