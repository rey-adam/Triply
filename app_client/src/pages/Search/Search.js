import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import './Search.css';
import Carousel from '../../components/Carousel';

class Search extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <Carousel />
            </div>
        );
    };
};

export default Search;