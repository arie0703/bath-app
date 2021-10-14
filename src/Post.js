import React, { Component } from 'react';
import './css/index.css';
import {db} from './firebase'

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
        <button onClick={() => this.deletePost(this.props.id)}>Delete</button>
        <p>{this.props.content}</p>
        <p>{this.props.createdAt}</p>
        
      </li>

      

    );
  }

}

export default Post