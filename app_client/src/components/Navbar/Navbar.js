import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authHelper from '../../helpers/authHelper';
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    };

    handleLogOut() {
        authHelper.logOut();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to='/park' className="navbar-brand">
                                <div id="nav-logo"></div>
                            </Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to='/dashboard' className={window.location.pathname === '/dashboard' ? "active" : ""}>Dashboard</Link></li>
                                <li className="dropdown">
                                    <Link to='#' className={window.location.pathname === '/account' ? "dropdown-toggle active" : "dropdown-toggle"} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span className="caret"></span></Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to='/account' className="dropdown-link">Settings</Link></li>
                                        <li><Link to='/' onClick={this.handleLogOut} className="dropdown-link">Log Out</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    };
};

export default Navbar;