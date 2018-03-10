import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <Link to='/home' className="navbar-brand">
                            <div id="nav-logo"></div>
                        </Link>
                        </div>

                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to='/trips'>My Trips</Link></li>
                            <li><Link to='/account'>Account</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    };
};

export default Navbar;