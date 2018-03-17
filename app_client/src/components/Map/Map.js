// //import the GoogleApiWrapper
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


// class Map extends Component {

//     componentDidUpdate() {
//         this.loadMap(); // call loadMap function to load the google map
//     }

//     loadMap() {

//         if (this.props && this.props.google) { // checks to make sure that props have been passed
//             const { google } = this.props; // sets props equal to google
//             const maps = google.maps; // sets maps to google maps props

//             const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
//             const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

//             let { initialCenter, zoom } = this.props;
//             const { lat, lng } = initialCenter;
//             const center = new maps.LatLng(lat, lng);
//             const mapConfig = Object.assign({}, {
//                 center: center,
//                 zoom: zoom
//             })
//             this.map = new maps.Map(node, mapConfig);
//         }

//     }

//     render() {
//         return (<div ref='map'></div>)
//     };

// }
// Map.propTypes = {
//     google: React.PropTypes.object,
//     zoom: React.PropTypes.number,
//     initialCenter: React.PropTypes.object
// }
// Map.defaultProps = {
//     zoom: 13,
//     // San Francisco, by default
//     initialCenter: {
//         lat: 37.774929,
//         lng: -122.419416
//     }
// }

// export default Map;