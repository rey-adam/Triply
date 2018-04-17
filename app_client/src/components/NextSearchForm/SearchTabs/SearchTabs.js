import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../Hero/Hero.css';
import '../SearchDiv/SearchDiv.css';
import './SearchTabs.css';

class SearchTabs extends Component {
    render() {
        return (
            <nav aria-label="Page navigation" className="col-lg-12">
                <ul className="pagination">
                    <li>
                        <Link to='/search/trails' className={window.location.pathname === '/search/trails' ? "active" : ""}>Trails</Link>
                    </li>
                    <li>
                        <Link to='/search/activities' className={window.location.pathname === '/search/activities' ? "active" : ""}>Activities</Link>
                    </li>
                    <li>
                        <Link to='/search/campsites' className={window.location.pathname === '/search/campsites' ? "active" : ""}>Campsites</Link>
                    </li>
                    <li>
                        <Link to='/search/visitor' className={window.location.pathname === '/search/visitor' ? "active" : ""}>Visitor Centers</Link>
                    </li>
                </ul>
            </nav>
        );
    };
};

export default SearchTabs;