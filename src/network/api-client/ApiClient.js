import axios from 'axios';
import Storage from '../../storage';


const apiClient = () => {
    const REACT_APP_API_URL = "http://44.206.245.7:5000/api/v1/";

    // const getHeader = () => {
    //     if (Storage.Session.getUserData === null) {
    //         return getPublicHeader()
    //     } else {
    //         return getPrivateHeader()
    //     }
    // }

    // const getPublicHeader = () => {
    //     return {
    //         "Content-Type": "application/json",
    //     }
    // }

    // const getPrivateHeader = () => {

    //     console.log("----------> getting pribvate header")

    //     return {
    //         "Content-Type": "application/json",
    //         "x-access-token":Storage.Session.getUserData().token
    //     }
    // }

    const axiosInstance = axios.create({
        baseURL: REACT_APP_API_URL,
        "Content-Type": "application/json"
    });

    axiosInstance.interceptors.request.use(async function (config) {
        try {
        } finally {
            return config;
        }
    });


    axiosInstance.interceptors.response.use(
        async function (response) {
            try {
            } finally {
                return response;
            }
        },
        async function (error) {
            try {
            } finally {
                // Ensure failed requests throw after interception
                return Promise.reject(error);
            }
        },
    );



    return axiosInstance;


}

export default apiClient;
