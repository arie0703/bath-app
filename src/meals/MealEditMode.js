import React, { Component } from 'react';
import '../css/meal.css';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SavingsIcon from '@mui/icons-material/Savings';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { red, lightGreen } from '@mui/material/colors';
import RefreshIcon from '@mui/icons-material/Refresh';


class MealEditMode extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isEditMode: false
        }
    }

    handleSubmit = (values) => {
        values.preventDefault();
        this.post(values)
        this.props.toggleEditMode()
    }

    post = (values) => {
        console.log(this.props.id)
        const data = 
        {
            id: this.props.id,
            data: {
                name: values.target.name.value,
                description: values.target.description.value,
                cook_time: values.target.time.value,
                cost: values.target.cost.value,
                calories: values.target.calories.value,
                protein: values.target.protein.value,
                fat: values.target.fat.value,
                carbo: values.target.carbo.value,
            }
        }

        var headers = {
            "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET
        };
        axios.post(
            process.env.REACT_APP_HASURA_ENDPOINT + "/update",
            data,
            {headers: headers}
        )
        .then(res => {
            console.log(res.data)
        })
        .catch(e => {console.log(e.response.data.error)});
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                <Box sx={{display: this.props.modalState.isEditMode ? "display" : "none"}}>
                <Box sx={{display: "flex", margin: "5px"}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <TextField
                            name="name" 
                            InputProps={{
                            style: {color: 'white'}
                            }}
                            type="text" 
                            InputLabelProps={{ style: {color: 'white'}}}
                            defaultValue={this.props.name}
                            variant="outlined"
                            margin="dense"
                            size="small"
                            fullWidth
                        />
                    </Typography>
                    <IconButton 
                    aria-label="close" 
                    size="small"
                    onClick={() => {this.props.toggleEditMode()}}
                    >
                    <CloseIcon sx={{ color: red[400] }} />
                    </IconButton>
                    <IconButton 
                    aria-label="close" 
                    size="small"
                    type="submit"
                    >
                    <RefreshIcon sx={{ color: lightGreen[300] }} />
                    </IconButton>
                </Box>
                <Box sx={{display: "flex"}}>
                    <CardMedia
                    component="img"
                    height="180"
                    width="280"
                    image={this.props.image_url}
                    alt="Paella dish"
                    />

                    <div class="info-wrapper">
                    <div style={{padding: "12px"}}>
                    <Box sx={{display: "flex"}}>
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
                                        <AccessTimeIcon sx={{color: "pink", fontSize: "21px", padding: "2px"}}></AccessTimeIcon>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <Typography style={{color: "white"}}>分</Typography>
                                    </InputAdornment>
                                  ),
                            }}
                            label="調理時間"
                            size="small"
                            defaultValue={this.props.timeValue} 
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        />
                    </Box>
                    <Box sx={{display: "flex"}}>
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
                                        <SavingsIcon sx={{color: "gold", fontSize: "21px", padding: "2px"}}></SavingsIcon>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <Typography style={{color: "white"}}>円</Typography>
                                    </InputAdornment>
                                  ),
                            }}
                            label="1人分の材料費"
                            size="small"
                            defaultValue={this.props.costValue} 
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        />
                        

                    </Box>
                    <Box sx={{display: "flex"}}>
                        <TextField 
                            name="calories"
                            type="number"
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            InputProps={{
                                style: {color: 'white'},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <WhatshotIcon sx={{color: "orange", fontSize: "21px", padding: "2px"}}></WhatshotIcon>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <Typography style={{color: "white"}}>kcal</Typography>
                                    </InputAdornment>
                                  ),
                            }}
                            label="カロリー"
                            size="small"
                            defaultValue={this.props.caloriesValue} 
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        />
                    </Box>
                    <Box sx={{display: "flex"}}>
                        <TextField
                        name="protein" 
                        InputProps={{
                        style: {color: 'white'}
                        }}
                        type="number" 
                        InputLabelProps={{ style: {color: 'white'}}}
                        label="P" 
                        defaultValue={this.props.protein}
                        variant="outlined"
                        size="small"
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
                        defaultValue={this.props.fat}
                        variant="outlined"
                        size="small"
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
                        defaultValue={this.props.carbo}
                        variant="outlined"
                        size="small"
                        margin="dense"
                        fullWidth
                        />
                    </Box>
                    </div>


                    <CardContent style={{padding: "8px"}}>
                    <TextField 
                        name="description" 
                        size="small"
                        multiline type="text" 
                        InputLabelProps={{
                        style: { color: '#fff' },
                        }}
                        InputProps={{
                        style: {color: 'white'}
                        }}
                        label="簡単な概要" 
                        defaultValue={this.props.description} 
                        variant="outlined"
                        rows={4}
                        margin="dense"
                        fullWidth
                    />
                    </CardContent>
                    </div>
                </Box>
                </Box>
                </form>
            </div>
        )
    }
}

export default MealEditMode

