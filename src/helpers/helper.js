import jwt_decode from "jwt-decode";
import axios from 'axios';

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
    } else {
        console.log('token valid')
    };
}