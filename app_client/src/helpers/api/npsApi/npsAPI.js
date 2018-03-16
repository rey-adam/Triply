import axios from "axios";

const BASEURL = `https://developer.nps.gov/api/v1/`;
const APIKEY = `&api_key=${process.env.NATIONAL_PARKS_API_KEY}`;

/*  
    =====================================================================================

    // NATIONAL PARK SERVICE API WORKING URLS 

    CAMPGROUNDS: https://developer.nps.gov/api/v1/campgrounds?parkCode=yose&api_key=NATIONAL_PARKS_API_KEY
    
    EVENTS: https://developer.nps.gov/api/v1/events?&api_key=NATIONAL_PARKS_API_KEY

    PARKS: https://developer.nps.gov/api/v1/parks?parkCode=yose&api_key=NATIONAL_PARKS_API_KEY

    VISITORCENTER: https://developer.nps.gov/api/v1/visitorcenters?&api_key=NATIONAL_PARKS_API_KEY
    
    ===================================================================================== 
*/

export default {
    campgrounds : (query) => {
        const PARKCODE = `campgrounds?parkCode=${query}`;
        return axios.get(BASEURL + PARKCODE + APIKEY);
    },
    events : (query) => {
        return axios.get(`${BASEURL}events?${APIKEY}`);
    },        
    park : (query) => {
        const PARKCODE = `parks?parkCode=${query}`;
        return axios.get(BASEURL + PARKCODE + APIKEY);
    },
    visitorCenters : (query) => {
        return axios.get(`${BASEURL}visitorcenters?${APIKEY}`);
    }
}; // END EXPORT