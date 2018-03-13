import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker } from 'react-google-maps';
import './Map.css';

class Map extends Component {
    render() {
        return (
            <div className="map">
                
                
            </div>
        );
    };
};

export default Map;

// const { compose } = require("recompose");
// const {
//     withScriptjs,
//     withGoogleMap,
//     GoogleMap,
//     Marker,
// } = require("react-google-maps");

// const MapWithAMarker = compose(
//     withScriptjs,
//     withGoogleMap
// )(props =>
//     <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: -34.397, lng: 150.644 }}
//     >
//         <Marker
//             position={{ lat: -34.397, lng: 150.644 }}
//         />
//     </GoogleMap>
// );

// <MapWithAMarker
//     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
//     loadingElement={<div style={{ height: `100%` }} />}
//     containerElement={<div style={{ height: `400px` }} />}
//     mapElement={<div style={{ height: `100%` }} />}
// />