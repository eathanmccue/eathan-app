import React, { Component } from 'react';
import './Dashboard.css'
import { Button } from 'react-bootstrap';
import { CalendarEventFill, FilePersonFill, GearFill, PostcardHeartFill } from 'react-bootstrap-icons';
import Nav from './Nav';
import Schedule from './Schedule';
import Users from './Users';
import Portal from './Portal';
import Settings from './Settings';
import Appointment from './Appointment';

var day_arr = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var appt_arr = JSON.parse(localStorage.getItem('APPTS'));
var weekly_appts = [];

export class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      pageId: ""
    }
  }

  update = (page) => {
    this.forceUpdate();
    this.setState({
      pageId: page
    });
  }

  componentDidMount(){
    //find current week
    const todaysDate = new Date();
    //console.log(todaysDate.toString('yyyy-MM-dd'));
    

    //for each appointment in localstorage array
    for(var i = 0; i < appt_arr.length; i++){
        
        var appointmentDate = new Date("" + appt_arr[i].date + "T00:00:00.000-08:00");
        var time_arr = appt_arr[i].time.split(":");
        time_arr[0] = (parseInt(time_arr[0]) + 8) % 24; // adjust for UTC conversion
        appointmentDate.setUTCHours(time_arr[0], time_arr[1]); // sets hours, mins
        //console.log("today: " + todaysDate);
        //console.log(appt_arr[i].time);
        //console.log("appt date: " + appointmentDate);

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
    //console.log(weekly_appts);
  }

  renderWeekday = (weekday) => {
    var daily_appts = [];
    //var appointmentDate = new Date("" + appt_arr[i].date + "T" + "00:00:00.000-08:00");
    for(var i = 0; i < weekly_appts.length; i++){
        let apptDate = new Date("" + weekly_appts[i].date + "T00:00:00.000-08:00");
        //console.log(apptDate.getDay())
        if(apptDate.getDay() === day_arr.indexOf(weekday)){
            //console.log("day is correct. it is " + weekday);
            daily_appts.push(weekly_appts[i]);
            //console.log(daily_appts);
        }
    }
    console.log("appts for " + weekday + daily_appts);
    //return daily_appts;

    return(<div>
      {daily_appts.map((appt, index) => (
        <Appointment name={appt.user.name} date={appt.date} time={appt.time} color={appt.user.color} key={index} />
      ))}
    </div>);
  }

  mapToAppointment = (appt, index) => {
    return <Appointment name={appt.user.name} date={appt.date} time={appt.time} color={appt.user.color} key={index} />
  }

  newAppt = () => {
    this.setState({
      pageId: "newAppt"
    });
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

  render() {
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
              {this.state.pageId === "schedule" ? <Schedule renderWeekday={this.renderWeekday} /> : null }
              {this.state.pageId === "users" ? <Users updatePage={this.update} /> : null }
              {this.state.pageId === "portal" ? <Portal /> : null }
              {this.state.pageId === "settings" ? <Settings logout={this.props.logout}/> : null }
            </div>
            
        </div>
      </>
    );
  }
}

export default Dashboard;
