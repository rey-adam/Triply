import React, { Component } from 'react';
import './Search.css';
import Navbar from '../../components/Navbar';
import Carousel from '../../components/Carousel';
import Accordion from '../../components/Accordion';
import SearchForm from '../../components/SearchForm';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPark: ''
        };

        this.handleNameClick = this.handleNameClick.bind(this);
        this.handleParkAPIRequest = this.handleParkAPIRequest.bind(this);
        this.renderParkInfo = this.renderParkInfo.bind(this);
    };

    handleNameClick(e) {
        e.preventDefault();
        // const parks = document.getElementById("park-select");
        // const userPark = parks.options[parks.selectedIndex].value; 
        const park = e.target;
        const parkName = park.getAttribute('data-value');
        console.log(parkName);

        this.handleParkAPIRequest(parkName)
        .then(parkObj => {
            this.renderParkInfo(parkObj);
        })
        .catch(err => {
            console.error(err);
        })
    }

    handleParkAPIRequest(parkQuery) {
        return axios({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            method: "GET",
            url: `/api/parks/${parkQuery}`
        }).then(function(response) {
            console.log(response.data);
            const park = response.data.data[0];
            const parkObj = {
                name: park.fullName,
                description: park.description,
                weather: park.weatherInfo
            };
            return parkObj;
        })
        .catch(err => {
            console.error(err);
        });
    }

    renderParkInfo(park) {
        
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Navbar />
                <Carousel
                    userPark={this.state.userPark}
                    handleParkSubmit={this.handleParkSubmit}
                    handleParkAPIRequest={this.handleParkAPIRequest}
                />
                <Accordion
                    handleNameClick={this.handleNameClick}
                />
            </div>
        );
    };
};

export default Search;