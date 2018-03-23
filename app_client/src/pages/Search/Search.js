import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
// import ControlledCarousel from '../../components/Carousel';
import SelectWrapper from '../../components/SelectWrapper';
import Modal from 'react-modal';
// import axios from 'axios';
import parks from '../../helpers/api/npsApi/parkCodes/parks';
import './Search.css';
// APIS 
import NPSAPI from "../../helpers/api/npsApi/npsAPI";
import MAPAPI from "../../helpers/api/mapsApi/mapsApi"
// date picker
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';


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
            userParkCode: '',
            userParkName: '',
            parkURL: '',
            parkStates: '',
            parkDesc: '',
            parkWeather: '',
            parks: parks,
            modalIsOpen: false,
            startDate: null,
            endDate: null,
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
        console.log(this.state.parks);
        // this.openModal('hello');
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
            console.log(`${userParkName}, ${userParkCode}`);
            this.setState({
                userParkCode,
                userParkName
            });
            this.handleParkAPIRequest(userParkCode)
                .then(parkObj => {
                    console.log(parkObj);
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
        if (this.state.startDate === null && this.state.endDate === null) {
            alert('Please set a date range for your trip');
        } else if (this.state.startDate === null && this.state.endDate !== null) {
            alert('Please set a start date');
        } else if (this.state.startDate !== null && this.state.endDate === null) {
            alert('Please set an end date');
        } else {
            console.log("=========== USER'S TRIP INFO ===========");
            console.log(`Park: ${this.state.userParkName}`);
            console.log(`Start Date: ${this.state.startDate._d}`);
            console.log(`End date: ${this.state.endDate._d}`);
            console.log("========================================");

            this.handleLocationAPIRequest(`${this.state.userParkName} National Park`)
            .then(locationObj => {
                this.props.history.push(`/search/trails?park=${this.state.userParkCode}&lat=${locationObj.parkLat}&lng=${locationObj.parkLong}`);
            })
            .catch(err => {
                console.error(err);
            });
        }
    }

    handleParkAPIRequest = query => {
    return NPSAPI
        .park(query)
        .then(npsRes => {
            console.log(npsRes.data);
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
                        >Create Trip</button>
                    </h3>

                    <DateRangePicker
                        startDate={this.state.startDate}
                        startDateId="start-date"
                        endDate={this.state.endDate}
                        endDateId="end-date"
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                    />

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