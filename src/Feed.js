
import './feed.css'

// import {Avatar} from '@material-ui/core'
import Menu from './Menu'
import React, { Component } from 'react'
import Meal from './Meal'
import { Redirect } from 'react-router-dom'

class Feed extends Component {
    state = {
        which: true
    }
    constructor(props) {
        super(props)
    
        this.state = {
            which : true,
            login : true,
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
        if(this.props.login){
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
                    this.state.which ? <Menu username = {this.props.username}></Menu> : <Meal username = {this.props.username}></Meal>
                }                
            </div>

        </div>
        )
            }
        else{
            return <Redirect to='/Login'></Redirect>
        }
    }
}

export default Feed
