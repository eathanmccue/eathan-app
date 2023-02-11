import React, { Component } from 'react';
import './Dashboard.css'
import { Button } from 'react-bootstrap';
import { CalendarEventFill, FilePersonFill, GearFill, PostcardHeartFill } from 'react-bootstrap-icons';
import Nav from './Nav';
import Schedule from './Schedule';
import Users from './Users';
import Portal from './Portal';
import Settings from './Settings';

export class Dashboard extends Component {
	constructor(props){
		super(props);

		this.state = {
			pageId: "",
			scheduleReloadFlag: 1,
			reloadFlag: 1,
			appts: JSON.parse(localStorage.getItem('APPTS'))
		}
	}

	findWeeklyAppts = () => {
		//if weekly appts exists, print
		console.log(this.state.appts);

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
					}
				}
			}
		}
		// weekly_arr POPULATED, save to storage
		localStorage.removeItem('WEEKLY_APPTS');
		localStorage.setItem('WEEKLY_APPTS', JSON.stringify(weekly_appts));
	}

	handleClick = (event) => {
		this.setState({
		pageId: event.currentTarget.id
		});
	}

	navClick = () => {
		this.setState({
		pageId: "settings"
		});
	}

	updateSchedule = () => {
		this.setState({
		scheduleReloadFlag: this.state.scheduleReloadFlag * 3
		});
		
	}

	updateDash = () => {
		/* this.setState(state => ({
		reloadFlag : state.reloadFlag * 3,
		appts: JSON.parse(localStorage.getItem("APPTS"))
		})); */

		

		this.forceUpdate();
	}

	render() {
		this.findWeeklyAppts();
		return (
		<>
			<Nav loggedIn={true} username={this.props.username} clickFunction={this.navClick} />

			<div className="dashboard">
			<div className='header'>
				<h2>Dashboard</h2>
				<p>Welcome, <b>{this.props.username}</b>!</p>
			</div>

			<div className='header'>
				<h2>Pages</h2>
			</div>
					
			<div className="pageButtons">
				<Button className="btn" id="schedule" variant="outline-light" size="lg" onClick={this.handleClick}>
				<CalendarEventFill className="" size={54} />
				</Button>

				<Button className="btn" id="users" variant="outline-light" size="lg" onClick={this.handleClick}>
				<FilePersonFill className="" size={54} />
				</Button>

				<Button className="btn" id="portal" variant="outline-light" size="lg" onClick={this.handleClick}>
				<PostcardHeartFill className="" size={54} />
				</Button>

				<Button className="btn" id="settings" variant="outline-light" size="lg" onClick={this.handleClick}>
				<GearFill className="iconSpin" size={54} />
				</Button>


					
				</div>

				<div className="renderArea">
				{this.state.pageId === "schedule" ? <Schedule updateDash={this.updateDash} updateScheduleFlag={this.state.scheduleReloadFlag} weekly_appts={this.state.weekly_appts} /> : null }
				{this.state.pageId === "users" ? <Users updateSchedule={this.updateSchedule} /> : null }
				{this.state.pageId === "portal" ? <Portal /> : null }
				{this.state.pageId === "settings" ? <Settings logout={this.props.logout}/> : null }
				</div>
				
			</div>
		</>
		);
	}
}

export default Dashboard;
