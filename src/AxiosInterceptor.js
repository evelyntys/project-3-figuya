import axios from 'axios';

const customAxios = axios.create({
    baseURL: "https://etys-figuya-express.herokuapp.com/api/"
});

export default customAxios;