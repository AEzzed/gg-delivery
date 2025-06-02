import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/gg/api/public/',
    timeout: 5000,
});