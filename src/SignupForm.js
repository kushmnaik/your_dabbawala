
import React from 'react';
import PropTypes from 'prop-types';
import './SignupForm.css'
import { Redirect } from 'react-router-dom';
class SignupForm extends React.Component {
  state = {
    username: '',
    password: '',
    login : this.props.login,
  };

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
      login : true
    })
  }

  render() {
    if(this.state.login){
      return <Redirect to='/Home'></Redirect>
    }
    else{
      return (
        <form className="SignUp" onSubmit={e => this.props.parent.handle_signup(e, this.state,this)}>
          <h4>Sign Up</h4>
         
          <input
            className='input'
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handle_change}
          />
          
          <input
            className='input'
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handle_change}
          />
          <button className="input" type="submit">signUp</button>
        </form>
      )
    }
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
