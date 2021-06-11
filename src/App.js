import logo from './logo.svg';
import React, { Component } from 'react';
import PostList from './PostList'
import './css/App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      posts: [
        {
          id: 1,
          title: "斉藤湯",
          desc: "日暮里",
        },
        {
          id: 2,
          title: "湯けむりの庄",
          desc: "宮前平",
        },
      ]
    }
  }

  render() {
    return (
      <div className="app">
        <h1>銭湯ナビ</h1>
        <PostList
          posts={this.state.posts}
          />
      </div>
    );
  }
}

export default App;
