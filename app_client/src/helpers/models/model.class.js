import axios from "axios";
import helper from "../authHelper";

export default class Model {
    constructor(ROUTE) {
        this.ROUTE = ROUTE;
    }
    /**
     * 
     */
    get apiRoute() {
        return this.ROUTE
    }
    /**
     * 
     * @param {*} id 
     */
    getOne(id) {
        // console.log(helper.getToken());
        return axios({
            url: `${this.ROUTE}/${id}`,
            method: "GET",
            headers: {"Authorization": "Bearer " + helper.getToken()}
        })
    }
    /**
     * 
     */
    getAll(id) {
        return  axios({
            url: this.ROUTE,
            method: "GET",
            headers: {"Authorization": "Bearer " + helper.getToken()}
        })
    }
    /**
     * 
     * @param {*} data 
     */
    create(data) {
        return  axios({
            url: this.ROUTE,
            data: data,
            method: "POST",
            headers: {"Authorization": "Bearer " + helper.getToken()}
        })
    }
    /**
     * 
     * @param {*} id 
     * @param {*} data 
     */
    update(id, data) {
        return  axios({
            url: `${this.ROUTE}/${id}`,
            method: "PUT",
            data: data,
            headers: {"Authorization": "Bearer " + helper.getToken()}
        })
    }
    /**
     * 
     * @param {*} id 
     */
    delete(id) {
        return  axios({
            url: `${this.ROUTE}/${id}`,
            method: "DELETE",
            headers: {"Authorization": "Bearer " + helper.getToken()}
        })
    }

}