import logo from './logo.svg';
import React, { Component } from 'react';
import PostList from './PostList'
import Form from './Form';
import CommentForm from './CommentForm';
import './css/App.css';

class App extends Component {

  constructor() {
    super()
    const posts = [
      {
        id: 1,
        title: "斉藤湯",
        place: "日暮里",
        comment: [{ //コメントは配列にしておく
          id: 1,
          comment: "yeah",
          post_id: 1,
        }],
      },
      {
        id: 2,
        title: "湯けむりの庄",
        place: "宮前平",
        comment: [{
          id: 2,
          comment: "宮前平から近い。",
          post_id: 2,
        }],
      },
    ]

    //コメントテーブルはなくてもよさそう？
    const comments = [
      {
        id: 1,
        post_id: 1,
        comment: "yeah"
      },
      {
        id: 2,
        post_id: 2,
        comment: "yeah"
      },
    ]

    this.state = {
      posts: posts,
      comments: comments,
      countPost: posts.length + 1,
      countComment: comments.length + 1
    }
    
  }

  // 投稿時の処理
  handleSubmit(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const place = e.target.place.value;
    const posts = this.state.posts.slice()
    const countPost = this.state.countPost

    posts.push({
      id: countPost,
      title: title,
      place: place,
      comment: []
    });

    this.setState({ posts })
    this.setState({ countPost: countPost + 1 })

    e.target.title.value = '';
    e.target.place.value = '';
    console.log(posts[0].comment)
  }

  submitComment(e) {
    e.preventDefault();
    const countComment = this.state.countComment
    const post_id = Number(e.target.post_id.value);
    const comment = e.target.comment.value;
    const posts = this.state.posts.slice()
    const comments = this.state.comments.slice()
    
    comments.push({
      id: countComment,
      comment: comment,
      post_id: post_id
    })
    posts[post_id - 1].comment.push({
      id: countComment,
      comment: comment,
      post_id: post_id
    })

    this.setState({ posts })
    this.setState({ comments })
    this.setState({ countComment: countComment + 1 })
    e.target.comment.value = '';
    e.target.post_id.value = '';
    console.log(comments)
    console.log(posts)
  }

  render() {
    return (
      <div className="app">
        <h1>銭湯ナビ</h1>
        <Form handleSubmit={this.handleSubmit.bind(this)} />
        <PostList
          posts={this.state.posts}
          comments = {this.state.comments}
          />
        <CommentForm 
          submitComment={this.submitComment.bind(this)}/>
      </div>
    );
  }
}

export default App;
