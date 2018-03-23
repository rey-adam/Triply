import axios from "axios";

const BASEURL = `https://developer.nps.gov/api/v1/`;
const APIKEY = `mm0VlZmyUBOFM415HKtSZdiXhfB27a1ntlZU7ZT4`;

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
    camp : (parkCode) => {
        return axios.get(`${BASEURL}campgrounds?parkCode=${parkCode}&api_key=${APIKEY}`);
    },

    allCamp : (parkCode) => {
        return axios.get(`${BASEURL}campgrounds?api_key=${APIKEY}`);
    },

    visitorCenter : (parkCode) => {
        return axios.get(`${BASEURL}visitorcenters?api_key=${APIKEY}`);
    },

    event : (parkCode) => {
        return axios.get(`${BASEURL}events?&api_key=${APIKEY}`);
    }, 
    
    park : (parkCode) => {
        return axios.get(`${BASEURL}parks?parkCode=${parkCode}&api_key=${APIKEY}`);
    },
    
    center : (parkCode) => {
        return axios.get(`${BASEURL}visitorcenters?&api_key=${APIKEY}`);
    }
}; // END EXPORT