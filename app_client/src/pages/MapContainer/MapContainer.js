//import the GoogleApiWrapper
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import Map from '../../components/Map/Map';

const style = {
    width: '90vw', // 90vw basically means take up 90% of the width screen. px also works.
    height: '75vh',
    
}


class MapContainer extends Component {

    render() {
        

        return ( // in our return function you must return a div with ref='map' and style.
            <div style={style}>
                <Map 
                google={this.props.google}
                zoom={14}
                // mapTypeId={terrain}
                style={style}
                initialCenter={{
                lat: 37.8651,
                lng: -119.5383
                }}
                
                        
                
                
                
                
                
                
                
                />
                loading map...
            </div>
        )
    };
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo',
})(MapContainer);