import React, { Component } from 'react';
import './Nav.css';
import { PersonFill } from "react-bootstrap-icons";

export default class Nav extends Component {

    constructor(props){
        super(props);
        this.state = {
          username: this.props.username,
          loggedIn: this.props.loggedIn
        }
    }

  render() {
    return (
      <div className='bar'>

        <div className='barLeft'>
          <h1>Clever Morgan Health</h1>
        </div>

        <div className='barRight'>
          <h5 className="username">{this.props.username}</h5>
          <PersonFill className='icon' color="white" size={32} onClick={this.props.clickFunction} />
        </div>

      </div>
    )
  }
}
