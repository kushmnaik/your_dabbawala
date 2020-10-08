
import './feed.css'
import MenuItem from './MenuItem'
// import {Avatar} from '@material-ui/core'

import React, { Component } from 'react'
import MealItem from './MealItem'

class Feed extends Component {
    state = {
        which: true
    }
    constructor(props) {
        super(props)
    
        this.state = {
            which : true
        }
    }

    
    changeToMenu = () =>{
        this.setState({
            which : true
        })
        console.log(this.state.which)
    }
    changeToMeal = () =>{
        this.setState({
            which : false
        })
        console.log(this.state.which)
    }
    render() {
        return (
        <div className="feed">
            <div className ="feed_header">
                <img alt="profile" src={require('./images/hi.jpg')} ></img>
                <h1>Menu / Meal</h1>
            </div>
            <div className="option">
                <button onClick={()=>this.changeToMenu()} >Menu </button>
                <button onClick={()=>this.changeToMeal()} >Meal </button>
            </div>
            <div className="menus">
                {
                    this.state.which ? <MenuItem></MenuItem> : <MealItem></MealItem>
                }                
            </div>

        </div>
        )
    }
}

export default Feed
