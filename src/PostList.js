import React, { Component } from 'react';
import Post from './Post';



class PostList extends Component {

  render() {
    const posts = this.props.posts.map( post =>
      <Post
        key={post.id}
        {...post}
        submitComment={this.props.submitComment.bind(this)}
      />
    )

    return(
      <ul class="post_list">
        {posts}
      </ul>
    );
  }
}

export default PostList