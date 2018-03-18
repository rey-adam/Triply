import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class SimpleMap extends Component {
    static defaultProps = {
        center: { lat: 37.8651, lng: -119.5383 },
        zoom: 11
    };

    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
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