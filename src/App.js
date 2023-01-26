import React, { Component } from 'react'
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      username: null
    };
  }

  componentDidMount(){

    if(localStorage.getItem("USERS") === null){
      //upload to storage
      localStorage.setItem("USERS", JSON.stringify([]));
    }

    if(localStorage.getItem("APPTS") === null){
      localStorage.setItem("APPTS", JSON.stringify([]));
    }
    
    if(localStorage.getItem("modalUser") === null){
      localStorage.setItem("modalUser", JSON.stringify(""));
    }

    if(localStorage.getItem("WEEKLY_APPTS") === null){
      localStorage.setItem("WEEKLY_APPTS", JSON.stringify([]));
    }
  }

  signIn = (newUser) => {
    this.setState({
      loggedIn: true,
      username: newUser
    });
  }

  isLoggedIn = () => {
    return this.state.loggedIn;
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      username: null
    });
  }

  render() {
    return (
      <div className="app">
        {this.isLoggedIn() ? <Dashboard username={this.state.username} logout={this.logout}/> : <Login signIn={this.signIn}/>}
      </div>
    )
  }
}

export default App