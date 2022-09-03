import jwt_decode from "jwt-decode";
import axios from '../AxiosInterceptor';
import { Link } from "react-router-dom";

export async function checkAccessExpiry() {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    let decoded = jwt_decode(accessToken);
    let currentDate = new Date();
    console.log(decoded);
    if (decoded.exp * 1000 < currentDate.getTime()) {
        console.log("token has expired")
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        const newAccessTokenResponse = await axios.post("users/refresh", {
            refreshToken
        });
        const newAccessToken = newAccessTokenResponse.data.accessToken;
        await localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
        return newAccessToken
    } else {
        console.log('token valid')
        return accessToken
    };
}

export async function CheckRefreshExpiry() {
    let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    let decoded = jwt_decode(refreshToken);
    let currentDate = new Date();
    console.log(decoded);
    if (decoded.exp * 1000 < currentDate.getTime()) {
        let logoutResponse = await axios.post("users/logout", {
            refreshToken
        });
        console.log(logoutResponse.data);
        <Link to="/login" />
        await localStorage.removeItem('accessToken');
        await localStorage.removeItem('refreshToken');
        await localStorage.removeItem('first_name');
        await localStorage.removeItem('last_name');
    } else {
        console.log('token valid')
        checkAccessExpiry();
    };
}