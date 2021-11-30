import React, { Component } from 'react'
import './css/form.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
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

    // Numberの中身がnullだと勝手に0になるので、null指定してあげる
    if (!values.target.time.value) {
      time = null
    }
    if (!values.target.cost.value) {
      cost = null
    }
    db.collection("meals").doc(docId).set({
        id: docId,
        title: values.target.title.value,
        description: values.target.description.value,
        time: time,
        cost: cost,
        ingredients: [], // 次回実装
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
            name="cost" 
            type="number" 
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: {color: 'white'}
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
              style: {color: 'white'}
            }}
            label="調理時間（分）" 
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