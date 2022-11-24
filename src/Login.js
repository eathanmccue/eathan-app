import React, { Component } from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import './Login.css'
import Nav from './Nav';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: true,
            username: null
        }

        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(event){
        event.preventDefault();
        //console.log(event);
        this.props.signIn(event.target[0].value);
        
    }

    render() {
        return(
            <>
                <Nav username={this.props.username}/>
                <Container className='login'>
                    <Container className='mt-3'>
                        <h1>Log in</h1>
                    </Container>
                    
                    <Container className='inputs'>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group className="mt-3 mb-3" controlId="formBasicUsername">
                                <Form.Control type="text" value={this.state.value} placeholder="username" onChange={this.changeHandler} />
                            </Form.Group>
            
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="submitButton">
                                <Button className="text-center" variant="primary" type="submit">
                                    Log in
                                </Button>
                            </Form.Group>
                        </Form>
                    </Container>
                </Container>
            </>
        );
    }
}
