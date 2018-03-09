import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="home-container">
                <h3>Home</h3>
                <button className="btn btn-info" onClick={this.handleClick}>Back</button>
            </div>
        );
    };
};

export default Home;