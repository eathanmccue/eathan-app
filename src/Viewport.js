import React, { Component } from 'react';
import './Viewport.css';
import Appointment from './Appointment';

export class Viewport extends Component {

    renderDay(day){
        var dailySchedule = [];

        var apptArr = JSON.parse(localStorage.getItem("APPTS"));

        if(apptArr === null){
            //no appts
            return <></>;
        }
        else{
            apptArr.forEach(appt => {
                if(day === this.getDayIndex(appt.day)){ //only push for correct weekday
                    dailySchedule.push(appt);
                }
            });
        }
        
        if(dailySchedule[0] === null){
            return null;
        }
        else{
            return dailySchedule.map(this.mapToAppointment);
        }
    }

    getDayIndex = (day) => {
        var dayIndex;
        switch(day){
            case "sun":
                dayIndex = 0;
                break;
            case "mon":
                dayIndex = 1;
                break;
            case "tue":
                dayIndex = 2;
                break;
            case "wed":
                dayIndex = 3;
                break;
            case "thu":
                dayIndex = 4;
                break;
            case "fri":
                dayIndex = 5;
                break;
            case "sat":
                dayIndex = 6;
                break;
            default: 
                dayIndex = 7;
                break;
        }
        return dayIndex;
    }

    mapToAppointment = (appt, index) =>{
        return <Appointment name={appt.name} time={appt.time} color={appt.color} key={index} />
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
                        {this.renderDay(0)}
                    </div>

                    <div className='weekday' id="mon">
                        {this.renderDay(1)}
                    </div>

                    <div className='weekday' id="tue">
                        {this.renderDay(2)}
                    </div>

                    <div className='weekday' id="wed">
                        {this.renderDay(3)}
                    </div>

                    <div className='weekday' id="thu">
                        {this.renderDay(4)}
                    </div>

                    <div className='weekday' id="fri">
                        {this.renderDay(5)}
                    </div>

                    <div className='weekday' id="sat">
                        {this.renderDay(6)}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Viewport