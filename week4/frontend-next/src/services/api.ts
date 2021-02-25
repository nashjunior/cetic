import axios from "axios";

const api = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_URL_API_PORT}`
})

export default api;