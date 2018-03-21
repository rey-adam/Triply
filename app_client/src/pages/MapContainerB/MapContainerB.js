import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Button from '../../components/Button/Button';



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

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const latLng = { lat: 37.7566, lng: -119.5969 }; // can we define latLng as whatever is served when you click on the trip you select on dashboard? Is it an array? TripMarker component perhaps?

export default class SimpleMap extends Component {

    render() {
        const lat = Number(this.props.latlng.lat);
        const lng = Number(this.props.latlng.lng);

        const latlng = {lat, lng}
 
        console.log('im the map',latlng);
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo' }}
                defaultCenter={latlng}
                defaultZoom={this.props.zoom}
                options={createMapOptions}
            >
                <AnyReactComponent
                    latLng= {latLng}
                    text={'label me'}
                />
                <Button
                    latLng={this.props.latlng}
                />
            </GoogleMapReact>
            
        );
    }
}

SimpleMap.defaultProps = {
    // center: latLng,
    zoom: 12,
    gestureHandling: 'greedy'
};

