import React, { Component } from 'react';
import {db} from '../firebase'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SavingsIcon from '@mui/icons-material/Savings';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

class MealSelectionCard extends Component {

    constructor() {
        super()
        this.state = {
            isSelected: false
        }
    }

    render() {
        return (
        <Card 
            sx={{width: "500px"}}
            style={{backgroundColor: this.state.isSelected ? '#777' : '#222', color: this.state.isSelected ? "222" : "#eee", padding: "6px", margin: "10px"}}
            onClick={() => {
                this.setState({
                    isSelected: !this.state.isSelected
                })
                this.props.addMealToMenu(this.props.id)
            }}
        >
            <Typography sx={{padding: '8px'}}>{this.props.title}</Typography>
            <Box sx={{display: "flex"}}>
                <Box sx={{display: "flex", padding: "8px"}}>
                    <Box sx={{display: "flex"}}>
                        <AccessTimeIcon sx={{color: "pink", fontSize: "21px", padding: "2px"}}></AccessTimeIcon>
                        <Typography variant="subtitle2">{this.props.time}分</Typography>
                    </Box>
                    <Box sx={{display: "flex"}}>
                        <SavingsIcon sx={{color: "gold", fontSize: "21px", padding: "2px"}}></SavingsIcon>
                        <Typography variant="subtitle2">{this.props.cost}円</Typography>
                    </Box>
                    <Box sx={{display: "flex"}}>
                        <WhatshotIcon sx={{color: "orange", fontSize: "21px", padding: "2px"}}></WhatshotIcon>
                        <Typography variant="subtitle2">{this.props.calories}kcal</Typography>
                    </Box>
                </Box>

                <Box sx={{display: "flex" ,padding: "8px"}}>
                <BarChartIcon sx={{color: "grey", fontSize: "21px", padding: "2px"}}></BarChartIcon>
                <Typography variant="subtitle2">P: {this.props.protein} F: {this.props.fat} C: {this.props.carbo}</Typography>
                </Box>
            </Box>

        </Card>
        );
    }
}

export default MealSelectionCard