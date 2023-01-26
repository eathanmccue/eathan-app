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
      scheduleReloadFlag: 1
    }
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

  updateSchedule = () => {
    this.setState({
      scheduleReloadFlag: this.state.scheduleReloadFlag * 3
    });
    // when scheduleReload changes, schedule component will be re rendered
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
              {this.state.pageId === "schedule" ? <Schedule updateScheduleFlag={this.state.scheduleReloadFlag} /> : null }
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
