import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill'; // http://iamdustan.com/smoothscroll/
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import SearchDiv from '../../components/NextSearchForm/SearchDiv';
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
            visitorCenters: [],
            userTripId: '',
            userLocationId: ''
        };
        this.handleTrailRequest = this.handleTrailRequest.bind(this);
        this.handleActivityRequest = this.handleActivityRequest.bind(this);
        this.handleCampsiteRequest = this.handleCampsiteRequest.bind(this);
        this.handleVCRequest = this.handleVCRequest.bind(this);
    };

    componentDidMount() {
           /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
            *                       OUTPUT                        *
            * * * * * * * * * * * * * * * * * * * * * * * * * * * *
            * /search/trails === [nothing]                        *
            * /search/trails === {?lat=44.42&lng=-110.58}         *
            * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        const urlObj = qs.parse(this.props.location.search);

        console.log('===== PARSED URL =====');
        console.log(urlObj);
        console.log('======================');

        setTimeout(() => {
            this.setState({
                userTripId: urlObj.tripId,
                userLocationId: urlObj.locationId
            });
            console.log(`trip id: ${this.state.userTripId}`);
        }, 1000);

           /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
            *                                 OUTPUT                                    *
            * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
            * /search/trails === {}                                                     *
            * /search/trails?lat=44.42&lng=-110.58 === {lat: "44.42", lng: "-110.58"}   *
            * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        
        this.handleTrailRequest(urlObj.lat, urlObj.lng)
        .then(trailRes => {
            // console.log(trailRes);
            this.setState({
                trails: trailRes.trails
            });
            console.log('======= TRAILS =======');
            console.log(`Trails found: ${this.state.trails.length}`);
            console.log(this.state.trails);
            console.log('======================');
            return this.handleActivityRequest(urlObj.parkCode);
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
            return this.handleCampsiteRequest(urlObj.parkCode);
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
            return this.handleVCRequest(urlObj.parkCode);
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

    render() {
        return (
            <div id="next-search-container">
                <Navbar/>
                <Hero />
                <SearchDiv
                    trails={this.state.trails}
                    activities={this.state.activities}
                    campsites={this.state.campsites}
                    visitorCenters={this.state.visitorCenters}
                    userTripId={this.state.userTripId}
                    userLocationId={this.state.userLocationId}
                />
                {/* <div id="results"></div> */}
            </div>
        );
    };
};

export default Search;