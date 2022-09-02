import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export async function checkAccessExpiry() {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    let decoded = jwt_decode(accessToken);
    let currentDate = new Date();
    console.log(decoded);
    if (decoded.exp * 1000 < currentDate.getTime()) {
        console.log("token has expired")
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        const newAccessTokenResponse = await axios.post("https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/users/refresh", {
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
    let navigate = useNavigate();
    let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    let decoded = jwt_decode(refreshToken);
    let currentDate = new Date();
    console.log(decoded);
    if (decoded.exp * 1000 < currentDate.getTime()) {
        let logoutResponse = await axios.post("https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/users/logout", {
            refreshToken
        });
        console.log(logoutResponse.data);
        navigate("/profile")
        await localStorage.removeItem('accessToken');
        await localStorage.removeItem('refreshToken');
        await localStorage.removeItem('first_name');
        await localStorage.removeItem('last_name');
    } else {
        console.log('token valid')
        checkAccessExpiry();
    };
}