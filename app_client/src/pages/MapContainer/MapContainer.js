//import the GoogleApiWrapper
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Map from '../../components/Map/Map';




class MapContainer extends Component {

    render() {
        const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
            width: '90vw', // 90vw basically means take up 90% of the width screen. px also works.
            height: '75vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
        }

        return ( // in our return function you must return a div with ref='map' and style.
            <div style={style}>
                <Map google={this.props.google} />
                loading map...
      </div>
        )
    };
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo',
})(MapContainer);