import React, { Component } from 'react';
import SearchTabs from '../SearchTabs';
import SelectWrapper from '../../SelectWrapper';
// import SearchBar from '../SearchBar';
import '../../Hero/Hero.css';
import './SearchDiv.css';
import '../../../pages/Search/Search.css';

class SearchDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trails: []
        }
        this.handleTrailSubmit = this.handleTrailSubmit.bind(this);
    };

    componentDidMount() {
        this.setState({
            trails: this.props.trails
        });
    }

    handleTrailSubmit(e) {
        e.preventDefault();
        const trails = document.getElementById("trail-select");
        const userTrailId = trails.options[trails.selectedIndex].value;
        const userTrailIndex = trails.options[trails.selectedIndex].getAttribute('data-index');
        const userTrailName = trails.options[trails.selectedIndex].text;
        if (userTrailName === 'Choose a trail...') {
            alert('Please choose a trail');
        } else {
            console.log(`${userTrailIndex}, ${userTrailId}, ${userTrailName}`);
            const userTrail = this.props.trails[userTrailIndex];
            const userTrailObj = {
                id: userTrail.id,
                name: userTrail.name,
                img: userTrail.imgMedium || 'http://via.placeholder.com/350x150',
                location:userTrail.location,
                summary: userTrail.summary,
                difficulty: userTrail.difficulty,
                length: userTrail.length,
                stars: userTrail.stars,
                starVotes: userTrail.starVotes,
                url: userTrail.url
            };
            console.log(userTrailObj);
        };
    }

    render() {
        return (
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

                                    {window.location.pathname === '/search/trails' ? 
                                        this.props.trails.map((trail, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    data-index={i}
                                                    id={trail.id}
                                                    value={trail.id}>
                                                    {`${trail.name}`}
                                                </option>
                                            )
                                        }) :
                                    window.location.pathname === '/search/activities' ?
                                        this.props.userActivities.map((act, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    id={act.id}
                                                    value={act.id}>
                                                    {`${act.name}`}
                                                </option>
                                            )
                                        }) : 
                                    window.location.pathname === '/search/campsites' ?
                                        this.props.userCampsites.map((camp, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    id={camp.id}
                                                    value={camp.id}>
                                                    {`${camp.name}`}
                                                </option>
                                            )
                                        }) : 
                                    window.location.pathname === '/search/visitor' ?
                                    this.props.userVisitorCenters.map((vc, i) => {
                                        return (
                                            <option
                                                key={i}
                                                id={vc.id}
                                                value={vc.id}>
                                                {`${vc.name}`}
                                            </option>
                                        )
                                    }) : ''}
                                    
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
                                onClick={window.location.pathname === '/search/trails' ?
                                    this.handleTrailSubmit :
                                        window.location.pathname === '/search/activities' ?
                                            this.handleActivitySubmit :
                                            window.location.pathname === '/search/campsites' ?
                                                this.handleCampSubmit :
                                                window.location.pathname === '/search/visitor' ?
                                                    this.handleVCSubmit : ''}
                            >Submit</button>
                        </form>
                    </SelectWrapper>
                </div>
            </div>
        );
    };
};

export default SearchDiv;