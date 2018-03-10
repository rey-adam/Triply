import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
    render() {
        return (
            <div>

                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="/img/yosemite.jpg" alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="/img/zion.jpg" alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="/img/bryce.jpg" alt="Third slide" />
                </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
                </a>
                </div>

                <div className="col-lg-8">
                    <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search your National Park here..." />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Search</button>
                    </span>
                    </div>
                </div>
                </div>
        );
    };
};

export default SearchForm;