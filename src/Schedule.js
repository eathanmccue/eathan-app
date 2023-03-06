import React, { Component } from 'react'
import './Page.css';
import Viewport from './Viewport';
import { Modal, Form, Button } from 'react-bootstrap';

export class Schedule extends Component {


  constructor(props){
    super(props);

    this.state = {
		scheduleReloadFlag: this.props.updateScheduleFlag,
		daily_appointment_array: [],
		showModalFlag: false,
		modalAppt: {
			user: {name:"", id: ""},
			date: "",
			time: ""
		},
		viewportReloadFlag: 3
    };
  }

  handleModalShow = (id) => {
	this.setState({
		showModalFlag: true
	});

	//console.log(id);

	var apptList = JSON.parse(localStorage.getItem("APPTS"));

	for(var i = 0; i < apptList.length; i++){
		//console.log("apptList[i].id = " + apptList[i].id);
		//console.log("id = " + id);
		if(String(apptList[i].id) === String(id)){
			this.setState({
				modalAppt: apptList[i]
			});
		}
	}
  }

  handleModalClose = () => {
	this.setState({
		showModalFlag: false
	});
  }

  handleModalSubmit = (event) => {
	event.preventDefault();

	//find fields and make variables for inputs
	var dateInput = event.target.parentNode.children[0][0];
	var timeInput = event.target.parentNode.children[0][1];
	
	dateInput.defaultValue = this.state.modalAppt.date;
	timeInput.defaultValue = this.state.modalAppt.time;

	//replace appointment
	var apptId = this.state.modalAppt.id;

	//console.log(apptId);

	var apptList = JSON.parse(localStorage.getItem("APPTS"));
	var newList = [];

	for(var i = 0; i < apptList.length; i++){
		if(apptList[i].id === apptId){
			//console.log("appt found with id: " + apptList[i].id);
			//change data
			var editedAppt = {
				id: apptList[i].id,
				user: apptList[i].user,
				date: dateInput.value,
				time: timeInput.value
			};
			
			console.log("appt " + apptList[i].id + " changed successfully");
			newList.push(editedAppt);
		}
		else{
			newList.push(apptList[i]);
		}
	}

	//update appts in storage
	localStorage.removeItem("APPTS");
	localStorage.setItem("APPTS", JSON.stringify(newList));

	this.props.updateDash(); // reload dash, re find weekly appts

	this.handleModalClose();

  }

  deleteAppt = (id) => {
	//get appts
	var apptList = JSON.parse(localStorage.getItem("APPTS"));
	var newApptArr = [];

	for(var i = 0; i < apptList.length; i++){
		if(apptList[i].id === id){
			//deleted element dont add
		}
		else{
			newApptArr.push(apptList[i]);
		}
	}

	// save to localstorage
	localStorage.setItem("APPTS", JSON.stringify(newApptArr));

	this.forceUpdate();
  }

  getModalNameId = () => {
	var appt = this.state.modalAppt;
	var user = appt.user;
	var name = user.name;
	var id = user.id;

	return (name + " ID#" + id);
  }

  render() {
    return (
		<>
			<div className="header">
				<h2>Schedule</h2>
			</div>

			<div className="schedule">
				<div className="modal">
					<Modal show={this.state.showModalFlag} onHide={this.handleModalClose}>
						<Modal.Header closeButton>
							<Modal.Title>Edit Appointment for: {this.getModalNameId()}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form onSubmit={this.handleModalSubmit}>
								<Form.Group>
									<Form.Control className='mb-2' type="date" defaultValue={this.state.modalAppt.date} />
									<Form.Select className='mb-2' defaultValue={this.state.modalAppt.time}>
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

				<Viewport updateDash={this.props.updateDash} showModal={this.handleModalShow} weekly_appts={this.props.weekly_appts} />
			</div>
		</>
    )
  }
}

export default Schedule