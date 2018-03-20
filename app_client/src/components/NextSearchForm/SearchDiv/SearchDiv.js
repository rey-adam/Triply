import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import SearchTabs from '../SearchTabs';
import SelectWrapper from '../../SelectWrapper';
import Modal from 'react-modal';
// import SearchBar from '../SearchBar';
import '../../Hero/Hero.css';
import './SearchDiv.css';
import '../../../pages/Search/Search.css';

const styles = {
    modalStyles: {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.589)',
            position: 'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginTop: '1%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '70%',
            textAlign: 'center',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '400',
        }
    }
};

class SearchDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trails: [],
            trailId: '',
            trailName: '',
            trailURL: '',
            trailImg: '',
            trailSummary: '',
            trailLocation: '',
            trailLength: 0,
            trailDifficulty: '',
            trailRating: 0,
            trailVotes: 0,

            activities: [],
            activityId: '',
            activityName: '',
            activityLoc: '',
            activitySum: '',
            activityDates: '',
            activityTime: '',
            activityStart: '',
            activityFreq: '',
            activityEnd: '',
            activityParkCode: '',
            activityURL: '',

            campsites: [],
            campId: '',
            campName: '',
            campSum: '',
            campDir: '',
            campParkCode: '',
            campURL: '',

            visitorCenters: []
        }
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleTrailSubmit = this.handleTrailSubmit.bind(this);
        this.handleActivitySubmit = this.handleActivitySubmit.bind(this);
        this.handleCampSubmit = this.handleCampSubmit.bind(this);
        this.handleVCSubmit = this.handleVCSubmit.bind(this);
    };

    componentDidMount() {
        this.setState({
            trails: this.props.trails
            // this.openModal('hello');
        });
    }

    openModal(message) {
        this.setState({ modalIsOpen: true, modalMessage: message });
    };

    // afterOpenModal = () => {
    //     // references are now synced and can be accessed
    //     this.subtitle.style.color = '#f00';
    // }

    closeModal() {
        this.setState({ modalIsOpen: false });
    };

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
                img: userTrail.imgSmallMed || 'http://via.placeholder.com/350x150',
                location:userTrail.location,
                summary: userTrail.summary,
                difficulty: userTrail.difficulty,
                length: userTrail.length,
                stars: userTrail.stars,
                starVotes: userTrail.starVotes,
                url: userTrail.url
            };

            this.setState({ 
                trailId: userTrailObj.id,
                trailName: userTrailObj.name,
                trailURL: userTrailObj.url,
                trailImg: userTrailObj.img,
                trailSummary: userTrailObj.summary,
                trailLocation: userTrailObj.location,
                trailLength: userTrailObj.length,
                trailDifficulty: userTrailObj.difficulty,
                trailRating: userTrailObj.stars,
                trailVotes: userTrailObj.starVotes
            });
            console.log(userTrailObj);
            this.openModal('trail');
        }
    }

    handleActivitySubmit(e) {
        e.preventDefault();
        const activities = document.getElementById("activity-select");
        const userActivityId = activities.options[activities.selectedIndex].value;
        const userActivityIndex = activities.options[activities.selectedIndex].getAttribute('data-index');
        const userActivityName = activities.options[activities.selectedIndex].text;
        if (userActivityName === 'Choose an activity...') {
            alert('Please choose an activity');
        } else {
            console.log(`${userActivityIndex}, ${userActivityId}, ${userActivityName}`);
            const userActivity = this.props.activities[userActivityIndex];
            console.log(userActivity);

            const dates = userActivity.dates.split(',').join('\n');
            const recurrence = userActivity.recurrence;
            const startDate = recurrence.startDate;
            const frequency = recurrence.frequency;
            const endDate = recurrence.endDate;

            const userActivityObj = {
                id: userActivity.id,
                name: userActivity.title,
                location: userActivity.location,
                summary: userActivity.abstract,
                dates: dates,
                time: userActivity.time,
                startDate: startDate,
                frequency: frequency,
                endDate: endDate,
                parkCode: userActivity.parkCode,
                url: userActivity.url
            };

            this.setState({
                activityId: userActivityObj.id,
                activityName: userActivityObj.name,
                activityLoc: userActivityObj.location,
                activitySum: userActivityObj.summary,
                activityDates: userActivityObj.dates,
                activityTime: userActivityObj.time,
                activityStart: userActivityObj.startDate,
                activityFreq: userActivityObj.frequency,
                activityEnd: userActivityObj.endDate,
                activityParkCode: userActivityObj.parkCode,
                activityURL: userActivityObj.url
            });

            console.log(userActivityObj);
            this.openModal('activity');
        }
    }

    handleCampSubmit(e) {
        e.preventDefault();
        const campsites = document.getElementById("campsite-select");
        const userCampId = campsites.options[campsites.selectedIndex].value;
        const userCampIndex = campsites.options[campsites.selectedIndex].getAttribute('data-index');
        const userCampName = campsites.options[campsites.selectedIndex].text;
        if (userCampName === 'Choose a campsite...') {
            alert('Please choose a campsite');
        } else {
            console.log(`${userCampIndex}, ${userCampId}, ${userCampName}`);
            const userCamp = this.props.campsites[userCampIndex];
            console.log(userCamp);

            const userCampObj = {
                id: userCamp.id,
                name: userCamp.name,
                summary: userCamp.description,
                directions: userCamp.directionsOverview,
                parkCode: userCamp.parkCode,
                url: userCamp.url
            };

            this.setState({
                campId: userCampObj.id,
                campName: userCampObj.name,
                campSum: userCampObj.summary,
                campDir: userCampObj.directions,
                campParkCode: userCampObj.parkCode,
                campURL: userCampObj.url
            });

            console.log(userCampObj);
            this.openModal('campsite');
        }
    }

    handleVCSubmit(e) {
        e.preventDefault();
    }

    render() {
        const { trailRating, trailVotes } = this.state;
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
                                        this.props.trails.length === 0 ? (
                                            <option disabled>No trails available</option>
                                        ) :
                                        this.props.trails.map((trail, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    data-index={i}
                                                    id={trail.id}
                                                    value={trail.id}>
                                                    {trail.name}
                                                </option>
                                            )
                                        })
                                    : window.location.pathname === '/search/activities' ?
                                        this.props.activities.length === 0 ? (
                                            <option disabled>No activities available</option>
                                        ) :
                                        this.props.activities.map((act, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    data-index={i}
                                                    id={act.id}
                                                    value={act.id}>
                                                    {act.title}
                                                </option>
                                            )
                                        }) 
                                    : window.location.pathname === '/search/campsites' ?
                                        this.props.campsites.length === 0 ? (
                                            <option disabled>No campsites available</option>
                                        ) :
                                        this.props.campsites.map((camp, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    data-index={i}
                                                    id={camp.id}
                                                    value={camp.id}>
                                                    {camp.name}
                                                </option>
                                            )
                                        }) 
                                    : window.location.pathname === '/search/visitor' ?
                                        this.props.visitorCenters.length === 0 ? (
                                            <option disabled>No visitor centers available</option>
                                        ) :
                                        this.props.visitorCenters.map((vc, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    data-index={i}
                                                    id={vc.id}
                                                    value={vc.id}>
                                                    {vc.name}
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

                
                {/* *  * * * * * * * * * * * * * * * * * * * * * */}
                {/*                                              */}
                {/*   DYNAMICALLY RENDER MODALS BASED ON ROUTES  */}
                {/*                                              */}
                {/* *  * * * * * * * * * * * * * * * * * * * * * */}

                {window.location.pathname === '/search/trails' ?
                    
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={styles.modalStyles}
                        contentLabel='Example Modal'
                        shouldCloseOnOverlayClick={true}
                        ariaHideApp={false}
                    >
                        {/* <h2 ref={subtitle => this.subtitle = subtitle}></h2> */}
                        <h3 className="modal-park-name">
                            {this.state.trailName}
                            <button
                                id="confirm-trail-btn"
                                className='btn btn-default confirm-btn'
                                onClick={this.handleModalConfirm}
                            >Add</button>
                        </h3>
                        <img src={this.state.trailImg} alt={this.state.trailName} />
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td>
                                            Rating <br />
                                            {`(${trailVotes} ${trailVotes === 1 ? 'vote' : 'votes'})`}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex' }}>
                                                <StarRatingComponent
                                                    name="rate2"
                                                    editing={false}
                                                    starCount={5}
                                                    value={trailRating}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Summary</td>
                                        <td>{this.state.trailSummary}</td>
                                    </tr>
                                    <tr>
                                        <td>Length</td>
                                        <td>{this.state.trailLength} miles</td>
                                    </tr>
                                    <tr>
                                        <td>Difficulty</td>

                                        {/* https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript */}

                                        <td>
                                            {this.state.trailDifficulty.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + this.state.trailDifficulty.replace(/([a-z])([A-Z])/g, '$1 $2').slice(1)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Location</td>
                                        <td>{this.state.trailLocation}</td>
                                    </tr>
                                    <tr>
                                        <td>Site</td>
                                        <td><a href={this.state.trailURL} target="_blank">{this.state.trailURL}</a></td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                        <button
                            id="close-modal-btn"
                            className='btn btn-default'
                            onClick={this.closeModal}
                        >Back</button>
                    </Modal>
                    
                : window.location.pathname === '/search/activities' ?

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={styles.modalStyles}
                        contentLabel='Example Modal'
                        shouldCloseOnOverlayClick={true}
                        ariaHideApp={false}
                    >
                        {/* <h2 ref={subtitle => this.subtitle = subtitle}></h2> */}
                        <h3 className="modal-park-name">
                            {this.state.activityName}
                            <button
                                id="confirm-activity-btn"
                                className='btn btn-default confirm-btn'
                                onClick={this.handleModalConfirm}
                            >Add</button>
                        </h3>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td>Summary</td>
                                        <td>{this.state.activitySum}</td>
                                    </tr>
                                    <tr>
                                        <td>Dates</td>
                                        <td>{this.state.activityDates}</td>
                                    </tr>
                                    <tr>
                                        <td>Time</td>
                                        <td>{this.state.activityTime}</td>
                                    </tr>
                                    <tr>
                                        <td>Location</td>
                                        <td>{this.state.activityLoc}</td>
                                    </tr>
                                    <tr>
                                        <td>Site</td>
                                        <td><a href={this.state.activityURL} target="_blank">{this.state.activityURL}</a></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <button
                            id="close-modal-btn"
                            className='btn btn-default'
                            onClick={this.closeModal}
                        >Back</button>
                    </Modal> 
                    
                : window.location.pathname === '/search/campsites' ?

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={styles.modalStyles}
                        contentLabel='Example Modal'
                        shouldCloseOnOverlayClick={true}
                        ariaHideApp={false}
                    >
                        {/* <h2 ref={subtitle => this.subtitle = subtitle}></h2> */}
                        <h3 className="modal-park-name">
                            {this.state.trailName}
                            <button
                                id="confirm-park-btn"
                                className='btn btn-default confirm-btn'
                                onClick={this.handleModalConfirm}
                            >Add Trail</button>
                        </h3>
                        <img src={this.state.trailImg} alt={this.state.trailName} />
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td>
                                            Rating <br />
                                            {`(${trailVotes} ${trailVotes === 1 ? 'vote' : 'votes'})`}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex' }}>
                                                <StarRatingComponent
                                                    name="rate2"
                                                    editing={false}
                                                    starCount={5}
                                                    value={trailRating}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Summary</td>
                                        <td>{this.state.trailSummary}</td>
                                    </tr>
                                    <tr>
                                        <td>Length</td>
                                        <td>{this.state.trailLength} miles</td>
                                    </tr>
                                    <tr>
                                        <td>Difficulty</td>

                                        {/* https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript */}

                                        <td>
                                            {this.state.trailDifficulty.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + this.state.trailDifficulty.replace(/([a-z])([A-Z])/g, '$1 $2').slice(1)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Location</td>
                                        <td>{this.state.trailLocation}</td>
                                    </tr>
                                    <tr>
                                        <td>Site</td>
                                        <td><a href={this.state.trailURL} target="_blank">{this.state.trailURL}</a></td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                        <button
                            id="close-modal-btn"
                            className='btn btn-default'
                            onClick={this.closeModal}
                        >Back</button>
                    </Modal> 

                : window.location.pathname === '/search/visitor' ?

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={styles.modalStyles}
                        contentLabel='Example Modal'
                        shouldCloseOnOverlayClick={true}
                        ariaHideApp={false}
                    >
                        {/* <h2 ref={subtitle => this.subtitle = subtitle}></h2> */}
                        <h3 className="modal-park-name">
                            {this.state.trailName}
                            <button
                                id="confirm-park-btn"
                                className='btn btn-default confirm-btn'
                                onClick={this.handleModalConfirm}
                            >Add Trail</button>
                        </h3>
                        <img src={this.state.trailImg} alt={this.state.trailName} />
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td>
                                            Rating <br />
                                            {`(${trailVotes} ${trailVotes === 1 ? 'vote' : 'votes'})`}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex' }}>
                                                <StarRatingComponent
                                                    name="rate2"
                                                    editing={false}
                                                    starCount={5}
                                                    value={trailRating}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Summary</td>
                                        <td>{this.state.trailSummary}</td>
                                    </tr>
                                    <tr>
                                        <td>Length</td>
                                        <td>{this.state.trailLength} miles</td>
                                    </tr>
                                    <tr>
                                        <td>Difficulty</td>

                                        {/* https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript */}

                                        <td>
                                            {this.state.trailDifficulty.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + this.state.trailDifficulty.replace(/([a-z])([A-Z])/g, '$1 $2').slice(1)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Location</td>
                                        <td>{this.state.trailLocation}</td>
                                    </tr>
                                    <tr>
                                        <td>Site</td>
                                        <td><a href={this.state.trailURL} target="_blank">{this.state.trailURL}</a></td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                        <button
                            id="close-modal-btn"
                            className='btn btn-default'
                            onClick={this.closeModal}
                        >Back</button>
                    </Modal> 
                
                : ''}

            }
                
            </div>
        );
    };
};

export default SearchDiv;