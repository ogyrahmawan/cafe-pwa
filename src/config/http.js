import axios from "axios";

const API_URL = process.env.API_URL

axios.defaults.baseURL = API_URL;

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default axios;