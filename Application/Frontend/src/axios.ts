import axios from 'axios';

const backendRoute: string = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendRoute;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers["Accept"] = "application/json";
axios.defaults.headers["Content-Type"] = "application/json";

export default axios;