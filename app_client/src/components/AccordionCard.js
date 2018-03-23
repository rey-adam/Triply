import React, { Component } from 'react';
import Moment from 'react-moment';

class AccordionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numTrips: '',
            userData: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            numTrips: nextProps.numTrips,
            userData: nextProps.userData
        });
        console.log(this.state.numTrips);
        console.log(this.state.userData);
    }

    render() {
        return (
            this.state.numTrips === 0 ?
                <h3>Add a trip!</h3>
                :
                this.state.userData.Trips.map((trip, i) => {
                    <div className="card">
                        <div className="card-header" id={`heading${i}`}>
                            <h5 className="mb-0">
                                <button className="btn accordion-link collapsed" data-toggle="collapse" data-target={`#collapse${i}`} aria-expanded="false" aria-controls={`collapse${i}`}>
                                    <h4>{trip.name}
                                        <span className="spacer">|</span>
                                        <span className="trip-date">
                                            <Moment format="MMM DD YYYY">
                                                {trip.start}
                                            </Moment>
                                            -
                                                            <Moment format="MMM DD YYYY">
                                                {trip.end}
                                            </Moment>
                                        </span>
                                    </h4>
                                </button>
                            </h5>
                        </div>
                        <div id={`collapse${i}`} className="collapse" aria-labelledby={`heading${i}`} data-parent="#accordion">
                            <div className="card-body">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <span style={{ fontWeight: 500 }}>{`${trip.Locations[0].name} National Park`}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        Trails:
                                                        <ul>
                                            {trip.Locations[0].Trails.map((trail, i) => {
                                                <li>trail.name</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        Activities:
                                                        <ul>
                                            {trip.Locations[0].Activities.map((activity, i) => {
                                                <li>activity.name</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        Campsites:
                                                        <ul>
                                            {trip.Locations[0].Campsites.map((campsite, i) => {
                                                <li>campsite.name</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        Visitor Centers:
                                                        <ul>
                                            {trip.Locations[0].VisitorCenters.map((vc, i) => {
                                                <li>vc.name</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
        );
    };
};

export default AccordionCard;