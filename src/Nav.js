import React, { Component } from 'react';
import './Nav.css';
import { PersonFill } from "react-bootstrap-icons";

export default class Nav extends Component {

    constructor(props){
        super(props);
        this.state = {
          username: this.props.username
        }
    }

  render() {
    return (
      <div className='bar'>
        <div className='bar-left'>
          
          <h4>Control Panel</h4>
        </div>
        <div className='userInfo'>
          
          <h5 className="username">{this.props.username}</h5>
          <PersonFill className='icon' color="white" size={32}/>

        </div>
      </div>
    )
  }
}
