import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Page.css';

export class Settings extends Component {

  render() {
    return (
      <>
        <div className='header'>
          <h2>Settings</h2>
        </div>

        <div className='settings'>
			<ul>
				<li>
					<Form.Group>
						<p>Change System Theme</p>
						<Form.Control type='color' value='#ff0000'></Form.Control>
					</Form.Group>
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