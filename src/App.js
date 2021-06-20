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
        title: "ご飯",
        content: "明日の晩御飯はキムチ納豆丼",
        comment: [{ //コメントは配列にしておく
          id: 1,
          comment: "yeah",
          post_id: 1,
        }],
      },
      {
        id: 2,
        title: "未来",
        content: "将来はアメリカに住もうかな〜",
        comment: [{
          id: 2,
          comment: "そんな気分じゃない",
          post_id: 2,
        }],
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
    const content = e.target.content.value;
    const posts = this.state.posts.slice()
    const countPost = this.state.countPost

    posts.push({
      id: countPost,
      title: title,
      content: content,
      comment: []
    });

    this.setState({ posts })
    this.setState({ countPost: countPost + 1 })

    e.target.title.value = '';
    e.target.content.value = '';
    console.log(posts[0].comment)
  }

  submitComment(e) {
    e.preventDefault();
    const countComment = this.state.countComment
    const post_id = Number(e.target.post_id.value);
    const comment = e.target.comment.value;
    const posts = this.state.posts.slice()
  
    posts[post_id - 1].comment.push({
      id: countComment,
      comment: comment,
      post_id: post_id
    })

    this.setState({ posts })
    this.setState({ countComment: countComment + 1 })
    e.target.comment.value = '';
    console.log(posts)
  }

  render() {
    return (
      <div className="app">
        <h1>独り言メモ</h1>
        <Form handleSubmit={this.handleSubmit.bind(this)} />
        <PostList
          posts={this.state.posts}
          submitComment={this.submitComment.bind(this)}
          />
      </div>
    );
  }
}

export default App;
