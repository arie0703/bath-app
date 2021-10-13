import React, { Component } from 'react';
import PostList from './PostList'
import Form from './Form';
import './css/App.css';
import firebase, { db } from './firebase';

class App extends Component {

  constructor() {
    super()
    const posts = []

    this.state = {
      posts: posts,
      countPost: posts.length + 1,
    }
    
  }

  // 投稿時の処理
  handleSubmit(values) {
    values.preventDefault();
    const docId = db.collection("posts").doc().id;
    db.collection("posts").doc(docId).set({
        title: values.target.title.value,
        content: values.target.content.value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  getData = async () =>{
    
    const ref = db.collection("posts").orderBy('createdAt');
    const snapshots = await ref.get();
    const docs = snapshots.docs.map(doc => doc.data());

    await this.setState({
      posts: docs,
    });

  }

  onCollectionUpdate = (querySnapshot) => {
    //変更の発生源を特定 local:自分, server:他人
    // const source = querySnapshot.metadata.hasPendingWrites ? "local" : "server";
    // if (source === 'local')  this.getData(); //期待した動きをしない
    this.getData();
  }

  componentDidMount = async () => {
    //mount時に読み込む
    await this.getData();
    //collectionの更新を監視
    this.unsubscribe = db.collection("posts").onSnapshot(this.onCollectionUpdate);
  }

  submitComment(values) {
    const docId = db.collection("posts").doc().id;
    db.collection("posts").doc(docId).set({
        id: firebase.firestore.FieldValue.increment(),
        title: values.title,
        content: values.content,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  render() {
    return (
      <div className="app">
        <h1>Nikki Hub</h1>
        <button onClick={this.getData}>get</button>
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
