
import React from 'react';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'



class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    logged_in : false
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  
  LogedIn = () =>{
    this.setState({
      logged_in : true
    })
  }
  render() {
    if(this.state.logged_in){
      return <Redirect to='/Home'></Redirect>
    }
    else{
      return (
        <div className="LoginForm">
          <form onSubmit={e => this.props.parent.handle_login(e, this.state,this)}>
          <h2>Log In</h2>
          
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handle_change}
          />
          
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handle_change}
          />
          <input className="input sub" style={{'backgroundColor': 'orange'}} type="submit" />
        </form>
        </div>
        
      );
    }
  }
}

export default LoginForm;

