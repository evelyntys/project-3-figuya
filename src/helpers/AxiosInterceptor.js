import axios from 'axios';

const customAxios = axios.create({
    baseURL: "https://project-3-express.onrender.com/api/"
});

export default customAxios;