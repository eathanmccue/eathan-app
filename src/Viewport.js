import React, { Component } from 'react';
import './Viewport.css';
import Appointment from './Appointment';

export class Viewport extends Component {

    mapToAppointment = (appt, index) => {
        return <Appointment name={appt.name} time={appt.time} color={appt.color} key={index} />
    }

    getAppointments = () => {
        var appt_arr = JSON.parse(localStorage.getItem('APPTS'));
        console.log(appt_arr);
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
                        {}
                    </div>

                    <div className='weekday' id="mon">
                        {}
                    </div>

                    <div className='weekday' id="tue">
                        {}
                    </div>

                    <div className='weekday' id="wed">
                        {}
                    </div>

                    <div className='weekday' id="thu">
                        {}
                    </div>

                    <div className='weekday' id="fri">
                        {}
                    </div>

                    <div className='weekday' id="sat">
                        {}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Viewport