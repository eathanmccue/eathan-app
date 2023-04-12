import React, { Component } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import './Page.css';

let randomNames = ["Lizet", "Jaleel", "Earl", "Wilfredo", "Darrin", "Angel", "Fredy", "Matthew", "Jaelynn", "Carli", "Abby", "Hunter", "Mackenzi", "Cheyenne", "Hugh", "Markus", "Loren", "Keegan", "Genesis", "Rashawn", "Benny", "Livia", "Kendyl", "Asa", "Joe", "Mckenzie", "Jaila", "Timothy", "Myra", "Heath", "Dalila", "Mckinley", "Laisha", "Emalee", "Skyler", "Augustus", "Devonte", "Fredrick", "Davonte", "Jared", "Shae", "Alina", "Titus", "Alice", "Autumn", "Jaden", "Turner", "Bryan", "Abraham", "Ann", "Sammy", "Toby", "Devon", "Jaquez", "Denzel", "Isaak", "Carleigh", "Karl", "Raul", "Courtney", "Quinlan", "Kevon", "Stormy", "Colt", "Charlotte", "Trever", "Henry", "Rhianna", "Tyla", "Jameson", "Menachem", "Dymond", "Braulio", "Benjamin", "Santiago", "Marjorie", "Analise", "Paloma", "Justin", "Johnathon", "Kourtney", "Tracy", "Elizabeth", "Leonard", "Tatianna", "Kyleigh", "Kristen", "Nikhil", "Pierce", "Daphne", "Ivanna", "Montana", "Dahlia", "Jorge", "Dale", "Rashad", "Lorenzo", "Oscar", "Brock", "Teresa"];

export class Users extends Component {

	constructor(props){
		super(props);

		this.state = {
			addUserVisibility: false,
			addApptVisibility: true,
			newUserColor: "#67578b",
			showModal: false,
			modalUser: {}
		}
	}

	getUserId = () => {
        var takenIds = []; // empty array
        //get current appointments as array
        let userList = JSON.parse(localStorage.getItem('USERS'));

        //random number 0-999
        let randomInt = Math.floor(Math.random() * 1000);

        //loop through appts, established taken ids
        for(var i = 0; i < userList.length; i++){
            takenIds.push(userList[i].id); // add to taken ids array
        }

        while(userList.includes(randomInt)){
            //id taken, generate new number
            randomInt = Math.floor(Math.random() * 1000);
        }
        
        return randomInt;
    }

	getApptId = () => {
        var takenIds = []; // empty array
        //get current appointments as array
        let apptList = JSON.parse(localStorage.getItem('APPTS'));

        //random number 0-999
        let randomInt = Math.floor(Math.random() * 1000);

        //loop through appts, established taken ids
        for(var i = 0; i < apptList.length; i++){
            takenIds.push(apptList[i].id); // add to taken ids array
        }

        while(apptList.includes(randomInt)){
            //id taken, generate new number
            randomInt = Math.floor(Math.random() * 1000);
        }
        
        return randomInt;
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
			id: this.getUserId(),
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
					<Card.Title className="cardUsername">{user.name + "[" + user.id + "]"}</Card.Title>
					<Card.Subtitle className="text-muted mb-3">{user.name + "@website.com"}</Card.Subtitle>
					<div className="buttonSection">
						<div className='apptButtons'>
							<Button className="m-1" id={user.id} onClick={this.handleModalShow}>Appointment</Button>
							<Button className="m-1">View appointments</Button>
						</div>
						
						<Button className="m-1" id={user.id} onClick={this.deleteUser}>Delete user</Button>
					</div>
					
				</Card.Body>
			</Card>
		);
	}

	deleteUser = (event) => {

		//get user list
		let userList = JSON.parse(localStorage.getItem("USERS"));

		//delete the user at index from array storage
		let userId = "" + event.target.id;
		//console.log("User ID: " + userId);
		
		let userIndex = -1;

		for(var i = 0; i < userList.length; i++){
			//console.log("current user ID: " + userList[i].id);
			if("" + userList[i].id === userId){
				userIndex = i;
			}
		}

		//console.log(userIndex);

		//splice first half of users up to index
		userList.splice(userIndex, 1); // first param is index to be removed, 2nd is how many elements to remove

		//update local storage
		localStorage.setItem("USERS", JSON.stringify(userList));

		//update display
		this.forceUpdate();
	}

	handleModalShow = (event) => {
		let userId = event.target.id;

		let userList = this.findUserList();

		var selectedUser = {};
		
		for(var i = 0; i < userList.length; i++){
			if(userList[i].id === parseInt(userId)){
				selectedUser = userList[i];
				i = userList.length - 1; // finish loop
			}
		}

		// show modal
		this.setState({
			showModal: true,
			modalUser: selectedUser
		});
	}

	handleModalClose = () => {
		// hide modal
		this.setState({
			showModal: false,
			selectedUser: {}
		});
	}

	handleModalSubmit = (event) => {
		event.preventDefault();
		//console.log(event.target);

		var date = event.target[0].value;
		var time = event.target[1].value;

		//var userList = this.findUserList();

		var newAppointment = {
			id: this.getUserId(),
			user: this.state.modalUser,
			date: date,
			time: time
		}

		var apptList = JSON.parse(localStorage.getItem('APPTS'));

		//add new appointment to array
		apptList.push(newAppointment);

		//save array to storage
		localStorage.setItem("APPTS", JSON.stringify(apptList));

		//update schedule to recalculate weekly appts
		this.props.updateSchedule();

		this.handleModalClose();
	}

	generateRandomUser = () => {
		var randomInt = Math.floor(Math.random() * 100);
		const username = randomNames[randomInt];
		//(randomNames[randomInt]);
		const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
		//new user obj
		var newUser = {
			id: this.getUserId(),
			name: username,
			email: username + "@random.com",
			color: randomColor
		}

		var userList = this.findUserList();

		//add new user to new array
		userList.push(newUser);

		//save new array to local storage
		localStorage.setItem("USERS", JSON.stringify(userList));

		this.forceUpdate();
	}

	findUserList = () => {
		var arr = JSON.parse(localStorage.getItem('USERS'));
		return arr;
	}

	render() {
		var userList = this.findUserList();
		//console.log(userList);
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
						<div className="header" id="newuser">
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
								<p className="randomButton" onClick={this.generateRandomUser}>add random user</p>
							</Form>
						</div>
					</div> :
					// hidden add user section
					<div className="addUserSection">
						<div className="header" id="newuser">
							<h2 onClick={this.toggleAddUserVisibility}>New User</h2>
							<PlusLg className="icon" size={26} onClick={this.toggleAddUserVisibility}/>
						</div>
					</div>
					}

					<div className="modal">
						<Modal show={this.state.showModal} onHide={this.handleModalClose}>
							<Modal.Header closeButton>
								<Modal.Title>New Appointment for: </Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form onSubmit={this.handleModalSubmit}>
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
										<Button className="m-2" type="submit">Submit</Button>
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