import axios from "axios";

const APIKEY = "mm0VlZmyUBOFM415HKtSZdiXhfB27a1ntlZU7ZT4"
    , BASEURL = `https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${APIKEY}&q=`;

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