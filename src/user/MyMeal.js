import React, { Component } from 'react';
import MealList from '../meals/MealList'
import Form from '../meals/Form';
import '../css/meal.css';
import CalendarHeatmap from "react-calendar-heatmap";
import { auth, db } from '../firebase';
import ReactTooltip from "react-tooltip";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

class MyMeal extends Component {

  constructor() {
    super()
    const meals = []
    const dates = []
    const calories_params = 0

    this.state = {
      meals: meals,
      dates: dates,
      calories_params: calories_params,
    }
    
  }



  getData = async () =>{
    
    const ref = db.collection("meals").where('user_id', '==', auth.currentUser.uid).orderBy('created_at', 'desc');
    const snapshots = await ref.get();
    const docs = snapshots.docs.map(doc => doc.data());
    this.setHeatMap(docs);
    await this.setState({
      meals: docs,
    });

  }

  search = async () => {
    const ref = db.collection("meals").where('calories', '<=', Number(this.state.calories_params));
    const snapshots = await ref.get();
    const docs = snapshots.docs.map(doc => doc.data());
    await this.setState({
      meals: docs,
    });
  }

  handleChange = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0
    } 
    this.setState({
      calories_params: e.target.value
    })
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
      <div className="myMeal">
        
        <Form/>
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
        <Box>
          <Typography sx={{textAlign: "center"}}>カロリーで検索</Typography>
          <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <TextField 
              type="number" 
              sx={{
                marginRight: "5px",
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              InputProps={{
                style: {color: 'white'},
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography style={{color: "white"}}>kcal以下</Typography>
                  </InputAdornment>
                ),
              }}
              onChange={this.handleChange}
              defaultValue={this.state.calories_params} 
              variant="outlined"
              margin="dense"
              />
            <Button sx={{display: "inline-block", verticalAlign: "middle"}} onClick={() => this.search()} variant="contained">Search</Button>
          </Box>
        </Box>
        
        <MealList
          meals={this.state.meals}
          />
      </div>
    );
  }
}

export default MyMeal;
