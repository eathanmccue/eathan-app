import React, { Component } from 'react';
import './Appointment.css';
import { Clock, InfoCircle, Telephone, Geo, ChevronDown, ChevronUp, PencilSquare } from 'react-bootstrap-icons';

export class Appointment extends Component {

    constructor(props){
        super(props);

        this.state = {
            color: this.props.color,
            name: this.props.name,
            time: this.props.time,
            date: null,
            infoVisible: false
        }
    }

    toggleInfo = (event) => {
        this.setState({
            infoVisible: !(this.state.infoVisible)
        });
    }
    
    render() {
        const extraInfo = <>
        <div className='icon' id="phone">
            <Telephone size={28}/>
        </div>
        <div className='info' id="phone">
            {"phone"}
        </div>

        <div className='icon'>
            <Geo size={28}/>
        </div>
        <div className='info' id="info">
            {"location"}
        </div>
        </>

        return (
        <div className="button" style={{backgroundColor: this.state.color}}>

            <div className="head">
                <div className='flexbox'>
                    <p>{this.state.name}</p>
                    <PencilSquare className="editIcon" size={20} />
                    {
                        // add onclick method to pencil square icon to bring up modal for editing appt info
                    }
                </div>
            </div>

            <div className="body">
                <div className="infoGrid">
                    
                    <div className='icon' id="time">
                        <Clock size={28}/>
                    </div>
                    <div className='info' id="time">
                        {this.state.time}
                    </div>

                    <div className='icon' id="info" onClick={this.toggleInfo}>
                        <InfoCircle size={28}/>
                    </div>
                    <div className='info' id="info" onClick={this.toggleInfo}>
                        {this.state.infoVisible ? <ChevronUp size={18} className="moreIcon"/>
                        : <ChevronDown size={18} className="moreIcon"/> }
                    </div>
                    
                    {this.state.infoVisible && extraInfo}

                </div>
            </div>

        </div>
        )
    }
}

export default Appointment