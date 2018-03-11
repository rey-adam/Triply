import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

class Hero extends Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="overlay"></div>
                <div className="hero-img"></div>
                <div className="row search-div">
                    <nav aria-label="Page navigation" className="col-lg-12">
                        <ul className="pagination">
                            <li>
                                <Link to='/search/trails' className={window.location.pathname === '/search/trails' ? "active" : ""}>Trails</Link>
                            </li>
                            <li>
                                <Link to='/search/activities' className={window.location.pathname === '/search/activities' ? "active" : ""}>Activities</Link>
                            </li>
                            <li>
                                <Link to='/search/food' className={window.location.pathname === '/search/food' ? "active" : ""}>Food</Link>
                            </li>
                            <li>
                                <Link to='/search/lodging' className={window.location.pathname === '/search/lodging' ? "active" : ""}>Lodging</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="col-lg-12">
                        <div className="input-group search-bar">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={ 
                                    window.location.pathname === '/search/trails' ? "Search trails..." :
                                    window.location.pathname === '/search/activities' ? "Search activities..." : window.location.pathname === '/search/food' ? "Search food..." :
                                    window.location.pathname === '/search/lodging' ? "Search lodging..." :
                                    "" 
                                }
                                name={
                                    window.location.pathname === '/search/trails' ? "trailSearch" : window.location.pathname === '/search/activities' ? "activitySearch" :
                                    window.location.pathname === '/search/food' ? "foodSearch" :
                                    window.location.pathname === '/search/lodging' ? "lodgingSearch" :
                                    ""
                                }
                                value={
                                    window.location.pathname === '/search/trails' ? this.props.trailSearch : 
                                    window.location.pathname === '/search/activities' ? this.props.activitiesSearch :
                                    window.location.pathname === '/search/food' ? this.props.foodSearch :
                                    window.location.pathname === '/search/lodging' ? this.props.lodgingSearch :
                                    ""
                                }
                                onChange={this.props.handleChange}
                            />
                            <div className="search-overlay"></div>
                            <span className="input-group-btn">
                                <button
                                    id="search-btn"
                                    className="btn btn-default"
                                    type="button"
                                    onClick={
                                        window.location.pathname === '/search/trails' ? () => this.props.handleTrailSearch(this.props.trailSearch) :
                                        window.location.pathname === '/search/activities' ? () => this.props.handleActivitySearch(this.props.activitySearch) :
                                        window.location.pathname === '/search/food' ? () => this.props.handleFoodSearch(this.props.foodSearch) :
                                        window.location.pathname === '/search/lodging' ? () => this.props.handleLodgingSearch(this.props.lodgingSearch) :
                                        ""
                                    }
                                >Explore</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Hero;