import React from 'react';
import SearchTabs from '../SearchTabs';
import SelectWrapper from '../../SelectWrapper';
// import SearchBar from '../SearchBar';
import '../../Hero/Hero.css';
import './SearchDiv.css';
import '../../../pages/Search/Search.css';

const SearchDiv = props => 
    <div className="search-wrapper">
        <div className="row search-div">
            <SearchTabs />
            <SelectWrapper>
                <form id="trail-form" className="select-form">
                    <div className="select-bar">
                        <select className="form-control select2"></select>
                        <select id="trail-select" className="form-control select-options">
                            <option>Choose a trail...</option>
                        </select>
                    </div>
                    <button
                        id="trail-btn"
                        className="btn btn-default select-btn pull-right"
                        type="submit"
                    >Submit</button>
                </form>
            </SelectWrapper>
        </div>
    </div>;

export default SearchDiv;