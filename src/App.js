import React, { Component } from 'react';
import PostList from './PostList'
import Form from './Form';
import './css/App.css';
import CalendarHeatmap from "react-calendar-heatmap";
import firebase, { db } from './firebase';

class App extends Component {

  constructor() {
    super()
    const posts = []
    const dates = []

    this.state = {
      posts: posts,
      dates: dates,
    }
    
  }

  // 投稿時の処理
  handleSubmit(values) {
    values.preventDefault();
    const docId = db.collection("posts").doc().id;
    db.collection("posts").doc(docId).set({
        id: docId,
        title: values.target.title.value,
        content: values.target.content.value,
        createdAt: firebase.firestore.Timestamp.now()
    });
  }


  getData = async () =>{
    
    const ref = db.collection("posts").orderBy('createdAt', 'desc');
    const snapshots = await ref.get();
    const docs = snapshots.docs.map(doc => doc.data());
    this.setHeatMap(docs);
    await this.setState({
      posts: docs,
    });

  }

  setHeatMap(docs) { // 各投稿の日付を参照して芝生を生やす処理
    var arr = [];
    var pre = "";
    var count = 1
    docs.forEach(function(doc) {
      var date = doc.createdAt.toDate();

      var y = date.getFullYear();
      var m = ('00' + (date.getMonth()+1)).slice(-2);
      var d = ('00' + date.getDate()).slice(-2);
      var settedDate = y + '-' + m + '-' + d;
      if (settedDate === pre) { // 同じ日付が連続してきたらカウントを増やす
        count ++;
      } else {
        count = 1;
      }
      pre = settedDate;
    
      arr.push({date: settedDate, count: count})
    });
    this.state.dates = arr;
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

  componentWillUnmount = () => {
    this.unsubscribe();
  }


  render() {
    return (
      <div className="app">
        <h1>Nikki Hub</h1>
        <Form handleSubmit={this.handleSubmit.bind(this)} />

        <CalendarHeatmap
          // 表示させる月
          startDate={new Date("2021-01-01")}
          endDate={new Date("2021-12-31")}

          values={this.state.dates}

          // color
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-scale-${value.count}`;
          }}
        />
        <PostList
          posts={this.state.posts}
          />
      </div>
    );
  }
}

export default App;
