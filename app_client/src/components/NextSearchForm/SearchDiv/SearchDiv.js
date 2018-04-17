import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import SearchTabs from '../SearchTabs';
import SelectWrapper from '../../SelectWrapper';
import Modal from 'react-modal';
import '../../Hero/Hero.css';
import './SearchDiv.css';
import '../../../pages/Search/Search.css';
import axios from 'axios';

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
            width: '70%',
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
            userTripId: '',
            userLocationId: '',

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
            campDesc: '',
            campDir: '',
            campParkCode: '',
            campURL: '',
            campInternet: '',
            campShowers: '',
            campToilets: '',
            campElectricalHookups: '',
            campTotalSites: '',
            campFoodStorageLockers: '',
            campWeather: '',
            campRegOverview: '',
            campRegURL: '',
            campResDesc: '',
            campResURL: '',

            visitorCenters: [],
            VCId: '',
            VCName: '',
            VCURL: '',
            VCParkCode: '',
            VCAddress: '',
            VCPhone: '',
            VCEmail: '',
            VCHours: '',
            VCDescription: '',
            VCDirections: '',
            VCDirectionsURL: ''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleTrailSubmit = this.handleTrailSubmit.bind(this);
        this.handleActivitySubmit = this.handleActivitySubmit.bind(this);
        this.handleCampSubmit = this.handleCampSubmit.bind(this);
        this.handleVCSubmit = this.handleVCSubmit.bind(this);
        this.handleModalConfirm = this.handleModalConfirm.bind(this);
        this.handleAddTrail = this.handleAddTrail.bind(this);
        this.handleAddActivity = this.handleAddActivity.bind(this);
        this.handleAddCamp = this.handleAddCamp.bind(this);
        this.handleAddVC = this.handleAddVC.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            trails: nextProps.trails,
            userTripId: nextProps.userTripId,
            userLocationId: nextProps.userLocationId
        });
    }

    openModal(message) {
        this.setState({ modalIsOpen: true, modalMessage: message });
    };

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
            const userTrail = this.props.trails[userTrailIndex];

            const url = userTrail.url === "" ? 'N/A' : userTrail.url;

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
                url: url
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
            const userActivity = this.props.activities[userActivityIndex];

            const dates = userActivity.dates.split(',').join('\n');
            const recurrence = userActivity.recurrence;
            const startDate = recurrence.startDate;
            const frequency = recurrence.frequency;
            const endDate = recurrence.endDate;
            const url = userActivity.url === "" ? 'N/A' : userActivity.url;

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
                url: url
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
            const userCamp = this.props.campsites[userCampIndex];

            const description = userCamp.description === "" ? 'N/A' : userCamp.description;
            const directions = userCamp.directionsOverview === "" ? 'N/A' : userCamp.directionsOverview;
            const url = userCamp.url === undefined ? 'N/A' : userCamp.url;
            const internet = userCamp.accessibility.internetInfo === "" ? 'N/A' : userCamp.accessibility.internetInfo;
            const foodStorageLockers = userCamp.amenities.foodStorageLockers === false ? 'No' : userCamp.amenities.foodStorageLockers === true ? 'Yes' : 'N/A';
            const weather = userCamp.weatherOverview === "" ? 'N/A' : userCamp.weatherOverview;
            const regOverview = userCamp.regulationsOverview === "" ? 'N/A' : userCamp.regulationsOverview;
            const regURL = userCamp.regulationsUrl === "" ? 'N/A' : userCamp.regulationsUrl;
            const resDesc = userCamp.reservationsDescription === "" ? 'N/A' : userCamp.reservationsDescription;
            const resURL = userCamp.reservationsUrl === "" ? 'N/A' : userCamp.reservationsUrl;

            const userCampObj = {
                id: userCamp.id,
                name: userCamp.name,
                description: description,
                directions: directions,
                parkCode: userCamp.parkCode,
                url: url,
                internet: internet,
                showers: userCamp.amenities.showers[0],
                toilets: userCamp.amenities.toilets[0],
                electricalHookups: userCamp.campsites.electricalHookups,
                totalSites: userCamp.campsites.totalSites,
                foodStorageLockers: foodStorageLockers,
                weather: weather,
                regOverview: regOverview,
                regURL: regURL,
                resDesc: resDesc,
                resURL: resURL
            };

            this.setState({
                campId: userCampObj.id,
                campName: userCampObj.name,
                campDesc: userCampObj.description,
                campDir: userCampObj.directions,
                campParkCode: userCampObj.parkCode,
                campURL: userCampObj.url,
                campInternet: userCampObj.internet,
                campShowers: userCampObj.showers,
                campToilets: userCampObj.toilets,
                campElectricalHookups: userCampObj.electricalHookups,
                campTotalSites: userCampObj.totalSites,
                campFoodStorageLockers: userCampObj.foodStorageLockers,
                campWeather: userCampObj.weather,
                campRegOverview: userCampObj.regOverview,
                campRegURL: userCampObj.regURL,
                campResDesc: userCampObj.resDesc,
                campResURL: userCampObj.resURL,
            });

            this.openModal('campsite');
        }
    }

    handleVCSubmit(e) {
        e.preventDefault();
        const visitorCenters = document.getElementById("visitor-select");
        const userVCId = visitorCenters.options[visitorCenters.selectedIndex].value;
        const userVCIndex = visitorCenters.options[visitorCenters.selectedIndex].getAttribute('data-index');
        const userVCName = visitorCenters.options[visitorCenters.selectedIndex].text;
        if (userVCName === 'Choose a visitor center...') {
            alert('Please choose a visitor center');
        } else {
            const userVC = this.props.visitorCenters[userVCIndex];

            const address = userVC.addresses.length === 0 ? 'N/A' : userVC.addresses[0];
            const phone = userVC.contacts.phoneNumbers.length === 0 ? 'N/A' : userVC.contacts.phoneNumbers[0];
            const email = userVC.contacts.emailAddresses.length === 0 ? 'N/A' : userVC.contacts.emailAddresses[0];
            const description = userVC.description === "" ? 'N/A' : userVC.description;
            const directions = userVC.directionsInfo === "" ? 'N/A' : userVC.directionsInfo;
            const directionsURL = userVC.directionsURL === "" ? 'N/A' : userVC.directionsURL;
            const hours = userVC.operatingHours.length === 0 ? 'N/A' : userVC.operatingHours[0];
            const url = userVC.url === "" ? 'N/A' : userVC.url;

            const userVCObj = {
                id: userVC.id,
                name: userVC.name,
                url: url,
                parkCode: userVC.parkCode,
                address: address,
                phone: phone,
                email: email,
                hours: hours,
                description: description,
                directions: directions,
                directionsURL: directionsURL
            };

            this.setState({
                VCId: userVCObj.id,
                VCName: userVCObj.name,
                VCURL: userVCObj.url,
                VCParkCode: userVCObj.parkCode,
                VCAddress: userVCObj.address,
                VCPhone: userVCObj.phone,
                VCEmail: userVCObj.email,
                VCHours: userVCObj.hours,
                VCDescription: userVCObj.description,
                VCDirections: userVCObj.directions,
                VCDirectionsURL: userVCObj.directionsURL
            });

            this.openModal('visitor center');
        }
    }

    handleModalConfirm(e) {
        this.closeModal();

        // add class for css animation ("dashboard" in navbar blinks)
        const navDash = document.getElementById('nav-dash');
        navDash.classList.add('blink');
        // remove class
        setTimeout(() => {
            navDash.classList.remove('blink');
        }, 2500);

        if (e.target.id === 'confirm-trail-btn') {
            this.handleAddTrail();
        } else if (e.target.id === 'confirm-activity-btn') {
            this.handleAddActivity();
        } else if (e.target.id === 'confirm-camp-btn') {
            this.handleAddCamp();
        } else if (e.target.id === 'confirm-vc-btn') {
            this.handleAddVC();
        }
    }

    handleAddTrail() {
        const trailData = {
            locationId: this.state.userLocationId,
            trailName: this.state.trailName,
            trailId: this.state.trailId
        };

        axios({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            method: "POST",
            url: `/api/trail`,
            data: trailData
        })
        .then(dbTrail => {
            console.log(`Trail added: ${dbTrail.data.name}`);
        })
        .catch (err => {
            console.error(err);
        });
    }

    handleAddActivity() {
        const activityData = {
            locationId: this.state.userLocationId,
            activityName: this.state.activityName,
            activityId: this.state.activityId
        };

        axios({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            method: "POST",
            url: `/api/activity`,
            data: activityData
        })
        .then(dbActivity => {
            console.log(`Activity added: ${dbActivity.data.name}`);
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleAddCamp() {
        const campData = {
            locationId: this.state.userLocationId,
            campName: this.state.campName,
            campId: this.state.campId
        };

        axios({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            method: "POST",
            url: `/api/campsite`,
            data: campData
        })
        .then(dbCamp => {
            console.log(`Camp added: ${dbCamp.data.name}`);
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleAddVC() {
        const VCData = {
            locationId: this.state.userLocationId,
            VCName: this.state.VCName,
            VCId: this.state.VCId
        };

        axios({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            method: "POST",
            url: `/api/center`,
            data: VCData
        })
        .then(dbVC => {
            console.log(`VC added: ${dbVC.data.name}`);
        })
        .catch(err => {
            console.error(err);
        });
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

                                    <option className="select-option">
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
                                                    <option className="select-option"
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
                                                    <option className="select-option"
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
                                                    <option className="select-option"
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
                                                    <option className="select-option"
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
                                        {this.state.trailURL === 'N/A' ?
                                            <td>{this.state.trailURL}</td>
                                            :
                                            <td>
                                                <a href={this.state.trailURL} target="_blank">
                                                    {this.state.trailURL}
                                                </a>
                                            </td>
                                        }
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
                                            <td>{this.state.activityTime === '' ? 'N/A' : this.state.activityTime}</td>
                                        </tr>
                                        <tr>
                                            <td>Location</td>
                                            <td>{this.state.activityLoc}</td>
                                        </tr>
                                        <tr>
                                            <td>Site</td>
                                            {this.state.activityURL === 'N/A' ?
                                                <td>{this.state.activityURL}</td>
                                                :
                                                <td>
                                                    <a href={this.state.activityURL} target="_blank">
                                                        {this.state.activityURL}
                                                    </a>
                                                </td>
                                            }
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
                            <h3 className="modal-park-name">
                                {this.state.campName}
                                <button
                                    id="confirm-camp-btn"
                                    className='btn btn-default confirm-btn'
                                    onClick={this.handleModalConfirm}
                                >Add</button>
                            </h3>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <tbody>
                                        <tr>
                                            <td>Description</td>
                                            <td>{this.state.campDesc}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Sites</td>
                                            <td>{this.state.campTotalSites}</td>
                                        </tr>
                                        <tr>
                                            <td>Internet</td>
                                            <td>{this.state.campInternet}</td>
                                        </tr>
                                        <tr>
                                            <td>Showers</td>
                                            <td>{this.state.campShowers}</td>
                                        </tr>
                                        <tr>
                                            <td>Toilets</td>
                                            <td>{this.state.campToilets}</td>
                                        </tr>
                                        <tr>
                                            <td>Electrical Hookups</td>
                                            <td>{this.state.campElectricalHookups}</td>
                                        </tr>
                                        <tr>
                                            <td>Food Storage Lockers</td>
                                            <td>{this.state.campFoodStorageLockers}</td>
                                        </tr>
                                        <tr>
                                            <td>Directions</td>
                                            <td>{this.state.campDir}</td>
                                        </tr>
                                        <tr>
                                            <td>Weather</td>
                                            {this.state.campWeather.includes('http') ?
                                                <td>
                                                    <a href={this.state.campWeather} target="_blank">
                                                        {this.state.campWeather}
                                                    </a>
                                                </td>
                                                :
                                                <td>{this.state.campWeather}</td>
                                            }
                                        </tr>
                                        <tr>
                                            <td>Regulations</td>
                                            {this.state.campRegOverview === 'N/A' && this.state.campRegURL === 'N/A' ?
                                                <td>{this.state.campRegOverview}</td>

                                                : this.state.campRegOverview === 'N/A' && this.state.campRegURL !== 'N/A' ?
                                                    <td>{this.state.campRegURL}</td>

                                                    : this.state.campRegOverview !== 'N/A' && this.state.campRegURL === 'N/A' ?
                                                        <td>
                                                            <a href={this.state.campRegURL}>
                                                                {this.state.campRegURL}
                                                            </a>
                                                        </td>

                                                        :
                                                        <td>
                                                            {this.state.campRegOverview}<br /><br />
                                                            <a href={this.state.campRegURL}>
                                                                {this.state.campRegURL}
                                                            </a>
                                                        </td>
                                            }
                                        </tr>
                                        <tr>
                                            <td>Reservations</td>
                                            {this.state.campResDesc === 'N/A' && this.state.campResURL === 'N/A' ?
                                                <td>{this.state.campResDesc}</td>

                                                : this.state.campResDesc === 'N/A' && this.state.campResURL !== 'N/A' ?
                                                    <td>{this.state.campResURL}</td>

                                                    : this.state.campResDesc !== 'N/A' && this.state.campResURL === 'N/A' ?
                                                        <td>
                                                            <a href={this.state.campResURL}>
                                                                {this.state.campResURL}
                                                            </a>
                                                        </td>

                                                        :
                                                        <td>
                                                            {this.state.campResDesc}<br /><br />
                                                            <a href={this.state.campResURL}>
                                                                {this.state.campResURL}
                                                            </a>
                                                        </td>
                                            }
                                        </tr>
                                        <tr>
                                            <td>Site</td>
                                            {this.state.campURL === 'N/A' ?
                                                <td>{this.state.campURL}</td>
                                                :
                                                <td>
                                                    <a href={this.state.campResURL} target="_blank">
                                                        {this.state.campResURL}
                                                    </a>
                                                </td>
                                            }
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
                            <h3 className="modal-park-name">
                                {this.state.VCName}
                                <button
                                    id="confirm-vc-btn"
                                    className='btn btn-default confirm-btn'
                                    onClick={this.handleModalConfirm}
                                >Add</button>
                            </h3>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <tbody>
                                        <tr>
                                            <td>Description</td>
                                            <td>{this.state.VCDescription}</td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>{this.state.VCAddress}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td>{this.state.VCPhone}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{this.state.VCEmail}</td>
                                        </tr>
                                        <tr>
                                            <td>Hours</td>
                                            <td>{this.state.VCHours}</td>
                                        </tr>
                                        <tr>
                                            <td>Directions</td>
                                            {this.state.directions === 'N/A' && this.state.directionsURL === 'N/A' ?
                                                <td>{this.state.VCDirections}</td>

                                                : this.state.directions === 'N/A' && this.state.directionsURL !== 'N/A' ?
                                                    <td>{this.state.VCDirectionsURL}</td>

                                                    : this.state.directions !== 'N/A' && this.state.directionsURL === 'N/A' ?
                                                        <td>
                                                            <a href={this.state.VCDirectionsURL}>
                                                                {this.state.VCDirectionsURL}
                                                            </a>
                                                        </td>

                                                        :
                                                        <td>
                                                            {this.state.VCDirections}<br /><br />
                                                            <a href={this.state.VCDirectionsURL}>
                                                                {this.state.VCDirectionsURL}
                                                            </a>
                                                        </td>
                                            }
                                        </tr>
                                        <tr>
                                            <td>Site</td>
                                            {this.state.VCURL === 'N/A' ?
                                                <td>{this.state.VCURL}</td>
                                                :
                                                <td>
                                                    <a href={this.state.VCURL} target="_blank">
                                                        {this.state.VCURL}
                                                    </a>
                                                </td>
                                            }
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
            </div>
        );
    };
};

export default SearchDiv;