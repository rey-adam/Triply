import React, { Component } from 'react';
import './Dashboard.css';
import Navbar from '../../components/Navbar';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react';
import SimpleMap from '../MapContainerB/MapContainerB';
// APIS 
import NPSAPI from "../../helpers/api/npsApi/npsAPI";
import MAPAPI from "../../helpers/api/mapsApi/mapsApi";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentDidMount() {
        console.log(this.state.parks);
        // this.openModal('hello');
    }; // DID MOUNT

    npsApiCall = query => {
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
            .catch(err => console.log(err)); // END CALL
    }; // END API

    mapApiCall(query) {
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
            .catch(err => console.log(err)); // END CALL
    }; // END API



    render() {
        return (
            <div>
                <Navbar />

                {/* create new trip form */}
            <div id="tripName">
                <form id="input" className="form">
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Create new trip</label>
                        <input type="text" className="" id="" placeholder="Trip name..." />
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>
                </form>
            </div>



            {/* Saved Trips  */}
            <h1>Saved Trips</h1>
            <div id="accordion">

        <div className="card">
            <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Trip Name Example 1
                </button>
            </h5>
            </div>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            <div className="card-body">

                <div class="panel panel-default">
                <div class="panel-body">
                    Activity example (hike trail name)
                </div>
                </div>
            </div>
            <div className="card-body">

                <div class="panel panel-default">
                <div class="panel-body">
                    Visitor Center (visitor center name)
                </div>
                </div>
            </div>

            <div className="card-body">

            <div class="panel panel-default">
                <div class="panel-body">
                    Campsite example (campsite name)
                </div>
                </div>
                </div>
            </div>

        </div>


        <div className="card">
            <div className="card-header" id="headingThree">
            <h5 className="mb-0">
                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                Trip Name Example 2
                </button>
            </h5>
            </div>
            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
            <div className="card-body">

                <div class="panel panel-default">
                <div class="panel-body">
                    Activity example (hike trail name)
                </div>
                </div>
            </div>
            <div className="card-body">

                <div class="panel panel-default">
                <div class="panel-body">
                    Visitor Center (visitor center name)
                </div>
                </div>
            </div>

            <div className="card-body">

                <div class="panel panel-default">
                <div class="panel-body">
                    Campsite example (campsite name)
                </div>
                </div>
            </div>
            </div>

        </div>
        </div>

            {/* weather div  */}
            <div>

            </div>
            
            {/*  */}    
                <h1>Triply Dashboard</h1>
                <div id='mapDiv'>
                <SimpleMap />
                </div>
            </div>

        );
    };
};

export default Dashboard;

