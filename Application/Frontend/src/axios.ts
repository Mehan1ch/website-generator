import axios from 'axios';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();
const backendRoute: string = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendRoute;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// Add CSRF token to headers
axios.interceptors.request.use(async (config) => {
    const token = cookies.get('XSRF-TOKEN'); // Read CSRF token from cookies
    if (token) {
        config.headers['X-XSRF-TOKEN'] = token;
    } else {
        // Fetch CSRF token if not already set
        await axios.get('/sanctum/csrf-cookie');
    }
    return config;
});

export default axios;