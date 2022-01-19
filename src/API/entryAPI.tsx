import axios from "axios";

const authToken = "Bearer " + localStorage.getItem("access_token");


// @ts-ignore
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/app/',

});


export const entryAPI = {

    check: async (x: Number, y: Number, r: Number) => {
        const data = {
            x: x,
            y: y,
            r: r
        }

        console.log(data)
        return await axiosInstance.post("check", data, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": authToken,

            }
        });
    },

    clear: async () => {
        axiosInstance.get("clear", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": authToken,
            }
        }).then(value => {
            console.log(value.data)
        })
    },

    getAll: async () => {
        return await axiosInstance.get("myEntries", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": authToken,
            }
        }).then(value => {
            console.log(value.data)
        });


    }
}