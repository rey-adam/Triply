import axios from "axios";

const BASEURL = `https://maps.googleapis.com/maps/api/geocode/json?`;
const APIKEY = `&key=${process.env.GOOGLE_MAPS_API_KEY}`;

/*  
    =====================================================================================

    // GOOGLE MAPS API WORKING URL
    GOOGLE MAPS: https://maps.googleapis.com/maps/api/geocode/json?address=yosemite&key=AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo
    
    ===================================================================================== 
*/

export default {
    search : (query) => {
        const ADDRESS = `address=${query}`;
        return axios.get(BASEURL + ADDRESS + APIKEY);
    }
}; // END EXPORT