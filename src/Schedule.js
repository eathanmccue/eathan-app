import React, { Component } from 'react'
import './Page.css';
import Viewport from './Viewport';

export class Schedule extends Component {
  //constructor goes here
  
  /*
  componentDidMount(){
    var apptArr = JSON.parse(localStorage.getItem("APPTS"));
    var usersArr = JSON.parse(localStorage.getItem("USERS"));

    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const times = ["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30"];

    var day,time,newAppt;
    
    if(usersArr[0]){ // if users exist
      usersArr.forEach((user) => {
        day = Math.floor(Math.random() * 7);    // assign random day
        time = Math.floor(Math.random() * 10);  // assign random time

        //new appt object
        newAppt = {
          name: user.name,
          email: user.email,
          color: user.color,
          day: days[day],
          time: times[time]
        };
  
        apptArr.push(newAppt);
      });
    }
    

    //save appts to local storage
    localStorage.setItem("APPTS", JSON.stringify(apptArr));
  }
  */

  render() {
    return (
      <>
        <div className="header">
          <h2>Schedule</h2>
        </div>

        <div className="schedule">
          <Viewport />
        </div>
      </>
    )
  }
}

export default Schedule