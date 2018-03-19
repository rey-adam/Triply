import React, { Component } from 'react';
import './Dashboard.css';
import Navbar from '../../components/Navbar';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react';
import SimpleMap from '../MapContainerB/MapContainerB';

class Dashboard extends Component {
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

