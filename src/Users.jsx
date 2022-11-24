import React, { Component } from 'react';
import { Container, Card, Button, ButtonGroup } from 'react-bootstrap';
import './Page.css';

export class Users extends Component {

  renderUsers = (num) => {
    
  }

  render() {
    const numUsers = 4;
    return (
      <Container className="page">
        <h1>Users</h1>  
        <Container className="users">
          
        <Container />

        <Card className="userCard m-3">
          <Card.Body>
            <Card.Title className="cardUsername">username</Card.Title>
            <Card.Subtitle className="text-muted mb-3">email@website.com</Card.Subtitle>
              <Button className="m-1">Add appointment</Button>
              <Button className="m-1">Delete user</Button>
          </Card.Body>
        </Card>

        <Card className="userCard m-3">
          <Card.Body>
            <Card.Title className="cardUsername">username</Card.Title>
            <Card.Subtitle className="text-muted mb-3">email@website.com</Card.Subtitle>
              <Button className="m-1">Add appointment</Button>
              <Button className="m-1">Delete user</Button>
          </Card.Body>
        </Card>

        <Card className="userCard m-3">
          <Card.Body>
            <Card.Title className="cardUsername">username</Card.Title>
            <Card.Subtitle className="text-muted mb-3">email@website.com</Card.Subtitle>
              <Button className="m-1">Add appointment</Button>
              <Button className="m-1">Delete user</Button>
          </Card.Body>
        </Card>

        <Card className="userCard m-3">
          <Card.Body>
            <Card.Title className="cardUsername">username</Card.Title>
            <Card.Subtitle className="text-muted mb-3">email@website.com</Card.Subtitle>
              <Button className="m-1">Add appointment</Button>
              <Button className="m-1">Delete user</Button>
          </Card.Body>
        </Card>

        <Card className="userCard m-3">
          <Card.Body>
            <Card.Title className="cardUsername">username</Card.Title>
            <Card.Subtitle className="text-muted mb-3">email@website.com</Card.Subtitle>
              <Button className="m-1">Add appointment</Button>
              <Button className="m-1">Delete user</Button>
          </Card.Body>
        </Card>

        </Container>

      </Container>
    )
  }
}

export default Users