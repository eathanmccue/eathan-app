import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Page.css';

export class Settings extends Component {

  render() {
    return (
      <>
        <div className='header'>
          <h2>Settings</h2>
        </div>

        <div className='settings'>
          <Button onClick={this.props.logout} >Logout</Button>
        </div>
      </>
    )
  }
}

export default Settings