import React, { Component } from 'react'
import './css/form.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SavingsIcon from '@mui/icons-material/Savings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typography from '@mui/material/Typography';
import ImageUploader from './ImageUploader.js'
import firebase, { storage, auth, db } from './firebase';
import {uploadedImage} from './UploadedImage';

class Form extends Component {

  constructor() {
    super()

    this.state = {
      health_score: 1,
      cost_score: 1,
      ease_score: 1,
      values: [],
    }
    
  }

  next = (snapshot) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
  };

  error = (error) => {
    alert(error);
  };

  handleSubmit = (values) => {
    values.preventDefault();
    
    if (uploadedImage !== null) {
      this.setState({
        values: values
      })
      this.imageUpload()
      
    } else {
      this.post(values, null)
    }
  }
  
  post = (values, image_url) => {
    const docId = db.collection("meals").doc().id;
    let time = Number(values.target.time.value)
    let cost = Number(values.target.cost.value)
    let calories = Number(values.target.calories.value)
    let ingredients = values.target.ingredients.value.split(/[　,、 ]/) // 半角or全角スペース, カンマで区切る

    // Numberの中身がnullだと勝手に0になるので、null指定してあげる
    if (!values.target.time.value) {
      time = null
    }
    if (!values.target.cost.value) {
      cost = null
    }
    if (!values.target.calories.value) {
      calories = null
    }
    if (!values.target.ingredients.value) { //何も入力していないとingredientsの値は""となっている
      ingredients = []
    }

    
    db.collection("meals").doc(docId).set({
        id: docId,
        title: values.target.title.value,
        description: values.target.description.value,
        time: time,
        cost: cost,
        calories: calories,
        ingredients: ingredients,
        user_id: auth.currentUser.uid,
        image_url: image_url,
        created_at: firebase.firestore.Timestamp.now()
    });
  }

  imageUpload = async () => {
    try {
      // アップロード処理
      const uploadTask = storage
        .ref(`/images/${uploadedImage.name}`)
        .put(uploadedImage);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, 
          this.next, // upload進行中の関数
          this.error, // error発生時に呼び起こす関数
          function () { // upload終了時に呼び出す関数
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              console.log(url)
              this.post(this.state.values, url)
            })


            
          }.bind(this)
        );

        
      
    } catch (error) {
      console.log("エラーキャッチ", error);
    }

    

    
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit.bind(this)} class="post_form">
          <TextField
            name="title" 
            InputProps={{
              style: {color: 'white'}
            }}
            type="text" 
            InputLabelProps={{ style: {color: 'white'}}}
            label="料理名" 
            defaultValue="" 
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/>
          <TextField 
            name="description" 
            multiline type="text" 
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: {color: 'white'}
            }}
            label="簡単な概要" 
            defaultValue="" 
            variant="outlined"
            rows={4}
            margin="dense"
            fullWidth
            /><br/>
          <TextField
            name="ingredients" 
            InputProps={{
              style: {color: 'white'}
            }}
            type="text" 
            InputLabelProps={{ style: {color: 'white'}}}
            label="材料（スペースorカンマで区切る）" 
            defaultValue="" 
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/>
          <TextField 
            name="cost" 
            type="number" 
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: {color: 'white'},
              startAdornment: (
                <InputAdornment position="start">
                  <SavingsIcon sx={{color: "gold"}}/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Typography style={{color: "white"}}>円</Typography>
                </InputAdornment>
              ),
            }}
            label="費用（1人前）" 
            defaultValue={null}
            onChange={(event) => // マイナスの入力があったら0にする
              event.target.value < 0
                  ? (event.target.value = 0)
                  : event.target.value
            }
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/>
          <TextField 
            name="time" 
            type="number" 
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: {color: 'white'},
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon sx={{color: "pink"}}/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Typography style={{color: "white"}}>分</Typography>
                </InputAdornment>
              ),
            }}
            label="調理時間" 
            onChange={(event) => // マイナスの入力があったら0にする
              event.target.value < 0
                  ? (event.target.value = 0)
                  : event.target.value
            }
            defaultValue={null} 
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/>
          <TextField 
            name="calories" 
            type="number" 
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: {color: 'white'},
              endAdornment: (
                <InputAdornment position="end">
                  <Typography style={{color: "white"}}>kcal</Typography>
                </InputAdornment>
              ),
            }}
            label="カロリー" 
            onChange={(event) => // マイナスの入力があったら0にする
              event.target.value < 0
                  ? (event.target.value = 0)
                  : event.target.value
            }
            defaultValue={null} 
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/> 
          

          <ImageUploader image_info={this.state.image}></ImageUploader>
          <Button 
            type="submit"
            variant="contained"
          >
            POST
          </Button>
        
        </form>
      </div>
    )
  }
}


export default Form