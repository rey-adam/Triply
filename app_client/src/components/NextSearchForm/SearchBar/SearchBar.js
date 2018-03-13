import React, { Component } from 'react';
import '../../Hero/Hero.css';
import '../SearchDiv/SearchDiv.css';
import './SearchBar.css';

class SearchBar extends Component {
    render() {
        return (
            <div className="col-lg-12">
                <div className="input-group search-bar">
                    <input
                        autoComplete="true"
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
                            window.location.pathname === '/search/activities' ? this.props.activitySearch :
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
                            type="submit"
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
        );
    };
};

export default SearchBar;