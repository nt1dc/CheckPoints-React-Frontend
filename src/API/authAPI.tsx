import axios from 'axios';
import {log} from "util";
import {useNavigate} from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/',
});



// @ts-ignore
// @ts-ignore
// @ts-ignore
const authAPI = {
// @ts-ignore

    login: async (username, password, navigate,updateError) => {


        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        var params = new URLSearchParams();
        // @ts-ignore
        params.append('username', username);

        params.append('password', password);

        await axiosInstance.post("login", params, config)
            .then(response => {
                console.log("zxc")
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                navigate("/app")
            }).catch(error => {
                console.log(error.toJSON())
                updateError(error.message+" \n bad credits");
            })
    },
    // @ts-ignore
    async register(username, password,updateError) {
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
            updateError("все с кайфом, иди логинься")
        }).catch(error => {
            if (error.response) {
                updateError(error.response.data);
            }
        })
    },
    async refreshToken() {
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + localStorage.getItem("refresh_token"),
            }
        }
        // @ts-ignore
        axiosInstance.get("token/refresh", config).then(res => {
            localStorage.setItem("access_token", res.data.access_token)
            localStorage.setItem("refresh_token", res.data.refresh_token)
            console.log(localStorage.getItem("access_token"))
        })
    }
}
export default authAPI;
