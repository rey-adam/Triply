import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../Hero/Hero.css';
import '../SearchDiv/SearchDiv.css';
import './SearchTabs.css';

class SearchTabs extends Component {
    render() {
        return (
            // <div className="tabs">
            //     <ul className="nav nav-tabs">
            //         <li>
            //             <Link to='/search/trails' className={window.location.pathname === '/search/trails' ? "active" : ""}>Trails</Link>
            //         </li>
            //         <li>
            //             <Link to='/search/activities' className={window.location.pathname === '/search/activities' ? "active" : ""}>Activities</Link>
            //         </li>
            //         <li>
            //             <Link to='/search/food' className={window.location.pathname === '/search/food' ? "active" : ""}>Food</Link>
            //         </li>
            //         <li>
            //             <Link to='/search/lodging' className={window.location.pathname === '/search/lodging' ? "active" : ""}>Lodging</Link>
            //         </li>
            //     </ul>
            // </div>
            <nav aria-label="Page navigation" className="col-lg-12">
                <ul className="pagination">
                    <li>
                        <Link to='/search/trails' className={window.location.pathname === '/search/trails' ? "active" : ""}>Trails</Link>
                    </li>
                    <li>
                        <Link to='/search/activities' className={window.location.pathname === '/search/activities' ? "active" : ""}>Activities</Link>
                    </li>
                    <li>
                        <Link to='/search/food' className={window.location.pathname === '/search/food' ? "active" : ""}>Food</Link>
                    </li>
                    <li>
                        <Link to='/search/lodging' className={window.location.pathname === '/search/lodging' ? "active" : ""}>Lodging</Link>
                    </li>
                </ul>
            </nav>
        );
    };
};

export default SearchTabs;