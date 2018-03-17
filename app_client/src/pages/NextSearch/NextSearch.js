import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill'; // http://iamdustan.com/smoothscroll/
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import axios from 'axios';
import './NextSearch.css';
import qs from "query-string";
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userTrails: [],
            userActivities: [],
            userCampsites: [],
            userVisitorCenters: []
        };
        this.validateSearch = this.validateSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        //
        console.log(this.props.location.search)
        const locationObj = qs.parse(this.props.location.search);
        console.log(locationObj);
        if (window.location.pathname === '/search') {
            this.props.history.push('/search/trails');
        }
        smoothscroll.polyfill();
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
                    userTrails={this.state.userTrails}
                    userActivities={this.state.userActivities}
                    userCampsites={this.state.userCampsites}
                    userVisitorCenters={this.state.userVisitorCenters}
                />
                <div id="results"></div>
            </div>
        );
    };
};

export default Search;