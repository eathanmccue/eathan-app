import React, { Component } from 'react';
import './Viewport.css';
import Appointment from './Appointment';

export class Viewport extends Component {

    constructor(props){
        super(props);

        this.state = {
            reloadFlag: this.props.reloadFlag,
            weekly_appts: this.props.weekly_appts
        };
    }

    renderWeekday = (index) => {
        /*
        var weekly_appts = JSON.parse(localStorage.getItem("WEEKLY_APPTS"));
        var organizedDailyArray = [
            [],[],[],[],[],[],[]
        ];
        for(var j = 0; j < day_arr.length; j++){
            var weekday = day_arr[j];

            var daily_appts = [];
            var dayOfTheWeek = day_arr.indexOf(weekday);
            //var weekly_appts = JSON.parse(localStorage.getItem('WEEKLY_APPTS'));
            
            for(var i = 0; i < weekly_appts.length; i++){
                let apptDate = new Date("" + weekly_appts[i].date + "T00:00:00.000-08:00");
                
                if(apptDate.getDay() === dayOfTheWeek){
                    daily_appts.push(weekly_appts[i]);
                    //console.log("appt: ", weekly_appts[i]);
                }
                // DAILY APPTS POPULATED
                // assign to organized array
                organizedDailyArray[0][j] = daily_appts;
                
            }
            //console.log("daily appts for " + weekday + " added:", organizedDailyArray[j]);
        }
        
    
        // return all the appts from daily_appts as appointment components
        return(<div>
          {organizedDailyArray[0][index].map((appt, index) => (
            <Appointment id={appt.id} user={appt.user} date={appt.date} time={appt.time} key={index} showModal={this.props.showModal} reloadFlag={this.state.reloadFlag} />
          ))}
        </div>);
        */

        // Organize weekly array into days.

        //get weekly appointments
        var weekly_appts = JSON.parse(localStorage.getItem("WEEKLY_APPTS"));
        var daily_arr = [];

        if(weekly_appts.length === 0){
            //console.log("NO APPTS!!!!!");
            return;
            // no appts this week
        }
        // there is appts this week! :D
        for(var i = 0; i < weekly_appts.length; i++){
            //console.log(weekly_appts[i]);
            var apptDateObject = new Date("" + weekly_appts[i].date + "T00:00:00.000-08:00");

            if(apptDateObject.getDay() === parseInt(index)){
                // add to daily array
                daily_arr.push(weekly_appts[i]);
            }
            else{
                continue;
            }
        }
        // weekly appts exhausted
        // return daily array mapped to appointment components
        return(
            <div>
                {daily_arr.map((appt, index) => (
                    <Appointment id={appt.id} user={appt.user} date={appt.date} time={appt.time} key={index} showModal={this.props.showModal} updateDash={this.props.updateDash} />
                ))}
            </div>
        )

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
                        {this.renderWeekday(0)}
                    </div>

                    <div className='weekday' id="mon">
                        {this.renderWeekday(1)}
                    </div>

                    <div className='weekday' id="tue">
                        {this.renderWeekday(2)}
                    </div>

                    <div className='weekday' id="wed">
                        {this.renderWeekday(3)}
                    </div>

                    <div className='weekday' id="thu">
                        {this.renderWeekday(4)}
                    </div>

                    <div className='weekday' id="fri">
                        {this.renderWeekday(5)}
                    </div>

                    <div className='weekday' id="sat">
                        {this.renderWeekday(6)}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Viewport