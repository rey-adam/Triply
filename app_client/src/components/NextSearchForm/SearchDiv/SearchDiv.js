import React from 'react';
import SearchTabs from '../SearchTabs';
import SelectWrapper from '../../SelectWrapper';
// import SearchBar from '../SearchBar';
import '../../Hero/Hero.css';
import './SearchDiv.css';
import '../../../pages/Search/Search.css';

const SearchDiv = props => 
    <div className="search-wrapper">
        <div className="row search-div">
            <SearchTabs />
            <SelectWrapper>
                <form 
                    className={`${window.location.pathname === '/search/trails' ? 'trail-' :
                    window.location.pathname === '/search/activities' ? 'activity-' :
                    window.location.pathname === '/search/campsites' ? 'campsite-' :
                    window.location.pathname === '/search/visitor' ? 'visitor-' :
                    ''}form select-form next-select-form`}>
                    
                    <div className="select-bar">

                        <select className="form-control select2"></select>
                        <select id={`${window.location.pathname === '/search/trails' ? 'trail-' :
                            window.location.pathname === '/search/activities' ? 'activity-' :
                            window.location.pathname === '/search/campsites' ? 'campsite-' :
                            window.location.pathname === '/search/visitor' ? 'visitor-' :
                            ''}select`} className="form-control select-options">

                            <option>
                                {`${window.location.pathname === '/search/trails' ? 'Choose a trail...' :
                                window.location.pathname === '/search/activities' ? 'Choose an activity...' :
                                window.location.pathname === '/search/campsites' ? 'Choose a campsite...' :
                                window.location.pathname === '/search/visitor' ? 'Choose a visitor center...' :
                                'Choose a category...'}`}
                            </option>
                        </select>
                    </div>

                    <button
                        id={`${window.location.pathname === '/search/trails' ? 'trail-' :
                        window.location.pathname === '/search/activities' ? 'activity-' :
                        window.location.pathname === '/search/campsites' ? 'campsite-' :
                        window.location.pathname === '/search/visitor' ? 'visitor-' :
                        'select-'}btn`}
                        className="btn btn-default select-btn pull-right"
                        type="submit"
                    >Submit</button>
                </form>
            </SelectWrapper>
        </div>
    </div>;

export default SearchDiv;