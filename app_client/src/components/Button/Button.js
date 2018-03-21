import React, { Component } from 'react';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1,
            center: { lat: 37.7566, lng: -119.5969 }
        };
    };
    
    handleClick = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        }));
    };

    render() {
        return (
            <button className="google-maps-btn" onClick={this.handleClick}>
                {this.state.counter}
            </button>
        );
    }
}
