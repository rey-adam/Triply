import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


function createMapOptions(maps) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
        zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_BOTTOM,
            style: maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_RIGHT,
            style: maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        mapAnimatonOptions: {
            position: maps.Animation.LEFT_TOP
        },
        mapTypeControl: true,
        mapTypeId: 'terrain',
        streetViewControl: true,
        zoomControl: true
       
    };
}


// const latLng = { lat: 37.7566, lng: -119.5969 }; 

export default class SimpleMap extends Component {

    render() {
        const lat = Number(this.props.latlng.lat);
        const lng = Number(this.props.latlng.lng);

        const latlng = {lat, lng}
 
        // console.log('im the map',latlng);
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo' }}
                center={latlng}
                defaultZoom={this.props.zoom}
                options={createMapOptions}
            >

            </GoogleMapReact>
            
        );
    }
}

SimpleMap.defaultProps = {
    // center: latLng,
    zoom: 12,
    gestureHandling: 'greedy'
    
};

