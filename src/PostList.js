import React, { Component } from 'react';
import Post from './Post';
import Box from '@mui/material/Box';



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
      <Box className="postList" sx={{display: "flex", flexWrap: "wrap", width: "100%"}}>
        {posts}
      </Box>
    );
  }
}

export default PostList