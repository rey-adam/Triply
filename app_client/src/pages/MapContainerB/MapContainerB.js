import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            position: maps.ControlPosition.RIGHT_CENTER,
            style: maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_RIGHT
        },
        mapTypeControl: true,
        mapTypeId: 'terrain'
    };
}

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class SimpleMap extends Component {
    static defaultProps = {
        center: { lat: 37.7566, lng: -119.5969 },
        zoom: 12
        
    };

    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                options={createMapOptions}
            >
                <AnyReactComponent
                    lat={37.8651}
                    lng={-119.5383}
                    text={'label me'}
                    
                />
            </GoogleMapReact>
        );
    }
}