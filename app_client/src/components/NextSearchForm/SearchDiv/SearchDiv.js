import React from 'react';
import SearchTabs from '../SearchTabs';
import SearchBar from '../SearchBar';
import '../../Hero/Hero.css';
import './SearchDiv.css';

const SearchDiv = props => 
    <div className="search-wrapper">
        <div className="row search-div">
            <SearchTabs />
            <SearchBar {...props} />
        </div>
    </div>;

export default SearchDiv;