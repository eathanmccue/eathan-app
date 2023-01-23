import React, { Component } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import './Page.css';

export class Users extends Component {

	constructor(props){
		super(props);

		this.state = {
			addUserVisibility: false,
			addApptVisibility: true,
			newUserColor: "#67578b",
			showModal: false
		}
	}

	toggleAddUserVisibility = () => {
		this.setState({
		addUserVisibility: !this.state.addUserVisibility
		});
	}

	changeHandler = (event) => {
		this.setState({
		newUserColor: event.target.value
		});
	}

	addNewUser = (event) => {
		event.preventDefault();
		const username = document.getElementById("username");
		const email = document.getElementById("email");
		const color = document.getElementById("color");

		//new user obj
		var newUser = {
		name: event.target[0].value,
		email: event.target[1].value,
		color: event.target[2].value
		}

		var userList = JSON.parse(localStorage.getItem("USERS"));

		// new array
		var newUserArr = [];

		//copy old users array to new array
		for(var i = 0; i < userList.length; i++){
		newUserArr[i] = userList[i];
		}

		//add new user to new array
		newUserArr.push(newUser);

		//save new array to local storage
		localStorage.setItem("USERS", JSON.stringify(newUserArr));

		//reset fields to default
		username.value = "";
		email.value = "";
		color.value = "#67578b";

		this.forceUpdate();
	}

	mapToUsercard = (user, index) => {
		return(
			<Card className="userCard m-3" key={index} style={{borderColor: user.color}}>
				<Card.Body>
					<Card.Title className="cardUsername">{user.name + "[" + index + "]"}</Card.Title>
					<Card.Subtitle className="text-muted mb-3">{user.name + "@website.com"}</Card.Subtitle>
					<div className="buttonSection">
						<div className='apptButtons'>
							<Button className="m-1" onClick={() => this.handleModalShow(index)}>Appointment</Button>
							<Button className="m-1">View appointments</Button>
						</div>
						
						<Button className="m-1" id={index} onClick={this.deleteUser}>Delete user</Button>
					</div>
					
				</Card.Body>
			</Card>
		);
	}

	deleteUser = (event) => {

		//delete the user at index from array storage
		let userIndex = event.target.id;

		//get user list
		let userList = JSON.parse(localStorage.getItem("USERS"));

		//splice first half of users up to index
		userList.splice(userIndex, 1); // first param is index to be removed, 2nd is how many elements to remove

		//update local storage
		localStorage.setItem("USERS", JSON.stringify(userList));

		//update display
		this.forceUpdate();
	}

	handleModalShow = (index) => {
		// show modal, update username for clicked user
		this.setState({
			showModal: true
		});

		localStorage.setItem('modalUser', index);
	}

	handleModalClose = () => {
		// hide modal
		this.setState({
			showModal: false
		});
	}

	handleModalSubmit = (event) => {
		event.preventDefault();

		//add appt for userId in state


		//remove userId from state, close modal
		this.setState({
			showModal: false
		});
	}


	render() {
		var userList = JSON.parse(localStorage.getItem("USERS"));
		var modalIndex = parseInt(localStorage.getItem('modalUser'));
		var modalUser = userList[modalIndex];
		var modalName = modalUser.name;
		return (
			<>

				<div className='header'>
					<h2>Users</h2>  
				</div>
					
					<div className="users">
						{userList[0] ? userList.map(this.mapToUsercard) : <h5>No users to display.</h5>}
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
								<Form.Group className="mt-3 mb-3">
									<Form.Control name="username" type="text" placeholder="username" id="username" />
								</Form.Group>

								<Form.Group className="mt-3 mb-3">
									<Form.Control name="email" type="email" placeholder="example@website.com" id="email" />
								</Form.Group>

								<Form.Group className="colorInput mb-2 mt-3">
								<Form.Label>Profile Color</Form.Label>
								<Form.Control name="color" type="color" id="color" value={this.state.newUserColor} onChange={this.changeHandler}/>
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

					<div className="modal">
						<Modal show={this.state.showModal} onHide={this.handleModalClose}>
							<Modal.Header closeButton>
								<Modal.Title>New Appointment for: {modalName}</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Group>
										<Form.Control className='mb-2' type="date" />
										<Form.Select className='mb-2'>
											<option>12:00</option>
											<option>1:00</option>
											<option>2:00</option>
											<option>4:00</option>
											<option>5:00</option>
											<option>6:00</option>
											<option>7:00</option>
										</Form.Select>
									</Form.Group>
									<Form.Group>
										<Button className="m-2" variant="secondary" onClick={this.handleModalClose}>Close</Button>
										<Button className="m-2" onSubmit={this.handleModalSubmit}>Submit</Button>
									</Form.Group>
								</Form>
							</Modal.Body>
						</Modal>
					</div>
				
			</>
		)
	}
}

export default Users