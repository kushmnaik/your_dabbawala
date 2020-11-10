import React from 'react';
import './App.css';
import Feed from './Feed';
import LiveOrders from './LiveOrders';
import Sidebar from './Sidebar';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Component } from 'react'
// import { useHistory } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: 'login',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
          console.log(localStorage.getItem('token'))
          
        });
    }
  }

  handle_login = (e, cred,obj) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cred)
    }).then(res => res.json())
    .then(
      res => {
        if(res.token != null){
          localStorage.setItem('token',res.token)
          localStorage.setItem('username',cred.username)
          this.setState({
            logged_in : localStorage.getItem('token') ? true : false,
            username : localStorage.getItem('username')
          })
          obj.LogedIn();

        }
        else{
          alert("Enter wrong username or password!! \n try again !!")
        }
      }
    )
    .catch(error => console.error(error));
  };

  handle_signup = (e, cred,obj) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cred)
    }).then(res => res.json())
    .then(
      res => {
        if(res.id != null){
          this.handle_login(e,cred,obj)
        }
        else{
          alert("Enter used username or invalid password!! \n try again !!")
        }
      }
    )
    .catch(error => console.error(error));

  };

  handle_logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ logged_in: false, username: '' });

  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    
    return (
      <div className="App">
        <Sidebar logged_in={this.state.logged_in} handle_logout={this.handle_logout}></Sidebar>
        
        <Switch>
          <Route exact path="/">
          { this.state.logged_in ?<Redirect to="/Home"></Redirect>:<Redirect to="/Login"></Redirect>}
          </Route>
          
          <Route exact path="/Home" render={(props)=><Feed login={this.state.logged_in}/>}></Route>
          <Route exact path="/Login" render={(props)=><LoginForm parent={this} logged_in={this.props.logged_in}/>}></Route>
          <Route exact path="/SignUp" render={(props)=><SignupForm login={this.props.logged_in} parent={this}/>}></Route>
        </Switch>
        
        { this.state.logged_in ? <LiveOrders></LiveOrders> : null}
      </div>
      )
    }

}

export default App


