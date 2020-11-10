import React, { Component } from 'react'
import './Menu.css'
import axios from "axios";
import MealItem from './MealItem';
class Meal extends Component {

    state = {
        items : []
    }
    
    constructor(props) {
        super(props)
    
        this.state = {
            items : [],
            SearchItem : "",
            SearchDay : "",
            itemName: '',
            discription : "",
            day :"",
        
        }
    }
    

    async componentDidMount(){
        this.reset()
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        
    };
   
    createMenuItem = e => {
        e.preventDefault();

        const item = {
            itemName: this.state.itemName,
            itemPrice : this.state.itemPrice,
            discription : this.state.discription,
            day :this.state.day,
            restaurant : localStorage.getItem('username')
        }
        axios.post("http://127.0.0.1:8000/api/meal/2", item).then(() => {
            this.reset();
            this.resetfrom();
        });

      };

    resetfrom = () =>{
        this.setState({
            itemName: '',
            itemPrice : 0,
            discription : "",
            category :"",
        })
    }
    async reset(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/meal/'+localStorage.getItem('username')); // fetching the data from api, before the page loaded
            const items = await res.json();
            this.setState({
              items : items
            });
           
          } catch (e) {
            console.log(e);
          }
        
    }
    render() {
        return (
            <div className="Menu">

                <div className="AddMenu">
                    <span>Add new item :</span> 
                    <form onSubmit={this.createMenuItem}>
                        
                        <input onChange={this.onChange} className="input" type="text" value={this.state.itemName}  name="itemName" placeholder="itemName" required></input>
                        <select className="input" value={this.state.day} onChange={this.onChange} name="day" placeholder="Day">
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                        </select>
                        <div>
                        <input onChange={this.onChange}  className="input" type="text" value={this.state.discription} style={{"backgroundColor":"white", "width":"450px"}} name="discription" placeholder="discription"required ></input>
                            <button type="submit" className="input" >Add</button>
                        </div>   
                    </form>
                </div>
                <table className="Table">
                    <thead>
                    <tr className="table_head" >
                        
                        <td><input className="input" onChange = {this.onChange} name="SearchItem" value={this.state.SearchItem} type="text" placeholder="&#x1F50D;SearchItem" style={{"backgroundColor":"white","marginLeft":"3px"}}></input></td>
                        <td><input className="input" onChange = {this.onChange} name="SearchDay" value={this.state.SearchDay} type="text" placeholder="&#x1F50D;SearchDay" style={{"backgroundColor":"white","marginLeft":"3px"}}></input></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.items.filter(item => item.itemName.toLowerCase().includes(this.state.SearchItem.toLowerCase())).filter(item => item.day.toLowerCase().includes(this.state.SearchDay.toLowerCase())).sort((a,b)=>a.day > b.day ? 1 : -1).map(item => (
                            <MealItem key={item.id}
                                id = {item.id}
                                itemName ={item.itemName}
                                day = {item.day}
                                discription = {item.discription}
                                reset = {this.reset}
                                parent = {this}
                             ></MealItem>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Meal
