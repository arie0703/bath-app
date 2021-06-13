import logo from './logo.svg';
import React, { Component } from 'react';
import PostList from './PostList'
import Form from './Form';
import './css/App.css';

class App extends Component {

  constructor() {
    super()
    const posts = [
      {
        id: 1,
        title: "斉藤湯",
        place: "日暮里",
        comment: "良い",
      },
      {
        id: 2,
        title: "湯けむりの庄",
        place: "宮前平",
        comment: "素晴らしい",
      },
    ]
    this.state = {
      posts: posts,
      countPost: posts.length + 1,
    }
  }

  // 投稿時の処理
  handleSubmit(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const place = e.target.place.value;
    const comment = e.target.comment.value;
    const posts = this.state.posts.slice()
    const countPost = this.state.countPost

    posts.push({
      id: countPost,
      title: title,
      place: place,
      comment: comment,
    });

    this.setState({ posts })
    this.setState({ countPost: countPost + 1 })

    e.target.title.value = '';
    e.target.comment.value = '';
    e.target.place.value = '';
  }

  render() {
    return (
      <div className="app">
        <h1>銭湯ナビ</h1>
        <Form handleSubmit={this.handleSubmit.bind(this)} />
        <PostList
          posts={this.state.posts}
          />
      </div>
    );
  }
}

export default App;
