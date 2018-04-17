import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import SearchDiv from '../../components/NextSearchForm/SearchDiv';
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

        setTimeout(() => {
            this.setState({
                userTripId: urlObj.tripId,
                userLocationId: urlObj.locationId
            });
            console.log(`Trip id: ${this.state.userTripId}`);
        }, 1000);

           /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
            *                                 OUTPUT                                    *
            * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
            * /search/trails === {}                                                     *
            * /search/trails?lat=44.42&lng=-110.58 === {lat: "44.42", lng: "-110.58"}   *
            * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        
        this.handleTrailRequest(urlObj.lat, urlObj.lng)
        .then(trailRes => {
            this.setState({
                trails: trailRes.trails
            });
            return this.handleActivityRequest(urlObj.parkCode);
        })
        .then(activityRes => {
            this.setState({
                activities: activityRes.data
            });
            return this.handleCampsiteRequest(urlObj.parkCode);
        })
        .then(campsiteRes => {
            this.setState({
                campsites: campsiteRes.data
            });
            return this.handleVCRequest(urlObj.parkCode);
        })
        .then(vcRes => {
            this.setState({
                visitorCenters: vcRes.data
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleTrailRequest(lat, long) {
    return REIAPI
        .trails(lat, long)
        .then(response => {
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
            </div>
        );
    };
};

export default Search;