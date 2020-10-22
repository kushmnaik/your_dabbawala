import React, { Component } from 'react'
import './Menu.css'
import axios from "axios";
import MenuItem from './MenuItem';
class Menu extends Component {

    state = {
        items : []
    }
    
    constructor(props) {
        super(props)
    
        this.state = {
            items : [],
            SearchItem : "",
            itemName: '',
            itemPrice : 0,
            discription : "",
            category :"",
        
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
            category :this.state.category,
            restaurant : 2
        }
        axios.post("http://127.0.0.1:8000/api/menu", item).then(() => {
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
            const res = await fetch('http://127.0.0.1:8000/api/menu/2'); // fetching the data from api, before the page loaded
            const items = await res.json();
            this.setState({
              items : items
            });
            console.log(items)
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
                        <input onChange={this.onChange}  className="input" type="text" value={this.state.category} name="category" placeholder="category" required></input>
                        
                        <input onChange={this.onChange}  className="input" type="number" value={this.state.itemPrice} name="itemPrice" placeholder="itemPrice" required></input>
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
                        <td>Category</td>
                        <td>Price</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.items.filter(item => item.itemName.toLowerCase().includes(this.state.SearchItem.toLowerCase())).sort((a,b)=>a.category > b.category ? 1 : -1).map(item => (
                            <MenuItem key={item.id}
                                id = {item.id}
                                itemName ={item.itemName}
                                itemPrice ={item.itemPrice}
                                category = {item.category}
                                discription = {item.discription}
                                reset = {this.reset}
                                parent = {this}
                             ></MenuItem>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Menu
