import React, { Component } from 'react'
import './Page.css';
import Viewport from './Viewport';


export class Schedule extends Component {

  constructor(props){
    super(props);

    this.state = {
		  scheduleReloadFlag: this.props.updateScheduleFlag,
      daily_appointment_array: []
    };

  }

  findWeeklyAppts(){
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
					console.log('weekly array calculated! resulting array: ', weekly_appts);
					localStorage.setItem('WEEKLY_APPTS', JSON.stringify(weekly_appts));
                }
            }
        }

    }
  }

  render() {
	this.findWeeklyAppts();
    return (
      <>
        <div className="header">
          	<h2>Schedule</h2>
        </div>

        <div className="schedule">
        	<Viewport renderWeekday={this.renderWeekday}/>
        </div>
      </>
    )
  }
}

export default Schedule