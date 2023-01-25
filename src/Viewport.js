import React, { Component } from 'react';
import './Viewport.css';


export class Viewport extends Component {

    

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
                        {this.props.renderWeekday("sun")}
                    </div>

                    <div className='weekday' id="mon">
                        {this.props.renderWeekday("mon")}
                    </div>

                    <div className='weekday' id="tue">
                        {this.props.renderWeekday("tue")}
                    </div>

                    <div className='weekday' id="wed">
                        {this.props.renderWeekday("wed")}
                    </div>

                    <div className='weekday' id="thu">
                        {this.props.renderWeekday("thu")}
                    </div>

                    <div className='weekday' id="fri">
                        {this.props.renderWeekday("fri")}
                    </div>

                    <div className='weekday' id="sat">
                        {this.props.renderWeekday("sat")}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Viewport