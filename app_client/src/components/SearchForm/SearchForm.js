import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
    render() {
        return (
            <div>
                
                 {/* Carousel Pictures */}
                 <div className="carousel-container">
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
                <div className="flex-container">
                <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src="/img/bryce.jpg" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Bryce Canyon National Park</h5>
                    <h6 className="card-text">A Forest of Stone</h6>
                    <p className="card-text">There is no place like Bryce Canyon. Hoodoos (odd-shaped pillars of rock left standing from the forces of erosion) can be found on every continent, but here is the largest collection of hoodoos in the world! Descriptions fail. Photographs do not do it justice. Bring your sense of wonder and imagination when visiting Bryce Canyon National Park.</p>
                    <a href="#" className="btn btn-primary">Learn More Here</a>
                </div>
                </div>

                <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src="/img/glacier.jpg" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Glacier National Park</h5>
                    <p className="card-text">As the Crown of the Continent, Glacier is the headwaters for streams that flow to the Pacific Ocean, the Gulf of Mexico, and to Hudson's Bay. What happens here affects waters in a huge section of North America. Due to a detection of invasive mussel populations in central Montana, Glacier has closed all park waters to motorized and trailered watercraft until further notice</p>
                    <a href="#" className="btn btn-primary">Learn More Here</a>
                </div>

                </div>
                <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src="/img/yosemite.jpg" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Yosemite National Park</h5>
                    <p className="card-text">Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra.

First protected in 1864, Yosemite National Park is best known for its waterfalls, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, ancient giant sequoias, a vast wilderness area, and much more.</p>
                    <a href="#" className="btn btn-primary">Learn More Here</a>
                </div>
                </div>
                </div>

                </div>
        );
    };
};

export default SearchForm;