import React, { Component } from 'react'
import './Page.css';
import Viewport from './Viewport';

export class Schedule extends Component {

  organizeSchedule(){
    var arr = this.props.appts;
    var day, index;
    var sortedAppts = [[]];

    for(var i = 0; i < arr.length; i++){
      day = arr[i].day;
      
      //assign day string to 2d array index
      switch(day){
        case "sun":
          index = 0;
          break;
        case "mon":
          index = 1;
          break;
        case "tue":
          index = 2;
          break;
        case "wed":
          index = 3;
          break;
        case "thu":
          index = 4;
          break;
        case "fri":
          index = 5;
          break;
        case "sat":
          index = 6;
          break;
        default: index = 0;
      }
      console.log("index is" + index);
      sortedAppts[index].push(arr[i]); // adds to 2d array
    } // end of array loop

    // return organized 2d array
    return sortedAppts;

  }

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