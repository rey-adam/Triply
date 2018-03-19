import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import './Dashboard.css';
import SimpleMap from '../MapContainerB/MapContainerB';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1>Triply Dashboard</h1>
                <div id='mapDiv'>
                <SimpleMap />
                </div>
            </div>

        );
    };
};

export default Dashboard;

