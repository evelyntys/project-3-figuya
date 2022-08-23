import axios from 'axios';

export default function AxiosInterceptor(){
const refreshToken = async () => {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
    let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    let refreshResponse = await axios.post(url + "users/refresh", {
        refreshToken
    });
    let newToken = refreshResponse.data.accessToken;
    await localStorage.setItem('accessToken', JSON.stringify(newToken));
    return newToken
}
const axiosInterceptorReq = axios.interceptors.request.use(
    (req) => {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        if (accessToken) {
            req.headers['Authorization'] = "Bearer " + accessToken
        };

    },
    (err) => {
        return Promise.reject(err)
    }
);

const axiosInterceptorRes = axios.interceptors.response.use(
    (res) => {
        if (res.status == 403) {
            res.headers['Authorization'] = "Bearer " + refreshToken();
        }
    }, (err) => {
        return Promise.reject(err);
    }
);
}
// export default { axiosInterceptorReq, axiosInterceptorRes }