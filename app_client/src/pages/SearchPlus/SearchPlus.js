import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import './SearchPlus.css';

class Search extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Hero/>
            </div>
        );
    };
};

export default Search;