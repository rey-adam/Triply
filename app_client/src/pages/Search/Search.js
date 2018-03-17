import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import ControlledCarousel from '../../components/Carousel';
import SelectWrapper from '../../components/SelectWrapper';
import axios from 'axios';
import parks from '../../parks2.json';
import './Search.css';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userPark: '',
            parks: parks,
            selectedOption: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleParkAPIRequest = this.handleParkAPIRequest.bind(this);
        this.renderParkInfo = this.renderParkInfo.bind(this);
    };

    componentDidMount() {
        console.log(this.state.parks);
    }

    handleSubmit(e) {
        e.preventDefault();
        const parks = document.getElementById("park-select");
        const userPark = parks.options[parks.selectedIndex].value;
        console.log(userPark);

        this.handleParkAPIRequest(userPark)
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
                <ControlledCarousel
                    userPark={this.state.userPark}
                    handleParkSubmit={this.handleParkSubmit}
                    handleParkAPIRequest={this.handleParkAPIRequest}
                />
                <SelectWrapper>
                    <form className="park-form">
                        <div className="select-bar">
                            <select className="form-control select2"></select>
                            <select id="park-select" className="form-control">
                                <option>Choose a park</option>
                                {parks.map((park, i) => (
                                    <option key={i} id={park.parkName} value={park.parkCode}>{`${park.parkName} National Park`}</option>
                                ))}
                            </select>
                        </div>
                        <button 
                            className="btn btn-default park-btn pull-right"
                            type="submit"
                            onClick={this.handleSubmit}
                        >Submit</button>
                    </form>
                </SelectWrapper>
            </div>
        );
    };
};

export default Search;