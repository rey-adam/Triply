import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import axios from 'axios';
import './NextSearch.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trailSearch: '',
            activitySearch: '',
            foodSearch: '',
            lodgingSearch: ''
        };
        this.validateSearch = this.validateSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTrailSearch = this.handleTrailSearch.bind(this);
        this.handleActivitySearch = this.handleActivitySearch.bind(this);
        this.handleFoodSearch = this.handleFoodSearch.bind(this);
        this.handleLodgingSearch = this.handleLodgingSearch.bind(this);
    };

    componentDidMount() {
        const body = document.documentElement || document.body.parentNode;
        const results = document.getElementById('scroll-to');
        const bodyRect = body.getBoundingClientRect();
        const resultsRect = results.getBoundingClientRect();
        const offset = resultsRect.top - bodyRect.top;
        console.log(offset);
        document.documentElement.scrollTop = document.body.parentNode.scrollTop = 1000;
    }

    // componentWillUnmount() {
    //     this.setState({
    //         trailSearch: '',
    //         activitySearch: '',
    //         foodSearch: '',
    //         lodgingSearch: ''
    //     });
    // }

    validateSearch(input) {
        return input !== '';
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleTrailSearch(input) {
        if (!this.validateSearch(input)) {
            alert('Please enter a search');
        } else {
            const userPark = input.toLowerCase();
            const userTrail = input.toLowerCase(); // just for now
            // const userTrail = input.toLowerCase();
            axios({
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                method: "GET",
                // url: "/api/user/" + userInfo.id,
                url: `/api/trails/${userPark}/${userTrail}`
            }).then(function(response) {
                console.log(response);
                // this.props.history.push('/search/trails');
            })
            .catch(function(err) {
                console.error(err);
            });
        }
    }

    handleActivitySearch(input) {
        this.handleSearch(input);

        // axios.get(`/api/activity/${input}`)
        // .then(response => {
        //     console.log(response);
        // })
        // .catch(err => {
        //     console.error(err);
        // });
    }

    handleFoodSearch(input) {
        this.handleSearch(input);

        // axios.get(`/api/food/${input}`)
        // .then(response => {
        //     console.log(response);
        // })
        // .catch(err => {
        //     console.error(err);
        // });
    }

    handleLodgingSearch(input) {
        this.handleSearch(input);

        // axios.get(`/api/lodging/${input}`)
        // .then(response => {
        //     console.log(response);
        // })
        // .catch(err => {
        //     console.error(err);
        // });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Hero
                    trailSearch={this.state.trailSearch}
                    activitySearch={this.state.activitySearch}
                    foodSearch={this.state.foodSearch}
                    lodgingSearch={this.state.lodgingSearch}
                    handleChange={this.handleChange}
                    handleTrailSearch={this.handleTrailSearch}
                    handleActivitySearch={this.handleActivitySearch}
                    handleFoodSearch={this.handleFoodSearch}
                    handleLodgingSearch={this.handleLodgingSearch}
                />
                <div id="scroll-to">hi</div>
            </div>
        );
    };
};

export default Search;