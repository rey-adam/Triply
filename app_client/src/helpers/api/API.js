import axios from "axios";

const BASEURL = `https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${process.env.NATIONAL_PARKS_API_KEY}&q=`;

/*  
    =====================================================================================
    EXPORT AN OBJECT WITH A "SEARCH" METHOD THAT SEARCHES THE NATIONAL PARK API FOR THE 
    PASSED QUERY
    ===================================================================================== 
*/

export default {
    search : function (query) {
        return axios.get(BASEURL + query);
    }
}; // END EXPORT