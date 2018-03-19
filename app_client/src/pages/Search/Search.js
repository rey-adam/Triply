import React, { Component } from 'react';
import NextSearch from '../../pages/NextSearch';
import Navbar from '../../components/Navbar';
import ControlledCarousel from '../../components/Carousel';
import SelectWrapper from '../../components/SelectWrapper';
import Modal from 'react-modal';
import axios from 'axios';
import parks from '../../helpers/api/npsApi/parkCodes/parks';
import './Search.css';
// APIS 
import NPSAPI from "../../helpers/api/npsApi/npsAPI";
import REIAPI from "../../helpers/api/reiApi/reiApi";
import MAPAPI from "../../helpers/api/mapsApi/mapsApi"

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
            marginTop: '2rem',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '70%',
            textAlign: 'center',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '400',
        }
    },
    messageStyles: {
        margin: '25px 10px 20px'
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
            parkLat: '',
            parkLong: '',
            parkTrails: [],
            parks: parks,
            modalIsOpen: false,
        };
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleModalConfirm = this.handleModalConfirm.bind(this);
        this.handleParkAPIRequest = this.handleParkAPIRequest.bind(this);
        this.handleLocationAPIRequest = this.handleLocationAPIRequest.bind(this);
        this.handleTrailAPIRequest = this.handleTrailAPIRequest.bind(this);
    };

    componentDidMount() {
        console.log(this.state.parks);
        // this.openModal('hello');
    };

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
        const park = this.state.userParkName;        
        this.handleLocationAPIRequest(park)
            .then(locationObj => {
                console.log(locationObj);
                this.setState({
                    parkLat: locationObj.parkLat,
                    parkLong: locationObj.parkLong
                });
                return this.handleTrailAPIRequest(this.state.parkLat, this.state.parkLong)
            })

            .then(trailRes => {
                // console.log(trailsResponse);
                this.setState({
                    parkTrails: trailRes
                });
                console.log(this.state.parkTrails);
                this.props.history.push('/search/trails');
            })
            
            .catch(err => {
                console.error(err);
            });
    }; // END HANDLE MODAL CONFIRM

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
            .catch(err => console.log(err));

        /* 
            MELODIES API CALL COMMENTED OUT
        */

        // return axios({
        //     headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        //     method: "GET",
        //     url: `/api/parks/${parkQuery}`
        // }).then(function (response) {
        //     console.log(response.data);
        //     const park = response.data.data[0];
        //     const parkObj = {
        //         name: park.fullName,
        //         url: park.url,
        //         states: park.states,
        //         description: park.description,
        //         weather: park.weatherInfo
        //     };
        //     return parkObj;
        // })
        //     .catch(err => {
        //         console.error(err);
        //     }); 

    }; // END PARK API REQUEST

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

        /* 
            MELODIES API CALL COMMENTED OUT
        */

        // return axios({
        //     headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        //     method: "GET",
        //     url: `/api/parks/location/${parkQuery}`
        // }).then(function (response) {
        //     console.log(response.data);
        //     const locationObj = {
        //         parkLat: response.data.latitude,
        //         parkLong: response.data.longitude
        //     };
        //     return locationObj;
        // })
        //     .catch(err => {
        //         console.error(err);
        //     }); // END MELODIES API CALL

    }; // END LOCATION API REQUEST

    handleTrailAPIRequest(lat, long) {
        return REIAPI
            .trails(lat, long)
            .then(res => {
                console.log(res.data);

                console.log(res.data.trails[0]);
                
                return res.data;
            })
            .catch(err => console.log(err));

        /* 
            MELODIES API CALL COMMENTED OUT
        */
       
        // return axios({
        //     headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        //     method: "GET",
        //     url: `/api/trails&lat=${lat}&long=${long}`
        // }).then(function (response) {
        //     console.log(response.data);
        //     return response.data;
        // })
        //     .catch(err => {
        //         console.error(err);
        //     });

    }; // END TRAIL API REQUEST

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Navbar />
                <ControlledCarousel />

                <SelectWrapper>
                    <form id="park-form" className="select-form">
                        <div className="select-bar">
                            <select className="form-control select2"></select>
                            <select id="park-select" className="form-control select-options">
                                <option>Choose a park...</option>
                                {parks.map((park, i) => (
                                    <option key={i} id={park.parkName} value={park.parkCode}>{`${park.parkName}`}</option>
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
                    {/* <h2 ref={subtitle => this.subtitle = subtitle}></h2> */}
                    <h3 className="modal-park-name">
                        {`${this.state.userParkName} National Park`}
                        <button
                            id="confirm-park-btn"
                            className='btn btn-default'
                            onClick={this.handleModalConfirm}
                        >Create Trip</button>
                    </h3>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <td>Site</td>
                                    <td><a href={this.state.parkURL}>{this.state.parkURL}</a></td>
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
                                    <td>{this.state.parkWeather.includes('http') ? <a href={this.state.parkWeather}>{this.state.parkWeather}</a> : this.state.parkWeather}</td>
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