import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
    render() {
        return (
            <div>
                <div className="image">
                
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