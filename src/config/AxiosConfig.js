import axios from "axios";

 export const BASE_URL = "https://fino-be.fino-web-app.agency/fino/system/";

// export const BASE_URL = "http://localhost:8099/fino/system/";

export const AxiosConfig = axios.create({
    baseURL: BASE_URL,
})

export const ProtectedAxiosConfig = axios.create({
    baseURL: BASE_URL,
})

AxiosConfig.interceptors.request.use(
    (config) => {
         const token = ""
        if (token) {
            // config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['Content-Type'] = 'application/json';
        }

        return config
    },
    (error) => {

        return Promise.reject(error)
    }
)

AxiosConfig.interceptors.response.use(

    (response) => {
        return response
    },
    (error) => {

        return Promise.reject(error)
    }
)