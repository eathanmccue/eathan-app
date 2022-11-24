import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './Page.css';
import Viewport from './Viewport';

export class Schedule extends Component {
  render() {
    return (
      <Container className="page">
        <h1>Schedule</h1>
        <Viewport />
      </Container>
    )
  }
}

export default Schedule