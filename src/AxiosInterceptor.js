import axios from 'axios';

const customAxios = axios.create({
    baseURL: "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
});

const requestHandle = request => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    console.log('hi')
    request.headers.Authorization = "Bearer " + accessToken;
    return request
};

const responseHandle = response => {
    // if (response.status == 403) {
    //     console.log('there')
    //     const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    //     return axios.post("https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/users/refresh", {
    //         refreshToken
    //     }).then(res => {
    //         if (res.status === 200) {
    //             localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
    //             axios.defaults.headers.common['Authorization'] = 'Bearer' + JSON.parse(res.data.accessToken);
    //         }
    //     })
    // }
    return response
};

const errorHandler = error => {
    console.log('here')
    if (error.response.status == 403) {
        console.log('there')
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        return axios.post("https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/users/refresh", {
            refreshToken
        }).then(res => {
            if (res.status === 200) {
                localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
                axios.defaults.headers.common['Authorization'] = 'Bearer' + res.data.accessToken;
            }
        })
    }
    return Promise.reject(error);
}

customAxios.interceptors.request.use(
    (request) => requestHandle(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandle(response),
    (error) => errorHandler(error)
);

export default customAxios;