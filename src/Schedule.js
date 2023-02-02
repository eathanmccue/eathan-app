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

	localStorage.setItem("APPTS", JSON.stringify(newList));

	this.setState({
		showModalFlag: false,
		modalAppt: {
			user: {name:"", id: ""},
			date: "",
			time: "",
			viewportReloadFlag: this.state.viewportReloadFlag * 13
		} 
	});
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

  findWeeklyAppts = () => {
	//get all appts from local storage
	var appt_arr = JSON.parse(localStorage.getItem('APPTS'));

	//create array for this weeks appts
	var weekly_appts = [];

    //find current week
    const todaysDate = new Date();
    
    //for each appointment in localstorage
    for(var i = 0; i < appt_arr.length; i++){
        
		//assign date object for the appointment
        var appointmentDate = new Date("" + appt_arr[i].date + "T00:00:00.000-08:00");
        var time_arr = appt_arr[i].time.split(":");
        time_arr[0] = (parseInt(time_arr[0]) + 8) % 24; // adjust for UTC conversion
        appointmentDate.setUTCHours(time_arr[0], time_arr[1]); // sets hours, mins

		//check if dates match
        if(todaysDate.getFullYear() === appointmentDate.getFullYear()){
            // year is same , woohoo!
            if(todaysDate.getMonth() === appointmentDate.getMonth()){
                // month is same, great success
                // check if the day is in the same week (sun -> sat)
                //var dayOfTheWeek = todaysDate.getDay(); // 0-6
                //var dayOfTheMonth = todaysDate.getDate(); // 1-31

                // if the date of the appt is within todays week
                if(Math.abs(todaysDate.getDate() - appointmentDate.getDate()) < 7){
                    // could possibly be within the week
                    var startingWeekOffset = todaysDate.getDay(); // (sun = 0, mon = 1, etc...)
                    var endingWeekOffset = 6 - startingWeekOffset;

                    if(appointmentDate.getDate() >= (todaysDate.getDate() - startingWeekOffset) && appointmentDate.getDate() <= (todaysDate.getDate() + endingWeekOffset)){
                        // date is within same sun->sat as today
                        // add it to weekly appts arr
                        weekly_appts.push(appt_arr[i]);
                    }
                    // WEEKLY ARRAY POPULATED
					//console.log('weekly array calculated! resulting array: ', weekly_appts);
					localStorage.setItem('WEEKLY_APPTS', JSON.stringify(weekly_appts));
                }
            }
        }

    }
  }

  getModalNameId = () => {
	var appt = this.state.modalAppt;
	var user = appt.user;
	var name = user.name;
	var id = user.id;

	return (name + " ID#" + id);
  }

  render() {
	this.findWeeklyAppts();
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

				<Viewport reloadFlag={this.state.viewportReloadFlag} renderWeekday={this.renderWeekday} showModal={this.handleModalShow} />
			</div>
		</>
    )
  }
}

export default Schedule