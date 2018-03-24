import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import SelectWrapper from '../../components/SelectWrapper';
import Modal from 'react-modal';
import parks from '../../helpers/api/npsApi/parkCodes/parksAll';
import './Search.css';
import axios from 'axios';
import qs from 'query-string';
// APIS 
import NPSAPI from "../../helpers/api/npsApi/npsAPI";
import MAPAPI from "../../helpers/api/mapsApi/mapsApi";


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

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userTripId: '',
            userLocationId: '',
            userParkCode: '',
            userParkName: '',
            parkLat: '',
            parkLong: '',
            parkURL: '',
            parkStates: '',
            parkDesc: '',
            parkWeather: '',
            parks: parks,
            modalIsOpen: false,
            focusedInput: null
        };
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleModalConfirm = this.handleModalConfirm.bind(this);
        this.handleParkAPIRequest = this.handleParkAPIRequest.bind(this);
        this.handleLocationAPIRequest = this.handleLocationAPIRequest.bind(this);
    };

    componentDidMount() {
        // parse url to get tripId
        const tripObj = qs.parse(this.props.location.search);
        const tripId = tripObj.tripId;
        this.setState({ userTripId: tripId });
    };

    openModal(message) {
        this.setState({ modalIsOpen: true, modalMessage: message });
    };

    closeModal() {
        this.setState({ modalIsOpen: false });
    };

    handleSubmit(e) {
        e.preventDefault();
        const parks = document.getElementById("park-select");
        const userParkCode = parks.options[parks.selectedIndex].value;
        const userParkName = parks.options[parks.selectedIndex].text;
        if (userParkName === 'Choose a park...') {
            alert('Please choose a park');
        } else {
            this.setState({
                userParkCode,
                userParkName
            });
            this.handleParkAPIRequest(userParkCode)
                .then(parkObj => {
                    this.setState({
                        parkURL: parkObj.url,
                        parkStates: parkObj.states,
                        parkDesc: parkObj.description,
                        parkWeather: parkObj.weather
                    });
                    this.openModal('hello');
                })
                .catch(err => {
                    console.error(err);
                });
        };
    }; // END HANDLE SUBMIT

    handleModalConfirm() {
        this.handleLocationAPIRequest(`${this.state.userParkName} National Park`)
        .then(locationObj => {
            this.setState({
                parkLat: locationObj.parkLat,
                parkLong: locationObj.parkLong
            });

            const locationData = {
                tripId: this.state.userTripId,
                parkName: this.state.userParkName,
                parkCode: this.state.userParkCode,
                latitude: locationObj.parkLat,
                longitude: locationObj.parkLong
            };
            
            return axios({
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                method: "POST",
                url: `/api/location`,
                data: locationData
            });
        })
        .then(dbLocation => {
            console.log(`===== USER'S SELECTED PARK DATA =====`);
            console.log(dbLocation.data);
            console.log('=====================================');

            this.setState({ userLocationId: dbLocation.data.id });
            this.props.history.push(`/search/trails?tripId=${this.state.userTripId}&locationId=${this.state.userLocationId}&parkCode=${this.state.userParkCode}&lat=${this.state.parkLat}&lng=${this.state.parkLong}`);
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleParkAPIRequest = query => {
    return NPSAPI
        .park(query)
        .then(npsRes => {
            const park = npsRes.data.data[0];
            const parkObj = {
                name: park.fullName,
                url: park.url,
                states: park.states,
                description: park.description,
                weather: park.weatherInfo
            };
            return parkObj;
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleLocationAPIRequest(query) {
    return MAPAPI
        .location(query)
        .then(mapRes => {
            const latitude = mapRes.data.results[0].geometry.location.lat
                , longitude = mapRes.data.results[0].geometry.location.lng;
            return {
                parkLat: latitude,
                parkLong: longitude
            };
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="park-search-container" style={{ height: '100%' }}>
                <Navbar />
                <Hero />

                <SelectWrapper>
                    <form id="park-form" className="select-form">
                        <div className="select-bar">
                            <select className="form-control select2"></select>
                            <select id="park-select" className="form-control select-options">
                                <option className="select-option">Choose a park...</option>
                                {parks.map((park, i) => (
                                    <option className="select-option"
                                        key={i}
                                        id={park.parkName}
                                        value={park.parkCode}>
                                        {`${park.parkName}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            id="park-btn"
                            className="btn btn-default select-btn pull-right"
                            type="submit"
                            onClick={this.handleSubmit}
                        >Submit</button>
                    </form>
                </SelectWrapper>

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
                        {`${this.state.userParkName} National Park`}
                        <button
                            id="confirm-park-btn"
                            className='btn btn-default confirm-btn'
                            onClick={this.handleModalConfirm}
                        >Add Park</button>
                    </h3>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <td>Site</td>
                                    <td><a href={this.state.parkURL} target="_blank">{this.state.parkURL}</a></td>
                                </tr>
                                <tr>
                                    <td>States</td>
                                    <td>{this.state.parkStates.includes(',') ? this.state.parkStates.replace(/,/g, ', ') : this.state.parkStates}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>{this.state.parkDesc}</td>
                                </tr>
                                <tr>
                                    <td>Weather</td>
                                    <td>{this.state.parkWeather.includes('http') ? <a href={this.state.parkWeather} target="_blank">{this.state.parkWeather}</a> : this.state.parkWeather}</td>
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

export default Search;