import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill'; // http://iamdustan.com/smoothscroll/
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
// import axios from 'axios';
import './NextSearch.css';
import qs from "query-string";
import REIAPI from '../../helpers/api/reiApi/reiApi';

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
        this.handleTrailAPIRequest = this.handleTrailAPIRequest.bind(this);
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
        
        this.handleTrailAPIRequest(locationObj.lat, locationObj.lng)
        .then(trailResponse => {
            // console.log(trailResponse);
            this.setState({
                trails: trailResponse.trails
            });
            console.log(this.state.trails);
        })
        .catch(err => {
            console.error(err);
        });

        smoothscroll.polyfill();
    }

    handleTrailAPIRequest(lat, long) {
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