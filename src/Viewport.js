import React, { Component } from 'react';
import Schedule from './Schedule';
import Users from './Users';
import './Viewport.css';

export class Viewport extends Component {
    constructor(props){
        super(props);

        
    }

    render() {
        return (
            <div className='schedule'></div>
        );
    }
}

export default Viewport