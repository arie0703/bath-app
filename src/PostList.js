import React, { Component } from 'react';
import Post from './Post';



class PostList extends Component {

  render() {
    const posts = this.props.posts.map( post =>
      <Post
        key={post.id}
        {...post}
        number={this.props.posts.length - (this.props.posts.indexOf(post))}
        created_at={post.created_at.toDate().toLocaleString('ja-JP')}
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