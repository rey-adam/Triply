import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
// import Forecast from 'react-forecast';
import ForecastNew from '../../components/ForecastNew';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import SimpleMap from '../MapContainerB/MapContainerB';
import ReactModal from 'react-modal';
import MAPAPI from '../../helpers/api/mapsApi/mapsApi';
import NPSAPI from "../../helpers/api/npsApi/npsAPI";
import REIAPI from "../../helpers/api/reiApi/reiApi";
import qs from 'query-string';
import './Dashboard.css';
import UserModel from "../../helpers/models/UserModel";
import authHelper from '../../helpers/authHelper';

const styles = {
    modalStyles: {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.589)',
            position: 'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '32vw',
            height: '33vh',
            textAlign: 'center',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '400'
        }
    }
};

class Dashboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // API DATA
            userData: {},
            camps: [],
            activities: [],
            visitorCenters: [],
            trails: [],
            // END API DATA
            newTripName: '',
            weatherLat: 0,
            weatherLng: 0,
            weatherPlace: '',
            weatherUnits: 'us',
            today: new Date(),
            modalIsOpen: false,
            show: false

        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
        this.handleNewTrip = this.handleNewTrip.bind(this);
        this.handleParkRedirect = this.handleParkRedirect.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleZipSubmit = this.handleZipSubmit.bind(this);
        this.handleLocationAPIRequest = this.handleLocationAPIRequest.bind(this);
    };

    componentDidMount() {
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
         *                       OUTPUT                        *
         * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * /search/trails === [nothing]                        *
         * /search/trails === {?lat=44.42&lng=-110.58}         *
         * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        const locationObj = qs.parse(this.props.location.search);

        console.log(locationObj);
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
        *                                 OUTPUT                                    *
        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        * /search/trails === {}                                                     *
        * /search/trails?lat=44.42&lng=-110.58 === {lat: "44.42", lng: "-110.58"}   *
        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        this.handleNewUser();

        this.setState({
            weatherLat: locationObj.lat || 37.84883288,
            weatherLng: locationObj.lng || -119.5571873,
            weatherPlace: locationObj.place || 'Yosemite National Park',
        });

        //UserModel.getOne(authHelper.splitToken().id)
        let userInfo;
        UserModel.getOne(authHelper.splitToken(authHelper.getToken()).id)
        .then(res => {
            
            userInfo = res.data;
            
            console.log("user info data");
            console.log(userInfo); // { id: 3, email: 'melodie@chi.com' }
            console.log(this.state.userData); // {}

            this.setState({ userData: userInfo });
            console.log(this.state.userData); // { id: 3, email: 'melodie@chi.com' }


            // RETURNING THE NATIONAL PARK API CAMPSITE CALL
            return NPSAPI.campgrounds('yose');
        })
        .then(npsRes => {
            // better idea to use seperate queries based on id from user info
            // I.E. NPSAPI.camp(parkCode, userInfo.Trips[0].Locations[0].Campsites[0].campId)
            console.log("=============== ALL CAMPS API ==============");

            console.log(npsRes.data.data);
            
            userInfo.Trips.forEach(trip => {
                trip.Locations.forEach(loc => {
                    const campsites = npsRes.data.data.filter(elem => {
                        const val = loc.Campsites.find(camp => {
                            return camp.campId === elem.id
                        })
                        return val != null;
                    }); // END  

                    console.log(campsites);
                    this.state.camps.push(campsites);
                }); // END FOR EACH
            }); // END FOR EACH
            
            return NPSAPI.visitorCenters('yose');

        }).then(npsRes => {
            // better idea to use seperate queries based on id from user info
            // I.E. NPSAPI.camp(parkCode, userInfo.Trips[0].Locations[0].Campsites[0].campId)
            console.log("=============== VISITOR CENTER API ==============");

            console.log(npsRes.data.data);
            
            userInfo.Trips.forEach(trip => {
                trip.Locations.forEach(loc => {
                    const visitorcenter = npsRes.data.data.filter(elem => {
                        const val = loc.VisitorCenters.find(center => {
                            return center.centerId === elem.id
                        });
                        return val != null;
                    }); // END  

                    console.log(visitorcenter);
                    this.state.visitorCenters.push(visitorcenter);
                }); // END FOR EACH
            }); // END FOR EACH

            return NPSAPI.events('yose');

        }).then(npsRes => {
            // better idea to use seperate queries based on id from user info
            // I.E. NPSAPI.camp(parkCode, userInfo.Trips[0].Locations[0].Campsites[0].campId)
            console.log("=============== EVENTS API ==============");
            
            console.log(npsRes.data.data);

            userInfo.Trips.forEach(trip => {
                trip.Locations.forEach(loc => {
                    const events = npsRes.data.data.filter(elem => {
                        const val = loc.Activities.find(events => {
                            return events.eventId === elem.id
                        });
                        return val != null;
                    }); // END  

                    console.log(events);
                    this.state.activities.push(events);
                }); // END FOR EACH
            }); // END FOR EACH

            return MAPAPI.location("yosemite");

        }).then(mapRes => {
            
            console.log(mapRes.data.results[0].geometry.location);
            
            const lat = mapRes.data.results[0].geometry.location.lat;
            const lon = mapRes.data.results[0].geometry.location.lng;

            return REIAPI.trails(lat, lon);
            
        }).then(reiRes => {
            
            console.log("=============== TRAILS API ==============");

            console.log(reiRes.data.trails);

            userInfo.Trips.forEach(trip => {
                trip.Locations.forEach(loc => {
                    const hikes = reiRes.data.trails.filter(elem => {
                        const val = loc.Trails.find(hikes => {
                            return hikes.hikeId === elem.id
                        });
                        return val != null;
                    }); // END  

                    console.log(hikes);
                    this.state.activities.push(hikes);
                }); // END FOR EACH
            }); // END FOR EACH

        })
        .catch(err => console.error(err));

    }; // END MOUNT

    // =====================================================================================
    // MODAL FUNCTIONS
    // =====================================================================================
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
        window.localStorage.setItem('isNewUser', 1);
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    // =====================================================================================
    // HANDLE FUNCTIONS
    // =====================================================================================
    handleNewUser() {
        let isNewUser = window.localStorage.getItem('isNewUser');
        // console.log(`isNewUser: ${isNewUser === null ? true : false}`);
        if (isNewUser === null) {
            this.openModal();
        }
    }

    handleNewTrip(e) {
        e.preventDefault();
        console.log(this.state.newTripName);
        if (this.state.newTripName === '') {
            alert('Please enter a trip name');
        } else {
            this.handleShow();
        }
    }

    handleParkRedirect(e) {
        e.preventDefault();
        this.props.history.push('/park');
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            // e.preventDefault();
            this.handleNewTrip(e);
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleZipSubmit(e) {
        e.preventDefault();
        const weatherSearch = document.getElementById('weather-search').value;
        this.handleLocationAPIRequest(weatherSearch)
        .then(locationRes => {
            console.log(locationRes);
            this.setState({
                weatherLat: locationRes.latitude,
                weatherLng: locationRes.longitude,
                weatherPlace: locationRes.name
            });
            this.props.history.push(`/?lat=${this.state.weatherLat}&lng=${this.state.weatherLng}&place=${this.state.weatherPlace}`);
            window.location.reload();
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleLocationAPIRequest(query) {
    return MAPAPI
        .location(query)
        .then(mapRes => {
            console.log(mapRes.data.results[0]);
            const latitude = mapRes.data.results[0].geometry.location.lat
                , longitude = mapRes.data.results[0].geometry.location.lng
                , name = mapRes.data.results[0].formatted_address.split(',')[0];
            return {
                latitude,
                longitude,
                name
            };
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="dashboard-container">
                <Navbar />
                <div className="dash-content-wrapper">

                    {/* create new trip form */}
                    <div id="create-trip-div">
                        <form className="create-trip-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="new-trip-name"
                                    className="form-control"
                                    name="newTripName"
                                    value={this.state.newTripName}
                                    onChange={this.handleChange}
                                    onKeyPress={this.handleKeyPress}
                                    onSubmit={this.handleNewTrip}
                                    placeholder="New trip name..." />
                                <button className="btn" type="submit">
                                    <span
                                        className="glyphicon glyphicon-ok-sign"
                                        aria-hidden="true"
                                        onClick={this.handleNewTrip}>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="second-row">
                        <div className="user-trips">
                            <div className="trips-header">
                                <p>My Trips</p>
                            </div>
                            <div id="accordion">
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                            <button className="btn accordion-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                <h4>Bday @ Yosemite! <span className="spacer">|</span> <span className="trip-date">Mar 30 2018 - Apr 27 2018</span></h4>
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div className="card-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <span style={{ fontWeight: 500 }}>Yosemite National Park</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    Activity example (hike trail name)
                                            </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    Visitor Center (visitor center name)
                                            </div>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    Campsite example (campsite name)
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="card">
                                    <div className="card-header" id="headingThree">
                                        <h5 className="mb-0">
                                            <button className="btn accordion-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                                                <h4>Glacier Roadtrip w/ Fam <span className="spacer">|</span> <span className="trip-date">Jan 2 2019 - Feb 3 2019</span></h4>
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                        <div className="card-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <span style={{ fontWeight: 500 }}>Glacier National Park</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    Activity example (hike trail name)
                                            </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    Visitor Center (visitor center name)
                                            </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    Campsite example (campsite name)
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <InfiniteCalendar
                            selected={this.state.today}
                            minDate={new Date()}
                            displayOptions={{ layout: 'portrait' }}
                        />
                    </div>
                    
                    <div className="weather-div">
                        <div className="weather-header">
                            <form className="weather-form">
                                <div className="form-group">
                                    <input type="text" id="weather-search" placeholder="Zip code, city &amp; state, or park name" />
                                    <button
                                        id="weather-btn"
                                        className="btn btn-default"
                                        type="submit"
                                        onClick={this.handleZipSubmit}
                                    >Go</button>
                                </div>
                            </form>
                        </div>
                        <div className="weather-content">
                            <ForecastNew
                                latitude={this.state.weatherLat}
                                longitude={this.state.weatherLng}
                                name={this.state.weatherPlace}
                                units={this.state.weatherUnits}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    {/* google maps */}
                    <div id='mapDiv'>
                        <SimpleMap latlng={{ lat: this.state.weatherLat, lng: this.state.weatherLng}} />
                        {/* const latLng = {lat: 37.7566, lng: -119.5969 }; */}
                    </div>

                </div>

                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={styles.modalStyles}
                    contentLabel='Example Modal'
                    shouldCloseOnOverlayClick={true}
                    ariaHideApp={false}
                >
                    <p className="new-user-message">
                        Welcome to Triply!<br />
                        Ready to start a new adventure?
                        Enter a name for your trip and click on the check mark to begin!
                    </p>

                    <button
                        id="exit-intro-btn"
                        className="btn btn-default"
                        onClick={this.closeModal}
                    >Got it</button>
                </ReactModal>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="new-trip-modal"
                >
                    <Modal.Body>
                        <p>Trip Created:</p>
                        <p className="new-trip-name">{this.state.newTripName}</p>
                        <p>Click 'Next' to start planning your itinerary</p>

                        <Button
                            onClick={this.handleHide}
                        >Close</Button>
                        <Button
                            onClick={this.handleParkRedirect}
                            id="park-redirect-btn"
                        >Next</Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    };
};

export default Dashboard;

