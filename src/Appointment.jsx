import React, { Component } from 'react';
import './Appointment.css';
import { Clock, InfoCircle, Telephone, Geo, ChevronDown, ChevronUp, PencilSquare } from 'react-bootstrap-icons';

export class Appointment extends Component {

    constructor(props){
        super(props);

        // adding id to properly identify
        this.state = {
            id: this.props.id,
            user: this.props.user,
            date: this.props.date,
            time: this.props.time,
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
        <div className='info'>
            <p>{this.state.id}</p>
        </div>
        </>

        return (
        <div className="button" style={{backgroundColor: this.state.user.color}}>

            <div className="head">
                <div className='flexbox'>
                    <p>{this.state.user.name}</p>
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