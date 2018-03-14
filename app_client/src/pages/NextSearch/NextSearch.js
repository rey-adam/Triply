import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill'; // http://iamdustan.com/smoothscroll/
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
            lodgingSearch: '',
            userPark: 'Yosemite National Park'
            // offset: 0
        };
        this.validateSearch = this.validateSearch.bind(this);
        // this.setResultsPosition = this.setResultsPosition.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTrailSearch = this.handleTrailSearch.bind(this);
        this.handleActivitySearch = this.handleActivitySearch.bind(this);
        this.handleFoodSearch = this.handleFoodSearch.bind(this);
        this.handleLodgingSearch = this.handleLodgingSearch.bind(this);
    };

    componentDidMount() {
        smoothscroll.polyfill();
        // this.setState({ offset: 0 });
        // document.documentElement.scrollTop = document.body.parentNode.scrollTop = this.state.offset;
        axios({
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                method: "GET",
                url: `/api/parks/${this.state.userPark}`
            }).then(function(response) {
                console.log(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    // setResultsPosition(element) {
    //     const body = document.documentElement || document.body.parentNode;
    //     const results = document.getElementById(element);
    //     const bodyRect = body.getBoundingClientRect();
    //     const resultsRect = results.getBoundingClientRect();
    //     const offset = resultsRect.top - bodyRect.top;
    //     console.log(offset);
    //     this.setState({ offset: offset });
    //     console.log(this.state.offset);
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
            const userTrail = input.toLowerCase();
            axios({
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                method: "GET",
                // url: "/api/user/" + userInfo.id,
                url: `/api/trails/${userTrail}`
            }).then(function(response) {

                console.log(response);
                console.log(response.data);
                console.log(`${response.data.length} ${response.data.length === 1 ? 'trail' : 'trails'} found`);

                const results = document.getElementById("results");
                while(results.firstChild){
                    results.removeChild(results.firstChild);
                }

                if (typeof response.data.length !== 'number') {
                    const noResultsMessage = document.createElement('h3');
                    noResultsMessage.classList.add('no-results-message');
                    noResultsMessage.innerHTML = 'No trails found';
                    results.appendChild(noResultsMessage);

                    // const jumbo = document.getElementsByClassName('jumbotron');
                    // const jumboHeight = jumbo[0].clientHeight;
                    // console.log(jumboHeight);
                    // document.documentElement.scrollTop = document.body.parentNode.scrollTop = jumboHeight;
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        const trailName = response.data[i].name;
                        const trailNameForID = trailName.toLowerCase().replace(/ /g, '-');

                        // create new card div
                        const newCardDiv = document.createElement('div');
                        newCardDiv.setAttribute('id', `card${i+1}`)
                        newCardDiv.classList.add('card');

                        // create new card content wrapper
                        const newContentDiv = document.createElement('div');
                        newContentDiv.classList.add('card-content');

                        // create new img div
                        const newImgDiv = document.createElement('div');
                        newImgDiv.setAttribute('id', `image${i+1}`);
                        newImgDiv.classList.add('card-img');
                        newImgDiv.style.backgroundImage = `url(${response.data[i].imgMedium ? response.data[i].imgMedium : 'http://via.placeholder.com/300x200'})`;

                        // create new div for content
                        const newInfoDiv = document.createElement('div');
                        newInfoDiv.setAttribute('id', `info${i+1}`);
                        newInfoDiv.classList.add('card-info');

                        // create new content title
                        const cardTitle = document.createElement('h4');
                        cardTitle.setAttribute('id', `title__${trailNameForID}`);
                        cardTitle.classList.add('card-title');
                        cardTitle.innerHTML = trailName;

                        // create new content description
                        const cardDescription = document.createElement('p');
                        cardDescription.setAttribute('id', `description__${trailNameForID}`);
                        cardDescription.classList.add('card-description');
                        cardDescription.innerHTML = response.data[i].summary;

                        // append
                        newInfoDiv.append(cardTitle);
                        newInfoDiv.append(cardDescription);
                        newContentDiv.append(newImgDiv);
                        newContentDiv.append(newInfoDiv);
                        newCardDiv.append(newContentDiv);
                        document.getElementById('results').append(newCardDiv);
                    }
                }

                // scroll to first search result
                const resultsDiv = document.querySelector('#results');
                const firstCard = resultsDiv.childNodes[0];
                firstCard.scrollIntoView({ behavior: 'smooth' });
            
            })
            .catch(function(err) {
                console.error(err);
            });

            // setTimeout(() => {
            //     // // other method of using results div/end of jumbotron Y position
            //     // const jumbo = document.getElementsByClassName('jumbotron');
            //     // const jumboHeight = jumbo[0].clientHeight;
            //     // console.log(jumboHeight);
            //     // document.documentElement.scrollTop = document.body.parentNode.scrollTop = jumboHeight;

            //     // // other method using smoothscroll polyfill npm module
            //     const results = document.querySelector('#results');
            //     const firstCard = results.childNodes[0];
            //     if (firstCard) {
            //         firstCard.scrollIntoView({ behavior: 'smooth' });
            //         console.log('card');
            //     } else {
            //         const jumbo = document.getElementsByClassName('jumbotron');
            //         const jumboHeight = jumbo[0].clientHeight;
            //         console.log('jumbo:', jumboHeight);
            //         document.documentElement.scrollTop = document.body.parentNode.scrollTop = jumboHeight;
            //     }

            //     // // other method using position of results div
            //     // this.setResultsPosition('results');
            // }, 1000);
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
            <div id="next-search-container">
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
                <div id="results"></div>
            </div>
        );
    };
};

export default Search;