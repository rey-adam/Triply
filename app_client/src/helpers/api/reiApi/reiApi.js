import axios from "axios";

const BASEURL = `https://www.hikingproject.com/data/get-trails?`;
const APIKEY = `&key=${process.env.HIKING_PROJECT_API_KEY}`;
const MAXDISTANCE = "&maxDistance=15";

/*  
    =====================================================================================

    // REI API WORKING URL
    
    REI TRAILS: https://www.hikingproject.com/data/get-trails?lat=37.8651011&lon=-119.5383294&maxDistance=15&key=HIKING_PROJECT_API_KEY
    
    ===================================================================================== 
*/

export default {
    search : (lat, lon) => {
        return axios.get(BASEURL + `lat=${lat}&lon=${lon}` + MAXDISTANCE + APIKEY);
    }
}; // END EXPORT