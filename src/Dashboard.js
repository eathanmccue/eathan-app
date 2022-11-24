import React, { Component } from 'react';
import './Dashboard.css'
import { Button, Container, Row, Col } from 'react-bootstrap';
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
      pageId: ""
    }
  }

  handleClick = (event) => {
    console.log("page: " + event.currentTarget.id);
    this.setState({
      pageId: event.currentTarget.id
    });
  }

  render() {
    return (
      <>
        <Nav username={this.props.username}/>
        <Container className='viewport'>
            <Container className='header'>
                <h2>Dashboard</h2>
                <p>Welcome, <b>{this.props.username}</b>!</p>
            </Container>

            <Container id='pagesTitle'>
              <h2>Pages</h2>
            </Container>
                
            <Container className="pages">
              <Row>
                <Col className="fill" md="auto">
                  <Button id="schedule" variant="primary" size="lg" onClick={ (event) => {
                    //this.handleClick(this.id);
                    console.log("state when clicked is: " + this.state.pageId);
                    this.setState({
                      pageId: event.currentTarget.id
                    });
                    console.log("set state to: " + event.currentTarget.id);
                    
                  }}>
                    <CalendarEventFill size={54} />
                  </Button>
                </Col>
                <Col className="fill" md="auto">
                  <Button id="users" variant="success" size="lg" onClick={ (event) => {
                    //this.handleClick(this.id);
                    console.log("state when clicked is: " + this.state.pageId);
                    this.setState({
                      pageId: event.currentTarget.id
                    });
                    console.log("set state to: " + event.currentTarget.id);
                    
                  }}>
                    <FilePersonFill size={54}/>
                  </Button>
                </Col>
                <Col className="fill" md="auto">
                  <Button id="portal" className="btn" variant="warning" size="lg" onClick={ (event) => {
                    //this.handleClick(this.id);
                    console.log("state when clicked is: " + this.state.pageId);
                    this.setState({
                      pageId: event.currentTarget.id
                    });
                    console.log("set state to: " + event.currentTarget.id);
                    
                  }}>
                    <PostcardHeartFill size={54} color="white"/>
                  </Button>
                </Col>
                <Col className="fill" md="auto">
                  <Button id="settings" variant="secondary" size="lg" onClick={ (event) => {
                    //this.handleClick(this.id);
                    console.log("state when clicked is: " + this.state.pageId);
                    this.setState({
                      pageId: event.currentTarget.id
                    });
                    console.log("set state to: " + event.currentTarget.id);
                    
                  }}>
                    <GearFill size={54}/>
                  </Button>
                </Col>
              </Row>
            </Container>

            <Container>
              {this.state.pageId === "schedule" ? <Schedule /> : null }
              {this.state.pageId === "users" ? <Users /> : null }
              {this.state.pageId === "portal" ? <Portal /> : null }
              {this.state.pageId === "settings" ? <Settings logout={this.props.logout}/> : null }
            </Container>
            
        </Container>
      </>
    );
  }
}

export default Dashboard