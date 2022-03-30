import React, { Component } from 'react';
import Box from '@mui/material/Box';
import { auth, db } from '../firebase';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import MealSelectionCard from './MealSelectionCard'



class AddMenuModal extends Component {
    constructor() {
        super()
        const meals = []
        const selectedMeals = []
        this.state = {
            isOpenModal: false,
            meals: meals,
            selectedMeals: selectedMeals,
        }
    }

    addMealToMenu (docID) {

        if (this.state.selectedMeals.includes(docID)) {
            const _selectedMeals = this.state.selectedMeals.filter(item => item !== docID)
            this.setState({
                selectedMeals: _selectedMeals
            })
        } else {
            this.setState({
                selectedMeals: [...this.state.selectedMeals, docID]
            })
        }
        
        
    }

    getMealsData = async () =>{
        const ref = db.collection("meals");
        const snapshots = await ref.get();
        const docs = snapshots.docs.map(doc => doc.data());
        await this.setState({
          meals: docs,
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
            isOpenModal: false,
            selectedMeals: []
        })
    }

    handleSubmit = (values) => {
        values.preventDefault();
        db.collection("menus").doc(db.collection("menus").doc().id).set({
            title: values.target.title.value,
            meal_id: this.state.selectedMeals
        });

        this.setState({
            selectedMeals: []
        })

      }

    onCollectionUpdate = (querySnapshot) => {
        //変更の発生源を特定 local:自分, server:他人
        // const source = querySnapshot.metadata.hasPendingWrites ? "local" : "server";
        // if (source === 'local')  this.getData(); //期待した動きをしない
        this.getMealsData();
    }

    componentDidMount = async () => {
        //mount時に読み込む
        await this.getMealsData();
        //collectionの更新を監視
        this.unsubscribe = db.collection("menus").onSnapshot(this.onCollectionUpdate);
    }

    componentWillUnmount = () => {
        this.unsubscribe();
    }



    render() {

        const modalStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '90%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: '#111',
            boxShadow: 24,
            p: 4,
            outline: "none",
            overflowY:'scroll',
        };

        const meals = this.state.meals.map( meal =>

            <MealSelectionCard 
                key={meal.id} 
                {...meal}
                addMealToMenu = {this.addMealToMenu.bind(this)}
            >
            </MealSelectionCard>
        )

        return(
            <Modal
            open={this.state.isOpenModal}
            onClose={this.handleClose.bind(this)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography>献立セットを作成</Typography>

                    <Typography>{this.state.selectedMeals.join(",")}</Typography>

                    <form onSubmit={this.handleSubmit.bind(this)} class="post_form">
                    <TextField
                        name="title" 
                        InputProps={{
                        style: {color: 'white'}
                        }}
                        type="text" 
                        InputLabelProps={{ style: {color: 'white'}}}
                        label="セット名" 
                        defaultValue="" 
                        variant="outlined"
                        margin="dense"
                        fullWidth
                    /><br/>
                    <Button 
                        type="submit"
                        variant="contained"
                    >
                        作成
                    </Button>
                    </form>
                    <Box>

                        {meals}
                    </Box>
                </Box>
            </Modal>
        );
    }
}

export default AddMenuModal