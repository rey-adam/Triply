import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import ControlledCarousel from '../../components/Carousel';
import SelectWrapper from '../../components/SelectWrapper';
import axios from 'axios';
import parks from '../../parks.json';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPark: '',
            parks: parks,
            selectedOption: ''
        };
        this.handleNameClick = this.handleNameClick.bind(this);
        this.handleParkAPIRequest = this.handleParkAPIRequest.bind(this);
        this.renderParkInfo = this.renderParkInfo.bind(this);
    };

    componentDidMount() {
        console.log(this.state.parks);
    }

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
                <ControlledCarousel
                    userPark={this.state.userPark}
                    handleParkSubmit={this.handleParkSubmit}
                    handleParkAPIRequest={this.handleParkAPIRequest}
                />
                <SelectWrapper>
                    <form className="park-form">
                        <select className="form-control">
                            <option>Choose a park</option>
                            {parks.map(park => (
                                <option>{park.parkName}</option>
                            ))}
                        </select>
                        <button className="btn btn-default park-btn" type="submit">Submit</button>
                    </form>
                </SelectWrapper>
            </div>
        );
    };
};

export default Search;

// <Wrapper>
//     <h1 className="title">Friends List</h1>
//     <FriendCard removeFriend={this.removeFriend} friends={friends}></FriendCard>
//     {/* 
//         <FriendCard
//           name={friends[0].name}
//           image={friends[0].image}
//           occupation={friends[0].occupation}
//           location={friends[0].location}
//         />
//         <FriendCard
//           name={friends[1].name}
//           image={friends[1].image}
//           occupation={friends[1].occupation}
//           location={friends[1].location}
//         />
//         <FriendCard
//           name={friends[2].name}
//           image={friends[2].image}
//           occupation={friends[2].occupation}
//           location={friends[2].location}
//         />
//         */}
// </Wrapper>