
import './feed.css'

// import {Avatar} from '@material-ui/core'
import Menu from './Menu'
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
                <h3>Menu / Meal</h3>
            </div>
            <div className="option">
                <button className="input" onClick={()=>this.changeToMenu()} >Menu </button>
                <button className="input" onClick={()=>this.changeToMeal()} >Meal </button>
            </div>
            <div className="menus">
                {
                    this.state.which ? <Menu></Menu> : <MealItem></MealItem>
                }                
            </div>

        </div>
        )
    }
}

export default Feed
