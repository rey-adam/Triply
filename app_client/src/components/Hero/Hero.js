import React from 'react';
import SearchDiv from '../NextSearchForm/SearchDiv';
import './Hero.css';

const Hero = props =>
    <div className="jumbotron">
        <div className="overlay"></div>
        <div className="hero-img"></div>
        <SearchDiv {...props} />
    </div>;

export default Hero;