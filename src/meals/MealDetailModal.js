import React, { Component } from 'react';
import '../css/meal.css';
import {db} from '../firebase'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SavingsIcon from '@mui/icons-material/Savings';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { red, lightGreen } from '@mui/material/colors';
import MealEditMode from './MealEditMode';
import EditIcon from '@mui/icons-material/Edit';

class MealDetailModal extends Component {


    constructor(props) {
        super(props)
        this.state = {
            isOpenModal: false,
            isEditMode: false
        }
    
    }

    deleteMeal(docId) {
        db.collection("meals").doc(docId).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
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

    toggleEditMode() {
        console.log(this.state.isEditMode);
        this.setState({
            isEditMode: !this.state.isEditMode
        })
    }

    render() {
        const modalStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: '#222',
            boxShadow: 24,
            p: 4,
            outline: "none",
        };

        const image_url = this.props.image_url;
        const timeValue = this.props.timeValue;
        const costValue = this.props.costValue;
        const caloriesValue = this.props.caloriesValue;
        const protein = (this.props.protein !== null) ? this.props.protein : "?";
        const fat = (this.props.fat !== null) ? this.props.fat : "?";
        const carbo = (this.props.carbo !== null) ? this.props.carbo : "?";



        

        return (
            <div>
                <Modal
                    open={this.state.isOpenModal}
                    onClose={this.handleClose.bind(this)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                    <Box sx={{display: this.state.isEditMode ? "none" : "block" }}>
                        <Box sx={{display: "flex", margin: "5px"}}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            {this.props.title}
                            </Typography>
                            <IconButton 
                            aria-label="delete" 
                            size="small"
                            onClick={() => {this.deleteMeal(this.props.id)}}
                            >
                            <DeleteOutlinedIcon sx={{ color: red[400] }} />
                            </IconButton>
                            <IconButton 
                            aria-label="edit" 
                            size="small"
                            onClick={() => {this.toggleEditMode()}}
                            >
                            <EditIcon sx={{ color: lightGreen[300] }} />
                            </IconButton>
                        </Box>
                        <Box sx={{display: "flex"}}>
                            <CardMedia
                            component="img"
                            height="180"
                            width="280"
                            image={image_url}
                            alt="Paella dish"
                            />

                            <div class="info-wrapper">
                            <div style={{padding: "12px"}}>
                            <Box sx={{display: "flex"}}>
                                <Box sx={{display: "flex", marginBottom: "5px"}}>
                                <AccessTimeIcon sx={{color: "pink", fontSize: "21px", padding: "2px"}}></AccessTimeIcon>
                                <Typography variant="subtitle2" sx={{marginRight: "5px"}}>調理時間</Typography>
                                </Box>
                                <Typography variant="subtitle2">{timeValue}分</Typography>
                            </Box>
                            <Box sx={{display: "flex"}}>
                                <Box sx={{display: "flex", marginBottom: "5px"}}>
                                <SavingsIcon sx={{color: "gold", fontSize: "21px", padding: "2px"}}></SavingsIcon>
                                <Typography variant="subtitle2" sx={{marginRight: "5px"}}>1人分の材料費</Typography>
                                </Box>
                                <Typography variant="subtitle2">{costValue}円</Typography>
                            </Box>
                            <Box sx={{display: "flex"}}>
                                <Box sx={{display: "flex", marginBottom: "5px"}}>
                                <WhatshotIcon sx={{color: "orange", fontSize: "21px", padding: "2px"}}></WhatshotIcon>
                                <Typography variant="subtitle2" sx={{marginRight: "5px"}}>カロリー</Typography>
                                </Box>
                                <Typography variant="subtitle2">{caloriesValue}kcal</Typography>
                            </Box>
                            <Box sx={{display: "flex"}}>
                                <Box sx={{display: "flex", marginBottom: "5px"}}>
                                <BarChartIcon sx={{color: "grey", fontSize: "21px", padding: "2px"}}></BarChartIcon>
                                <Typography variant="subtitle2" sx={{marginRight: "5px"}}>P: {protein} F: {fat} C: {carbo}</Typography>
                                </Box>
                            </Box>
                            </div>

                            <CardContent style={{padding: "8px"}}>
                                <Typography variant="caption">{this.props.description}</Typography>
                            </CardContent>
                            </div>
                        </Box>
                    </Box>

                    <MealEditMode
                        {...this.props}
                        toggleEditMode={() => {this.toggleEditMode()}}
                        modalState={this.state}
                        image_url={image_url}
                        timeValue={timeValue}
                        costValue={costValue}
                        caloriesValue={caloriesValue}
                        protein={protein}
                        fat={fat}
                        carbo={carbo}
                    ></MealEditMode>




                    </Box>
                </Modal>
            </div>
        );
    }
}

export default MealDetailModal