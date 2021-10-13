import React, { Component } from 'react';
import './css/commentform.css';

class CommentForm extends Component {
    
    render() {
      return (
        <div className="commentform">
          <form onSubmit={this.props.submitComment}>
            <input type="hidden" name="post_id" placeholder="post_id" defaultValue={this.props.pid}></input>
            <input name="comment" placeholder="コメント" defaultValue=""></input><br/>
            <button type="submit">コメント</button>
          </form>
        </div>
      )
    }
}

export default CommentForm