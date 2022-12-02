import React, { Component } from 'react'
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

/*const appts = [
  {
    name: "bob",
    day: "wed",
    time: "14:30",
    color: "dodgerblue"
  },
  {
    name: "joe",
    day: "fri",
    time: "11:30",
    color: "lightslategrey"
  },
  {
    name: "susan",
    day: "sun",
    time: "9:00",
    color: "peru"
  },
  {
    name: "don",
    day: "fri",
    time: "11:40",
    color: "saddlebrown"
  },
  {
    name: "rufus",
    day: "tue",
    time: "17:30",
    color: "cornflowerblue"
  },
  {
    name: "richard",
    day: "wed",
    time: "17:30",
    color: ""
  },
  {
    name: "remy",
    day: "sun",
    time: "1:30",
    color: "darkcyan"
  },
  {
    name: "juan",
    day: "thu",
    time: "19:30",
    color: "mediumpurple"
  },
  {
    name: "penny",
    day: "mon",
    time: "13:00",
    color: "silver"
  },
  {
    name: "paul",
    day: "sun",
    time: "17:45",
    color: "firebrick"
  },
  {
    name: "grond",
    day: "sat",
    time: "19:30",
    color: "black"
  }
]; */

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      username: null
    };
  }

  componentDidMount(){
    //var newArr = [];
    /*
    localStorage.setItem("APPT_ARR", JSON.stringify(appts));
    
    var apptArr = JSON.parse(localStorage.getItem("APPT_ARR"));

    apptArr.forEach(element => {
      newArr.push({
        name: element.name,
        email: null,
        color: element.color
      });
    }); */

    //console.log(newArr);

    //localStorage.setItem("USERS", JSON.stringify(newArr));
    //console.log(localStorage.getItem("USERS"));
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