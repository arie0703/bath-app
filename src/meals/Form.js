import React, { Component } from 'react'
import '../css/form.css';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SavingsIcon from '@mui/icons-material/Savings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import ImageUploader from './ImageUploader.js'
import firebase, { storage } from '../firebase';
import {uploadedImage} from '../UploadedImage';
import Box from '@mui/material/Box';
import axios from 'axios'
import notification from '../SlackNotification'
import { getSessionUser } from '../user/Session';

class Form extends Component {

  constructor() {
    super()

    this.state = {
      isOpenModal: false,
      values: [],
      err_msg: "",
      calorie_value: null,
      protein_value: null,
      fat_value: null,
      carbo_value: null,
      isOpenDetail: false,
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
          isOpenModal: false,
          calorie_value: null,
          protein_value: null,
          fat_value: null,
          carbo_value: null
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
        cook_time: values.target.time.value ? values.target.time.value : null,
        cost: values.target.cost.value ? values.target.cost.value : null,
        calories: values.target.calories.value ? values.target.calories.value : null,
        protein: values.target.protein.value ? values.target.protein.value : null,
        fat: values.target.fat.value ? values.target.fat.value : null,
        carbo: values.target.carbo.value ? values.target.carbo.value : null,
        user_id: getSessionUser().user_id,
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
      this.props.getData()
      this.setState({
        isOpenModal: false,
        calorie_value: null,
        protein_value: null,
        fat_value: null,
        carbo_value: null,
      })

      notification(data.data.name, data.data.image_url)
    })
    .catch(e => {
      console.log(e)
      this.setState({
        err_msg: "投稿に失敗しました"
      })
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

  calorieCalculate() {
    this.setState({
      calorie_value: ((Number(this.state.carbo_value) + Number(this.state.protein_value)) * 4) + (Number(this.state.fat_value) * 9)
    })
  }

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
          <Box sx={{display: "flex", alignItems: "center"}}>
            <label class="bold">料理名</label>
            <label class="required">必須</label>
          </Box>
          <TextField
            name="name" 
            InputProps={{
              style: {color: 'white'}
            }}
            type="text" 
            InputLabelProps={{ style: {color: 'white'}}}
            variant="outlined"
            margin="dense"
            fullWidth
            /><br/>

          <Box sx={{display: "flex", alignItems: "center", backgrondColor: "#444"}}>
            <label>簡単な概要</label>
            <label class="optional">任意</label>
          </Box>
          <TextField 
            name="description" 
            multiline type="text" 
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: {color: 'white'}
            }}
            variant="outlined"
            rows={4}
            margin="dense"
            fullWidth
            /><br/>

          <Button onClick={() => {this.setState({isOpenDetail: !this.state.isOpenDetail})}} endIcon={this.state.isOpenDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}>
            {this.state.isOpenDetail ? "閉じる" : "詳細"} 
          </Button>
          {this.state.isOpenDetail}
          <Box className={`collapse ${this.state.isOpenDetail ? 'visible' : 'hidden'}`}>
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

            <p>栄養データ</p>
            <Box style={{display: "flex"}}>
              <TextField
              name="protein" 
              value={this.state.protein_value}
              onChange={(event) => 
                {
                  this.setState({
                    protein_value: event.target.value
                  })
                }
              }
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
              value={this.state.fat_value}
              onChange={(event) => 
                {
                  this.setState({
                    fat_value: event.target.value
                  })
                }
              }
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
              value={this.state.carbo_value}
              onChange={(event) => 
                {
                  this.setState({
                    carbo_value: event.target.value
                  })
                }
              }
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
            <TextField 
              name="calories" 
              type="number" 
              value={this.state.calorie_value}
              onChange={(event) => 
                {
                  event.target.value < 0
                    ? (event.target.value = 0)
                    : this.setState({
                        calorie_value: event.target.value
                      })
                }
              }
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
              variant="outlined"
              margin="dense"
              fullWidth
              />
              <Button
                onClick={() => this.calorieCalculate()}
              >
                PFCからカロリーを自動計算
              </Button>
          </Box>
          <Box sx={{display: "flex", alignItems: "center", backgrondColor: "#444"}}>
            <label>画像</label>
            <label class="optional">任意</label>
          </Box>
          <Box sx={{padding: "10px", backgroundColor: "#222", borderRadius: "8px", margin: "10px 0px"}}>
            <ImageUploader image_info={this.state.image}></ImageUploader>
          </Box>
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