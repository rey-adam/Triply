import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
    render() {
        return (
            <div>
                
                 {/* Carousel Pictures */}
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">

                <div className="carousel-item active">
                <img src="/img/yosemite.jpg" alt="Yosemite National Park" />
                <div className="carousel-caption d-none d-md-block">
                    <h5>Yosemite Nantional Park</h5>
                    <p>...</p>
                </div>
                </div>

                <div className="carousel-item">
                <img src="/img/zion.jpg" alt="Zion National Park" />
                <div className="carousel-caption d-none d-md-block">
                    <h5>Zion National Park</h5>
                    <p>Angel's Landing</p>
                </div>
                </div>

                <div className="carousel-item">
                <img src="/img/glacier.jpg" alt="Glacier National Park" />
                <div className="carousel-caption d-none d-md-block">
                    <h5>Glacier National Park</h5>
                    <p>Glacier Lake</p>
                </div>
                </div>

                <div className="carousel-item">
                <img src="/img/bryce.jpg" alt="Bryce National Park" />
                <div className="carousel-caption d-none d-md-block">
                    <h5>Bryce Canyon National Park</h5>
                    <p>...</p>
                </div>
                </div>

                <div className="carousel-item">
                <img src="/img/yellowstone.jpg" alt="Yellowstone National Park" />
                <div className="carousel-caption d-none d-md-block">
                    <h5>Yellowstone National Park</h5>
                    <p>...</p>
                </div>
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

                {/* Search Bar  */}
                <div className="col-lg-8">
                    <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search your National Park here..." />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Search</button>
                    </span>
                    </div>
                </div>

                  {/* Popular National Parks  */}

                </div>
        );
    };
};

export default SearchForm;