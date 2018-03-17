






/*
    =====================================================================================

    THESE API ROUTES HAVE BEEN MOVED TO APP_CLIENT/SRC/HELPERS/API
    
    =====================================================================================   
*/

const models = require('../../models')
    , axios = require('axios');

/*
    =====================================================================================
    APIS
    =====================================================================================   
*/

class ApiCtrl {
    static getParkData(req, res) {
        ApiCtrl._queryNationalParkAPI(res, req.params.userPark)
        .then(parkResponse => {
            console.log('=============================');
            console.log(`'${parkResponse.data[0].fullName}' found`);
            console.log('=============================');
            res.json(parkResponse);
        })
        .catch(err => {
            console.error(err);
        })
    }
    
    static getTrailData(req, res) {
        ApiCtrl._queryGoogleMapsAPI(res, req.params.userTrail)
        .then(locationResponse => {
            if (locationResponse) {
                ApiCtrl._queryHikingProjectAPI(res, locationResponse.latitude, locationResponse.longitude)
                .then(trailResponse => {
                    console.log('====================');
                    console.log(`${trailResponse.length} trails found`);
                    console.log('====================');
                    res.json(trailResponse);
                })
                .catch(err => {
                    console.error(err);
                });
            }
        });
    }

    static _queryNationalParkAPI(res, userPark) {
        const url = `https://developer.nps.gov/api/v1/parks?limit=1&q=${userPark}&api_key=${process.env.NATIONAL_PARKS_API_KEY}`;
        console.log(url);
        return axios.get(url)
        .then(nationalParkResponse => {
            if (nationalParkResponse) {
                return nationalParkResponse.data;
            }
        })
        .catch(err => {
            res.json(err);
        });
    }

    static _queryGoogleMapsAPI(res, userPark) {
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
                    return hikingProjectResponse.data.trails;
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