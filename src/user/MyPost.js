import React, { Component } from 'react';
import PostList from '../PostList'
import Form from '../Form';
import '../css/Post.css';
import CalendarHeatmap from "react-calendar-heatmap";
import firebase, { auth, db } from '../firebase';
import ReactTooltip from "react-tooltip";

class MyPost extends Component {

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
    const docId = db.collection("meals").doc().id;
    db.collection("meals").doc(docId).set({
        id: docId,
        title: values.target.title.value,
        description: values.target.description.value,
        health_score: Number(values.target.health_score.value),
        ease_score: Number(values.target.ease_score.value),
        cost_score: Number(values.target.cost_score.value),
        ingredients: [], // 次回実装
        user_id: auth.currentUser.uid,
        created_at: firebase.firestore.Timestamp.now()
    });
  }


  getData = async () =>{
    
    const ref = db.collection("meals").where('user_id', '==', auth.currentUser.uid).orderBy('created_at', 'desc');
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
      var date = doc.created_at.toDate();

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
    this.setState({
      dates: arr
    })
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
    this.unsubscribe = db.collection("meals").onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }


  render() {
    return (
      <div className="mypost">
        
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
            } else if (value.count > 4) {
              return "color-scale-4"
            }
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value) => {
            
            // react-tooltipの構成
            if (!value.date) {
              return {
                "data-tip": `no contribution`,
              };
            } else {
              return {
                "data-tip": `${value.date} has count: ${
                  value.count
                }`,
              };
            }
          }}
          
        />
          
        <ReactTooltip effect='solid'/>
        
        <PostList
          posts={this.state.posts}
          />
      </div>
    );
  }
}

export default MyPost;
