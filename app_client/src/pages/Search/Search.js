import React, { Component } from 'react';
import './Search.css';
import SearchForm from '../../components/SearchForm';
import axios from 'axios';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nationalParkSearch: '',

        };
        this.validateSearch = this.validateSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlenationalParkSearch = this.handlenationalParkSearch.bind(this);

    };


    validateSearch(input) {
        return input !== '';
    };

    handleSearch(input) {
        if (!this.validateSearch(input)) {
            alert('Please enter a National Park');
        } else {
            alert(input);
        };
    };

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handlenationalParkSearch(input) {
        this.handleSearch(input)
    };

    render() {
        return (
            <div style={{ height: '100%' }}>
                <SearchForm
                    nationalParkSearch={this.state.nationalParkSearch}
                />
            </div>
        );
    };
};

export default Search;