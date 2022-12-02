import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import './Page.css';

export class Users extends Component {

  constructor(props){
    super(props);

    this.state = {
      addUserVisibility: false,
      newUsername: null,
      newColor: "#67578b",
      userList: []
    }
  }

  componentDidMount(){
    var usersArray = JSON.parse(localStorage.getItem("USERS"));
    //console.log(usersArray);
    this.setState({
      userList: usersArray
    });
  }

  toggleAddUserVisibility = () => {
    this.setState({
      addUserVisibility: !this.state.addUserVisibility
    });
  }

  changeHandler = (event) => {
    this.setState({
      newColor: event.target.value
    });
  }

  addNewUser = (event) => {
    event.preventDefault();
    // get array from storage
    var newUser = {
      name: event.target[0].value,
      email: event.target[1].value,
      color: event.target[2].value
    }

    var newUserArr = [...this.state.userList];
    newUserArr.push(newUser);

    this.setState({
      userList: newUserArr
    });
    
    localStorage.setItem("USERS", JSON.stringify(newUserArr));
  }

  mapToUsercard = (user, index) => {
    return(
      <Card className="userCard m-3" key={index} style={{borderColor: user.color}}>
        <Card.Body>
          <Card.Title className="cardUsername">{user.name + "[" + index + "]"}</Card.Title>
          <Card.Subtitle className="text-muted mb-3">{user.name + "@website.com"}</Card.Subtitle>
          <div className="buttonSection">
            <div className='apptButtons'>
              <Button className="m-1">Appointment</Button>
              <Button className="m-1">View appointments</Button>
            </div>
            
            <Button className="m-1">Delete user</Button>
          </div>
            
        </Card.Body>
      </Card>
    );
}

  render() {

    return (
      <>
      
      <div className='header'>
        <h2>Users</h2>  
      </div>
        
        <div className="users">
          {(this.state.userList).map(this.mapToUsercard)}
        </div>

      
        {this.state.addUserVisibility ? 
        // visible add user section
        <div className="addUserSection">
          <div className="header">
            <h2 onClick={this.toggleAddUserVisibility}>New User</h2>
            <DashLg className="icon" size={26} onClick={this.toggleAddUserVisibility}/>
          </div>
          <div className='inputs'>
            <Form onSubmit={this.addNewUser}>
                <Form.Group className="mt-3 mb-3" controlId="formBasicUsername">
                    <Form.Control name="username" type="text" placeholder="username" />
                </Form.Group>

                <Form.Group className="mt-3 mb-3" controlId="formBasicEmail">
                    <Form.Control name="email" type="email" placeholder="example@website.com" />
                </Form.Group>

                <Form.Group className="colorInput mb-2 mt-3" controlId="formBasicUsername">
                  <Form.Label>Profile Color</Form.Label>
                  <Form.Control type="color" value={this.state.newColor} onChange={this.changeHandler}/>
                </Form.Group>

                <Form.Group className="mb-2 mb-3" controlId="submitButton">
                    <Button variant="success" type="submit">
                        Add
                    </Button>
                </Form.Group>
            </Form>
          </div>
        </div> :
        // hidden add user section
        <div className="addUserSection">
          <div className="header">
            <h2 onClick={this.toggleAddUserVisibility}>New User</h2>
            <PlusLg className="icon" size={26} onClick={this.toggleAddUserVisibility}/>
          </div>
        </div>
        }
      </>
    )
  }
}

export default Users