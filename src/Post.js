import React, { Component } from 'react';
import './css/index.css';

class Post extends Component {
  
  render() {
    // const comments = this.props.comments.map( comment =>
    //   <Comment
    //     key={comment.id}
    //     {...comment}
    //   />
    // )
    const className = 'bath'
    var data = []
    
    //各投稿のコメントの要素数だけ、コメントをdataに収納しreturnする
    for(var i in this.props.comment) {
      data.push(<p>{this.props.comment[i].comment}</p>)
    }
    
    return(
      <li className={className}>
        <span>{this.props.id}</span>
        <span>：{this.props.title}　　</span>
        <p>{this.props.place}</p>
        <p>{data}</p>
      </li>

      

    );
  }

}

export default Post