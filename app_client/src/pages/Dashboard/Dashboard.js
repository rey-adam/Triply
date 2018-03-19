import React, { Component } from 'react';
import './Dashboard.css';
import SimpleMap from '../MapContainerB/MapContainerB';

class Dashboard extends Component {
    render() {
        return (
            <div>
            <h1>Triply Dashboard</h1>
                <div id='mapDiv'>
                <SimpleMap />
                </div>
            </div>

        );
    };
};

export default Dashboard;

