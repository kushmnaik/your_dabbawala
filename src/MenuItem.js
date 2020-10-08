import React, { Component } from 'react'
import './MenuItem.css'
import axios from "axios";
class MenuItem extends Component {

    state = {
        items : []
    }
    
    constructor(props) {
        super(props)
    
        this.state = {
            items : [],
            
            itemName: '',
            itemPrice : 0,
            discription : "",
            category :"",
        
        }
    }
    

    async componentDidMount(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/'); // fetching the data from api, before the page loaded
            const items = await res.json();
            this.setState({
              items
            });
            console.log(items)
          } catch (e) {
            console.log(e);
          }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    Change = (id,e) => {
        const elementsIndex = this.state.items.findIndex(item => item.id == id)
        let newArray = [...this.state.items]
        if(e.target.name === "itemName")
            newArray[elementsIndex] = {...newArray[elementsIndex], itemName : e.target.value}
        else if(e.target.name === "itemPrice")
            newArray[elementsIndex] = {...newArray[elementsIndex], itemPrice : e.target.value}
        else if(e.target.name === "category")
            newArray[elementsIndex] = {...newArray[elementsIndex], category : e.target.value}
        else if(e.target.name === "discription")
            newArray[elementsIndex] = {...newArray[elementsIndex], discription : e.target.value}
        
        
        this.setState({
            items: newArray,
        });
        console.log(newArray)
    }

    async reset(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/add'); // fetching the data from api, before the page loaded
            const items = await res.json();
            this.setState({
              items : items
            });
            console.log(items)
          } catch (e) {
            console.log(e);
          }
        this.setState({
            itemName: '',
            itemPrice : 0,
            discription : "",
            category :"",
        })
    }

    createMenuItem = e => {
        e.preventDefault();

        const item = {
            itemName: this.state.itemName,
            itemPrice : this.state.itemPrice,
            discription : this.state.discription,
            category :this.state.category,
        }
        axios.post("http://127.0.0.1:8000/api/add", item).then(() => {
            this.reset()
        });

      };

      updateItem = (e,id) => {
        e.preventDefault();
        const elementsIndex = this.state.items.findIndex(item => item.id == id)
        axios.put("http://127.0.0.1:8000/api/add/" + id, this.state.items[elementsIndex]).then(() => {
            this.reset()
        });
      };

      
    render() {
        return (
            <div className="MenuItem">

                <div className="AddMenu">
                    <form onSubmit={this.createMenuItem}>
                        <input onChange={this.onChange} className="input" type="text" value={this.state.itemName}  name="itemName" placeholder="itemName" required></input>
                        <input onChange={this.onChange}  className="input" type="text" value={this.state.category} name="category" placeholder="category" required></input>
                        <input onChange={this.onChange}  className="input" type="text" value={this.state.discription} name="discription" placeholder="discription"required ></input>
                        <input onChange={this.onChange}  className="input" type="number" value={this.state.itemPrice} name="itemPrice" placeholder="itemPrice" required></input>
                        <button type="submit" className="input" >Add</button>
                    </form>
                </div>
                <table className="Table">
                    <thead>
                    <tr className="table_head" >
                        <td>Items</td>
                        <td>Category</td>
                        <td style={{"textAlign":"left"}}>Price</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.items.map(item => (
                            <React.Fragment key={item.id} >
                                
                                <tr>
                                    <td colSpan="5">
                                        <form onSubmit={(e)=>this.updateItem(e,item.id)}>
                                            <input onChange={(e)=>this.Change(item.id,e)} name="itemName" className="input" type="text" placeholder={item.itemName} style={{"fontSize":"20px","color":"black !important"}} ></input>
                                            <input onChange={(e)=>this.Change(item.id,e)} className="input" type="text" name="category" placeholder={item.category} ></input>
                                            <input onChange={(e)=>this.Change(item.id,e)} className="input" type="number" name="itemPrice" placeholder={item.itemPrice} ></input>
                                            <button type="submit" className="input" >Save</button>
                                            <button type="submit" className="input" style={{"borderColor":"red"}}>Delete</button>
                                            <div className="discription">
                                                <input onChange={(e)=>this.Change(item.id,e)} className="input" type="text" name="discription" placeholder={item.discription} ></input>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                                
                            </React.Fragment>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MenuItem
