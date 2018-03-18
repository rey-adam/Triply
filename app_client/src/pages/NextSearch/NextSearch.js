import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill'; // http://iamdustan.com/smoothscroll/
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
// import axios from 'axios';
import './NextSearch.css';
import qs from "query-string";
import REIAPI from '../../helpers/api/reiApi/reiApi';
import npsAPI from '../../helpers/api/npsApi/npsAPI';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trails: [],
            activities: [],
            campsites: [],
            visitorCenters: []
        };
        this.validateSearch = this.validateSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTrailRequest = this.handleTrailRequest.bind(this);
        this.handleActivityRequest = this.handleActivityRequest.bind(this);
        this.handleCampsiteRequest = this.handleCampsiteRequest.bind(this);
        this.handleVCRequest = this.handleVCRequest.bind(this);
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
        
        this.handleTrailRequest(locationObj.lat, locationObj.lng)
        .then(trailRes => {
            // console.log(trailRes);
            this.setState({
                trails: trailRes.trails
            });
            console.log('======= TRAILS =======');
            console.log(`Trails found: ${this.state.trails.length}`);
            console.log(this.state.trails);
            console.log('======================');
            return this.handleActivityRequest(locationObj.park);
        })
        .then(activityRes => {
            // console.log(activityRes);
            this.setState({
                activities: activityRes.data
            });
            console.log('===== ACTIVITIES =====');
            console.log(`Activities found: ${this.state.activities.length}`);
            console.log(this.state.activities);
            console.log('======================');
            return this.handleCampsiteRequest(locationObj.park);
        })
        .then(campsiteRes => {
            // console.log(campsiteRes);
            this.setState({
                campsites: campsiteRes.data
            });
            console.log('====== CAMPSITES ======');
            console.log(`Campsites found: ${this.state.campsites.length}`);
            console.log(this.state.campsites);
            console.log('=======================');
            return this.handleVCRequest(locationObj.park);
        })
        .then(vcRes => {
            // console.log(vcRes);
            this.setState({
                visitorCenters: vcRes.data
            });
            console.log('=== VISITOR CENTERS ===');
            console.log(`Visitor centers found: ${this.state.visitorCenters.length}`);
            console.log(this.state.visitorCenters);
            console.log('=======================');
        })
        .catch(err => {
            console.error(err);
        });

        smoothscroll.polyfill();
    }

    handleTrailRequest(lat, long) {
    return REIAPI
        .trails(lat, long)
        .then(response => {
            // console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleActivityRequest(parkCode) {
        return npsAPI
            .events(parkCode)
            .then(response => {
                // console.log(response.data);
                return response.data;
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleCampsiteRequest(parkCode) {
        return npsAPI
            .campgrounds(parkCode)
            .then(response => {
                // console.log(response.data);
                return response.data;
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleVCRequest(parkCode) {
        return npsAPI
            .visitorCenters(parkCode)
            .then(response => {
                // console.log(response.data);
                return response.data;
            })
            .catch(err => {
                console.log(err);
            });
    }
            
    validateSearch(input) {
        return input !== '';
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div id="next-search-container">
                <Navbar/>
                <Hero
                    handleChange={this.handleChange}
                    trails={this.state.trails}
                    activities={this.state.activities}
                    campsites={this.state.campsites}
                    visitorCenters={this.state.visitorCenters}
                />
                {/* <div id="results"></div> */}
            </div>
        );
    };
};

export default Search;