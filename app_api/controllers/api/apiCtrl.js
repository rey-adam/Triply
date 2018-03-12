// =====================================================================================
// DEPENDENCIES
// =====================================================================================
const models = require('../../models')
    , axios = require('axios');

// =====================================================================================
// API CONTROLLER CONSTRUCTOR
// =====================================================================================
class ApiCtrl {
    static getTrailData(req, res) {
        ApiCtrl._queryGoogleMapsAPI(req.params.userPark)
        .then(locationResponse => {
            if (locationResponse) {
                ApiCtrl._queryHikingProjectAPI(res, locationResponse.latitude, locationResponse.longitude)
                .then(trailResponse => {

                })
                .catch(err => {
                    console.error(err);
                });
            }
        });
    }

    static _queryGoogleMapsAPI(userPark) {
        console.log(`park: ${userPark}`);
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${userPark}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
            .then(googleMapsResponse => {
                if (googleMapsResponse) {
                    // res.json(hikingProjectResponse.data);
                    const latitude = googleMapsResponse.data.results[0].geometry.location.lat;
                    const longitude = googleMapsResponse.data.results[0].geometry.location.lng;
                    const location = { latitude: latitude, longitude: longitude };
                    console.log(location);
                    return location;
                }
            })
            .catch(err => {
                res.json(err);
            });
    }

    static _queryHikingProjectAPI(res, latitude, longitude) {
        return axios.get(`https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=200&key=${process.env.HIKING_PROJECT_API_KEY}`)
            .then(hikingProjectResponse => {
                if (hikingProjectResponse) {
                    res.json(hikingProjectResponse.data.trails);
                }
            })
            .catch(err => {
                res.json(err);
            });
    }
};

// =====================================================================================
// EXPORT
// =====================================================================================
module.exports = ApiCtrl;