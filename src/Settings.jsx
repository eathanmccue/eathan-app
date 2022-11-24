import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import './Page.css';

export class Settings extends Component {

  render() {
    return (
      <Container className="page">
        <h1>Settings</h1>
        <Container className="">
          <Button onClick={this.props.logout}>Logout</Button>
        </Container>
      </Container>
    )
  }
}

export default Settings