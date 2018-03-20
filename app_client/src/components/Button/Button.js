import React, { Component } from 'react';


export default class Button extends React.Component {
    state = { counter: 1,
        center: { lat: 37.7566, lng: -119.5969 }
    };
    
    handleClick = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1

        }));
    };

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.counter}
            </button>
        );
    }
}
