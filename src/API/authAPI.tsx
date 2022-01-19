import axios from 'axios';
import {log} from "util";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/',
});


const authAPI = {
    login: async (username: String, password: String) => {

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        var params = new URLSearchParams();
        // @ts-ignore
        params.append('username', username);
        // @ts-ignore
        params.append('password', password);

        axiosInstance.post("login", params, config).then(function (response) {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            console.log(localStorage.getItem("access_token"))
        })
    },
    async register(username: String, password: String) {
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        const data = {
            "username": username,
            "password": password
        }
        return await axiosInstance.post("register", data, config).then(function (resp) {
            console.log(resp.status)
        })
    }
}
export default authAPI;
