import React, { Component } from 'react';

class CommentForm extends Component {
    render() {
      return (
        <div className="commentform">
          <form onSubmit={this.props.submitComment}>
            <input name="post_id" placeholder="post_id" defaultValue=""></input>
            <textarea name="comment" placeholder="コメント" defaultValue=""></textarea><br/>
            <button type="submit">コメントを投稿</button>
          </form>
        </div>
      )
    }
}

export default CommentForm