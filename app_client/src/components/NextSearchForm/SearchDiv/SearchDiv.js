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
            campsites: [],
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
            this.openModal('hello');
        };
    }

    handleActivitySubmit(e) {
        e.preventDefault();
    }

    handleCampSubmit(e) {
        e.preventDefault();
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
                        {`${this.state.trailName}`}
                        <button
                            id="confirm-park-btn"
                            className='btn btn-default'
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
            </div>
        );
    };
};

export default SearchDiv;