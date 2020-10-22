import React, { Component } from 'react'
import axios from 'axios'
 class MealItem extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             id:this.props.id,
             itemName : this.props.itemName,
             day : this.props.day,
             discription : this.props.discription,
             restaurant : 2,
             color : "green",
        }
    }

    Change = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            color : "red"
        })
    };

    updateItem = (e) => {
        e.preventDefault();
        axios.put("http://127.0.0.1:8000/api/meal/" + this.state.id, this.state).then(() => {
            this.setState({
                color : "green"
            })
            console.log(this.state.id)
        });
      };

    DeleteItem = e =>{
        e.preventDefault();
        if(window.confirm("Do you want to Delete the item?? ")){
            axios.delete("http://127.0.0.1:8000/api/meal/" + this.state.id, this.state).then(() => {
                this.props.parent.reset();
            });
        }
      };
    
    render() {
        return (
            <React.Fragment>
                <tr>
                    <td colSpan="5">
                        <form onSubmit={(e)=>this.updateItem(e)}>
                            <input onChange={this.Change} className="input" type="text" name="itemName" placeholder="itemName" value={this.state.itemName} style={{"fontSize":"20px","color":"black !important"}} ></input>
                            <select className="input" value={this.state.day} onChange={this.Change} name="day" style={{"width":"200px","color":"black !important"}}>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                            </select>
                            <button id={this.state.id} style={{"backgroundColor": this.state.color}} type="submit" className="input" >Save</button>
                            <button onClick={this.DeleteItem}  className="input" style={{"backgroundColor": "red"}}>Delete</button>
                            <div className="discription">
                                <input onChange={this.Change} className="input" type="text" placeholder="discription" name="discription" value={this.state.discription} ></input>
                            </div>
                        </form>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

export default MealItem
