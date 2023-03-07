
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Portal.css';
import manulife from './img/manulife-logo.png';
import gms from './img/gms-logo.png';
import sunlife from './img/sunlife-logo.png';
import { BoxArrowUpRight } from 'react-bootstrap-icons';

export class Portal extends Component {
    render() {
        return (
            <>
                <div className='header'>
                    <h2>Portal</h2>
                </div>

                <div className="portals">
                    <div className='search'>
                        <div className="titles">
                            <h3>Search user</h3>
                        </div>
                        <div className='form'>
                            <Form>
                                <Form.Group>
                                    <Form.Control className="input" type="text" placeholder="Name"></Form.Control>
                                    <Form.Control className="input" type="text" placeholder="ID"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button>Search</Button>
                                </Form.Group>
                                
                            </Form>
                        </div>
                        
                    </div>

                    <div className='links'>
                        <div className="titles">
                            <h3>Quick Links</h3>
                            <BoxArrowUpRight size={24}/>
                        </div>
                        
                        <div className='linksContainer'>
                            <a href="https://www.manulife.ca/personal/insurance.html" target="_blank" rel="noreferrer">
                                <img src={manulife} alt="manulife logo"></img>
                            </a>
                            <a href="https://www.gms.ca/" target="_blank" rel="noreferrer">
                                <img src={gms} alt="gms logo"></img>
                            </a>
                            <a href="https://www.sunlife.ca/en/health/" target="_blank" rel="noreferrer">
                                <img src={sunlife} alt="sunlife logo"></img>
                            </a>
                        </div>
                         
                    </div>
                </div>
            </>
        )
    }
}

export default Portal