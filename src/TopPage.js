import React from 'react'
import './css/App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const TopPage = () => {

    return (
      <div className="topPage">
        <Card sx={{ minWidth: 275 }} style={{backgroundColor: "#282c34", color: "#ddd"}}>
            <CardContent>
                <Typography variant="h5" component="div">
                Nikki Hubで毎日の記録を習慣化しよう
                </Typography>
                <br />
                <Typography variant="body2">
                Record Your Discovery Every Day!
                <br />
                
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to="/signin" variant="outlined">Sign In</Button>
                <Button size="small" component={Link} to="/signup" variant="outlined">Sign Up</Button>
            </CardActions>
        </Card>
      </div>
    )
}
  


export default TopPage