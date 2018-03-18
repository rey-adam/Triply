import React, { Component } from 'react';
import './Dashboard.css';
// import the Google Maps API Wrapper from google-maps-react
// import { GoogleApiWrapper } from 'google-maps-react';
import SimpleMap from '../MapContainerB/MapContainerB';

class Dashboard extends Component {
    render() {
        return (
            <div>
            <h1>Triply Dashboard</h1>
                {/* <SimpleMap google={this.props.google}/> */}
                <SimpleMap />
            </div>

        );
    };
};

export default Dashboard;

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo',
// })(Dashboard);
