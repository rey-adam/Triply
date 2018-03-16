import React, { Component } from 'react';
import SearchTabs from '../NextSearchForm/SearchTabs';
import './Accordion.css';

class Accordion extends Component {
    render() {
        return (
            <div id="tab-wrapper">
                <SearchTabs />
            </div>
        );
    };
};

export default Accordion;