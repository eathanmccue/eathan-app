import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Page.css';

export class Settings extends Component {

	submitColor = (event) => {
		event.preventDefault();
		this.props.changeColor(event.target[0].value);
	}

	render() {
		return (
		<>
			<div className='header'>
			<h2>Settings</h2>
			</div>

			<div className='settings'>
				<ul>
					<li>
						<Form onSubmit={this.submitColor}>
							<Form.Group>
								<p>Change System Theme:</p>
								<Form.Control type='color' defaultValue={this.props.currentColor}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Button type="submit">Submit</Button>
							</Form.Group>
						</Form>
					</li>

					<li>
						<p>Clear remembered username</p>
					</li>
					
					<li>
						<p onClick={this.props.logout}>Logout</p>
					</li>
				</ul>
			
			
				
			</div>
		</>
		)
	}
}

export default Settings