import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Forecast from 'react-forecast';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react';
import SimpleMap from '../MapContainerB/MapContainerB';
import MAPAPI from '../../helpers/api/mapsApi/mapsApi';
import qs from 'query-string';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherLat: 0,
            weatherLng: 0,
            weatherPlace: '',
            weatherUnits: 'us',
            today: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleZipSubmit = this.handleZipSubmit.bind(this);
        this.handleLocationAPIRequest = this.handleLocationAPIRequest.bind(this);
    };

    componentDidMount() {
        console.log(this.props.location.search);
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

        this.setState({
            weatherLat: locationObj.lat,
            weatherLng: locationObj.lng,
            weatherPlace: locationObj.place,
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
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
            this.props.history.push(`/dashboard?lat=${this.state.weatherLat}&lng=${this.state.weatherLng}&place=${this.state.weatherPlace}`);
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
                                <input type="text" id="new-trip-name" className="form-control" placeholder="New trip name..." />
                                <Link to='#'><span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></Link>
                            </div>
                        </form>
                    </div>

                    <div className="user-trips">
                        <div className="trips-header">
                            <p>My Trips</p>
                        </div>
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h5 className="mb-0">
                                        <button className="btn accordion-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <h4>Yosemite National Park <span className="spacer">|</span> <span className="trip-date">Mar 30 2018 - Apr 27 2018</span></h4>
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
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
                                            <h4>Glacier National Park <span className="spacer">|</span> <span className="trip-date">Jan 2 2019 - Feb 3 2019</span></h4>
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
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

                    <div className="weather-div">
                        <div className="weather-header">
                            <form className="weather-form">
                                <div className="form-group">
                                    <input type="text" id="weather-search" placeholder="Zip code, city, or park name" />
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
                            <Forecast
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
                        <SimpleMap />
                    </div>

                </div>
            </div>
        );
    };
};

export default Dashboard;

