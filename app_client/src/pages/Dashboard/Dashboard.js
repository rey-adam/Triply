import React, { Component } from 'react';
import './Dashboard.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../MapContainer/MapContainer';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <MapContainer google={this.props.google}/>
            </div>

        );
    };
};


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo',
})(Dashboard);
// export default Dashboard;