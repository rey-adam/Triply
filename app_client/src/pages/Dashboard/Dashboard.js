import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import Accordion from '../../components/Accordion';
import AccordionCard from '../../components/AccordionCard';
// import Forecast from 'react-forecast';
import ForecastNew from '../../components/ForecastNew';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import SimpleMap from '../MapContainerB/MapContainerB';
import ReactModal from 'react-modal';
import MAPAPI from '../../helpers/api/mapsApi/mapsApi';
import qs from 'query-string';
import './Dashboard.css';
import UserModel from "../../helpers/models/UserModel";
import authHelper from '../../helpers/authHelper';
import axios from 'axios';
// date picker
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

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
            numTrips: '',
            tripStart: '',
            tripEnd: '',
            userParkCode: '',
            userParkName: '',
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
            show: false,
            startDate: null,
            endDate: null

        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
        this.handleNewTripSubmit = this.handleNewTripSubmit.bind(this);
        this.handleNewTripCreate = this.handleNewTripCreate.bind(this);
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

        // parse url to get park lat, long, and name
        const locationObj = qs.parse(this.props.location.search);

        // console.log('===== PARSED URL =====');
        // console.log(locationObj);
        // console.log('======================');

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

        // get request to return number of trips
        axios({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            method: "GET",
            url: `/api/trips/${JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])).id}`
        })
        .then(dbUserTrips => {
            // console.log(dbUserTrips);

            this.setState({
                numTrips: dbUserTrips.data === null ? 0 : dbUserTrips.data.length
            });

            // console.log(`num trips: ${this.state.numTrips}`);

            // get all trip details for user
            return UserModel.getOne(authHelper.splitToken(authHelper.getToken()).id);

        }).then(dbUser => {

            setTimeout(() => {
                this.setState({
                    userData: dbUser.data,
                    // userParkCode: dbUser.data.Trips[0].Locations[0].parkCode,
                    // userParkName: dbUser.data.Trips[0].Locations[0].name
                });
                console.log('========= USER INFO ========');
                console.log(`id: ${this.state.userData.id}`);
                console.log(`email: ${this.state.userData.email}`);
                console.log('========== trips ===========');
                console.log(`trips: ${this.state.userData.Trips.length}`);
                console.log(this.state.userData.Trips);
                console.log('============================');
            }, 1000);
            
            

        })
            
        //     // RETURNING THE NATIONAL PARK API CAMPSITE CALL
        //     return NPSAPI.campgrounds(this.state.userParkCode);
        // })
        // .then(npsCampRes => {
        //     // better idea to use seperate queries based on id from user info
        //     // I.E. NPSAPI.camp(parkCode, userRes.Trips[0].Locations[0].Campsites[0].campId)
        //     console.log("=============== ALL CAMPS API ==============");
        //     console.log(npsCampRes.data.data);
            
        //     this.state.userData.Trips.forEach(trip => {
        //         trip.Locations.forEach(loc => {
        //             const campsites = npsCampRes.data.data.filter(elem => {
        //                 const val = loc.Campsites.find(camp => {
        //                     return camp.campId === elem.id
        //                 })
        //                 return val != null;
        //             }); // END  

        //             console.log(campsites);
        //             this.state.camps.push(campsites);
        //         }); // END FOR EACH
        //     }); // END FOR EACH
            
        //     return NPSAPI.visitorCenters(this.state.userParkCode);

        // }).then(npsVCRes => {
        //     // better idea to use seperate queries based on id from user info
        //     // I.E. NPSAPI.camp(parkCode, userRes.Trips[0].Locations[0].Campsites[0].campId)
        //     console.log("=============== VISITOR CENTER API ==============");

        //     console.log(npsVCRes.data.data);
            
        //     this.state.userData.Trips.forEach(trip => {
        //         trip.Locations.forEach(loc => {
        //             const visitorcenter = npsVCRes.data.data.filter(elem => {
        //                 const val = loc.VisitorCenters.find(center => {
        //                     return center.centerId === elem.id
        //                 });
        //                 return val != null;
        //             }); // END  

        //             console.log(visitorcenter);
        //             this.state.visitorCenters.push(visitorcenter);
        //         }); // END FOR EACH
        //     }); // END FOR EACH

        //     return NPSAPI.events(this.state.userParkCode);

        // }).then(npsEventRes => {
        //     // better idea to use seperate queries based on id from user info
        //     // I.E. NPSAPI.camp(parkCode, userRes.Trips[0].Locations[0].Campsites[0].campId)
        //     console.log("=============== EVENTS API ==============");
            
        //     console.log(npsEventRes.data.data);

        //     this.state.userData.Trips.forEach(trip => {
        //         trip.Locations.forEach(loc => {
        //             const events = npsEventRes.data.data.filter(elem => {
        //                 const val = loc.Activities.find(events => {
        //                     return events.eventId === elem.id
        //                 });
        //                 return val != null;
        //             }); // END  

        //             console.log(events);
        //             this.state.activities.push(events);
        //         }); // END FOR EACH
        //     }); // END FOR EACH

        //     return MAPAPI.location(`${this.state.userParkName} National Park`);

        // }).then(mapRes => {
            
        //     const lat = mapRes.data.results[0].geometry.location.lat;
        //     const lon = mapRes.data.results[0].geometry.location.lng;

        //     return REIAPI.trails(lat, lon);
            
        // }).then(reiTrailRes => {
            
        //     console.log("=============== TRAILS API ==============");

        //     console.log(reiTrailRes.data.trails);

        //     this.state.userData.Trips.forEach(trip => {
        //         trip.Locations.forEach(loc => {
        //             const hikes = reiTrailRes.data.trails.filter(elem => {
        //                 const val = loc.Trails.find(hikes => {
        //                     return hikes.hikeId === elem.id
        //                 });
        //                 return val != null;
        //             }); // END  

        //             console.log(hikes);
        //             this.state.trails.push(hikes);
        //         }); // END FOR EACH
        //     }); // END FOR EACH

        // })
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

    handleNewTripSubmit(e) {
        e.preventDefault();
        console.log(this.state.newTripName);
        if (this.state.newTripName === '') {
            alert('Please enter a trip name');
        } else {
            this.handleShow();
        }
    }

    handleNewTripCreate(e) {
        e.preventDefault();
        if (this.state.startDate === null && this.state.endDate === null) {
            alert('Please set a date range for your trip');
        } else if (this.state.startDate === null && this.state.endDate !== null) {
            alert('Please set a start date');
        } else if (this.state.startDate !== null && this.state.endDate === null) {
            alert('Please set an end date');
        } else {
            // console.log("=========== USER'S TRIP INFO ===========");
            // console.log(`Name: ${this.state.newTripName}`);
            // console.log(`Start Date: ${this.state.startDate._d}`);
            // console.log(`End date: ${this.state.endDate._d}`);
            // console.log("========================================");

            const tripData = {
                tripName: this.state.newTripName,
                userId: JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])).id,
                startDate: this.state.startDate._d,
                endDate: this.state.endDate._d
            };

            axios({
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                method: "POST",
                url: `/api/trip`,
                data: tripData
            })
            .then(dbTrip => {
                console.log(`===== USER'S NEW TRIP DATA =====`);
                console.log(dbTrip.data);
                console.log('================================');

                this.props.history.push(`/park?tripId=${dbTrip.data.id}`);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            // e.preventDefault();
            this.handleNewTripSubmit(e);
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
                                    onSubmit={this.handleNewTripSubmit}
                                    placeholder="New trip name..." />
                                <button className="btn" type="submit">
                                    <span
                                        className="glyphicon glyphicon-ok-sign"
                                        aria-hidden="true"
                                        onClick={this.handleNewTripSubmit}>
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

                            <Accordion>
                                <AccordionCard
                                    numTrips={this.state.numTrips}
                                    userData={this.state.userData}
                                />
                            </Accordion>
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
                        <p>Set a date for <span className="new-trip-name">{this.state.newTripName}</span>:</p>
                        
                        <DateRangePicker
                            startDate={this.state.startDate}
                            startDateId="start-date"
                            endDate={this.state.endDate}
                            endDateId="end-date"
                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({ focusedInput })}
                        />
                        {/* <p>Click 'Next' to start planning your itinerary</p> */}

                        {/* <Button
                            onClick={this.handleHide}
                        >Close</Button> */}
                        <Button
                            onClick={this.handleNewTripCreate}
                            id="park-redirect-btn"
                        >Next</Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    };
};

export default Dashboard;

