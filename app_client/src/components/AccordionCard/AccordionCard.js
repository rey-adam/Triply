import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './AccordionCard.css';

class AccordionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numTrips: '',
            userData: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.state.numTrips = nextProps.numTrips;
        this.state.userData = nextProps.userData;
    }

    render() {
        const userData = this.state.userData;
        return (
            userData == null || userData.Trips == undefined || userData.Trips.length === 0 ? <h3 className="no-trips-message">No trips added</h3> : 
            userData.Trips.map((trip, i) => (
                <div key={i} className="card">
                    <div className="card-header" id={`heading${i}`}>
                        <h5 className="mb-0">
                                <button className="btn accordion-link collapsed" data-toggle="collapse" data-target={`#collapse${i}`} aria-expanded="false" aria-controls={`collapse${i}`}>
                                <h4>{trip.name}
                                    <span className="spacer">|</span>
                                    <span className="trip-date">
                                        <Moment format="MMM DD YYYY">{trip.start}</Moment>
                                            <span className="hyphen"> - </span>
                                        <Moment format="MMM DD YYYY">{trip.end}</Moment>
                                    </span>
                                </h4>
                            </button>
                        </h5>
                    </div>

                    <div id={`collapse${i}`} className="collapse" aria-labelledby={`heading${i}`} data-parent="#accordion">

                        {trip.Locations[0] === undefined ? 

                            <div className="card-body">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <span className=" empty-card-title card-park-title card-title">No park added</span>
                                        <Link to={`/park?tripId=${trip.id}`}>
                                            <button
                                                data-trip-id={trip.id}
                                                className='btn btn-primary pull-right card-add-btn'
                                            >Add</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            :

                            <div>
                                <div className="card-body">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            {trip.Locations[0] === undefined ?
                                                <div>
                                                    <span className=" empty-card-title card-park-title card-title">No park added</span>
                                                    <button id="park-add-btn" className='btn btn-primary pull-right card-add-btn'>Add</button>
                                                </div>
                                                : 
                                                <span className="card-park-title card-title">{`${trip.Locations[0].name} National Park`}</span>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                                <div>
                                                    <p className={trip.Locations[0].Trails.length === 0 ? 'empty-card-title card-title' : 'card-title'}>
                                                        Trails:
                                                        <Link to={`/search/trails?tripId=${trip.id}&locationId=${trip.Locations[0].id}&parkCode=${trip.Locations[0].parkCode}&lat=${trip.Locations[0].latitude}&lng=${trip.Locations[0].longitude}`}>
                                                            <button
                                                                id="trail-add-btn"
                                                                className='btn btn-primary pull-right card-add-btn'>
                                                            Add</button>
                                                        </Link>
                                                    </p>
                                                    {trip.Locations[0].Trails.length === 0 ? '' :
                                                        <ul>
                                                            {trip.Locations[0].Trails.map((trail, i) => (
                                                                    <li key={i}>{trail.name}</li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                                <div>
                                                    <p className={trip.Locations[0].Activities.length === 0 ? 'empty-card-title card-title' : 'card-title'}>
                                                        Activities:
                                                        <Link to={`/search/activities?tripId=${trip.id}&locationId=${trip.Locations[0].id}&parkCode=${trip.Locations[0].parkCode}&lat=${trip.Locations[0].latitude}&lng=${trip.Locations[0].longitude}`}>
                                                            <button
                                                                id="activity-add-btn"
                                                                className='btn btn-primary pull-right card-add-btn'>
                                                                Add</button>
                                                        </Link>
                                                    </p>
                                                    {trip.Locations[0].Activities.length === 0 ? '' :
                                                        <ul>
                                                            {trip.Locations[0].Activities.map((activity, i) => (
                                                                    <li key={i}>{activity.name}</li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card-body">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                                <div>
                                                    <p className={trip.Locations[0].Campsites.length === 0 ? 'empty-card-title card-title' : 'card-title'}>
                                                        Campsites:
                                                        <Link to={`/search/campsites?tripId=${trip.id}&locationId=${trip.Locations[0].id}&parkCode=${trip.Locations[0].parkCode}&lat=${trip.Locations[0].latitude}&lng=${trip.Locations[0].longitude}`}>
                                                            <button
                                                                id="camp-add-btn"
                                                                className='btn btn-primary pull-right card-add-btn'>
                                                                Add</button>
                                                        </Link>
                                                    </p>
                                                    {trip.Locations[0].Campsites.length === 0 ? '' :
                                                        <ul>
                                                            {trip.Locations[0].Campsites.map((camp, i) => (
                                                                    <li key={i}>{camp.name}</li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                                <div>
                                                    <p className={trip.Locations[0].VisitorCenters.length === 0 ? 'empty-card-title card-title' : 'card-title'}>
                                                        Visitor Centers:
                                                        <Link to={`/search/visitor?tripId=${trip.id}&locationId=${trip.Locations[0].id}&parkCode=${trip.Locations[0].parkCode}&lat=${trip.Locations[0].latitude}&lng=${trip.Locations[0].longitude}`}>
                                                            <button
                                                                id="vc-add-btn"
                                                                className='btn btn-primary pull-right card-add-btn'>
                                                                Add</button>
                                                        </Link>
                                                    </p>
                                                    {trip.Locations[0].VisitorCenters.length === 0 ? '' :
                                                        <ul>
                                                            {trip.Locations[0].VisitorCenters.map((vc, i) => (
                                                                    <li key={i}>{vc.name}</li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            ))
        );
    };
};

export default AccordionCard;