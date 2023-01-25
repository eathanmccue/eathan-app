import React, { Component } from 'react'
import './Page.css';
import Viewport from './Viewport';

export class Schedule extends Component {

  render() {
    return (
      <>
        <div className="header">
          <h2>Schedule</h2>
        </div>

        <div className="schedule">
          <Viewport renderWeekday={this.props.renderWeekday}/>
        </div>
      </>
    )
  }
}

export default Schedule