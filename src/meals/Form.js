import React, { Component } from 'react'
import '../css/form.css';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SavingsIcon from '@mui/icons-material/Savings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typography from '@mui/material/Typography';
import ImageUploader from './ImageUploader.js'
import firebase, { storage, auth, db } from '../firebase';
import {uploadedImage} from '../UploadedImage';
import Box from '@mui/material/Box';
import axios from 'axios'

class Form extends Component {

  constructor() {
    super()

    this.state = {
      isOpenModal: false,
      health_score: 1,
      cost_score: 1,
      ease_score: 1,
      values: [],
    }
  }

  handleOpen(){
    console.log("modal opened")
    this.setState({
      isOpenModal: true
    })
  }

  handleClose(){
      console.log("modal closed")
      this.setState({
          isOpenModal: false
      })
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

    const data = 
    {
      data: {
        name: values.target.name.value,
        description: values.target.description.value,
        cook_time: values.target.time.value,
        cost: values.target.cost.value,
        calories: values.target.calories.value,
        protein: values.target.protein.value,
        fat: values.target.fat.value,
        carbo: values.target.carbo.value,
        user_id: auth.currentUser.uid,
        image_url: image_url,
      }
    }

    var headers = {
      "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET
    };

    axios.post(
      process.env.REACT_APP_HASURA_ENDPOINT + "/create",
      data,
      {headers: headers}
    )
    .then(res => {
      console.log(res.data)
    })
    .catch(e => {console.log(e)});
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
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      maxHeight: "80%",
      transform: 'translate(-50%, -50%)',
      width: 500,
      overflowY: "scroll",
      bgcolor: '#111',
      boxShadow: 24,
      p: 4,
      outline: "none",
    };
    return (
      <div className="form">
        <Modal
          open={this.state.isOpenModal}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <form onSubmit={this.handleSubmit.bind(this)} class="post_form">
          <TextField
            name="name" 
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

          <Box style={{display: "flex"}}>
            <TextField
            name="protein" 
            InputProps={{
              style: {color: 'white'}
            }}
            type="number" 
            InputLabelProps={{ style: {color: 'white'}}}
            label="P" 
            defaultValue="" 
            variant="outlined"
            margin="dense"
            fullWidth
            />
            <TextField
            name="fat" 
            InputProps={{
              style: {color: 'white'}
            }}
            type="number" 
            InputLabelProps={{ style: {color: 'white'}}}
            label="F"
            defaultValue=""
            variant="outlined"
            margin="dense"
            fullWidth
            />
            <TextField
            name="carbo"
            InputProps={{
              style: {color: 'white'}
            }}
            type="number"
            InputLabelProps={{ style: {color: 'white'}}}
            label="C" 
            defaultValue="" 
            variant="outlined"
            margin="dense"
            fullWidth
            />
          </Box>
          
          

          <ImageUploader image_info={this.state.image}></ImageUploader>
          <Button 
            type="submit"
            variant="contained"
          >
            POST
          </Button>
        
        </form>
        </Box>
        </Modal>
      </div>
    )
  }
}


export default Form