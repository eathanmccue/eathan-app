import React, { Component } from 'react';
import './Viewport.css';
import Appointment from './Appointment';


const day_arr = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];


export class Viewport extends Component {

    renderWeekday = (weekday) => {
        var daily_appts = [];
        var weekly_appts = JSON.parse(localStorage.getItem('WEEKLY_APPTS'));
        
        for(var i = 0; i < weekly_appts.length; i++){
            let apptDate = new Date("" + weekly_appts[i].date + "T00:00:00.000-08:00");
            
            if(apptDate.getDay() === day_arr.indexOf(weekday)){
                daily_appts.push(weekly_appts[i]);
                console.log("appt: ", weekly_appts[i]);
            }
            // DAILY APPTS POPULATED
        }
    
        // return all the appts from daily_appts as appointment components
        return(<div>
          {daily_appts.map((appt, index) => (
            <Appointment name={appt.user.name} date={appt.date} time={appt.time} color={appt.user.color} key={index} />
          ))}
        </div>);
    }
    
    mapToAppointment = (appt, index) => {
        return <Appointment name={appt.user.name} date={appt.date} time={appt.time} color={appt.user.color} key={index} />
    }

    render() {
        
        return (
            <div className='background'>
                <div className="gridContainer">
                    <div className="gridTitles">
                        <h1>Sunday</h1>
                        <h1>Monday</h1>
                        <h1>Tuesday</h1>
                        <h1>Wednesday</h1>
                        <h1>Thursday</h1>
                        <h1>Friday</h1>
                        <h1>Saturday</h1>
                    </div>

                    <div className='weekday' id="sun">
                        {this.renderWeekday("sun")}
                    </div>

                    <div className='weekday' id="mon">
                        {this.renderWeekday("mon")}
                    </div>

                    <div className='weekday' id="tue">
                        {this.renderWeekday("tue")}
                    </div>

                    <div className='weekday' id="wed">
                        {this.renderWeekday("wed")}
                    </div>

                    <div className='weekday' id="thu">
                        {this.renderWeekday("thu")}
                    </div>

                    <div className='weekday' id="fri">
                        {this.renderWeekday("fri")}
                    </div>

                    <div className='weekday' id="sat">
                        {this.renderWeekday("sat")}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Viewport