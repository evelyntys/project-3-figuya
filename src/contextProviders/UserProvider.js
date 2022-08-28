import TokenContext from "../context/UserContext";
import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";


export default class UserProvider extends React.Component {
    state = {
        loggedIn: false,
        first_name: "",
        last_name: "",
        user: "",
    }

    async componentDidMount() {
        if (localStorage.getItem('refreshToken')) {
            await this.setState({
                loggedIn: true,
                first_name: JSON.parse(localStorage.getItem('first_name')),
                last_name: JSON.parse(localStorage.getItem('last_name'))
            })
        };
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        let decoded = jwt_decode(accessToken);
        let currentDate = new Date();
        if (decoded.exp * 1000 < currentDate.getTime()) {
            const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
            return axios.post("https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/users/refresh", {
                refreshToken
            }).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
                    axios.defaults.headers.common['Authorization'] = 'Bearer' + res.data.accessToken;
                }
            })
        }

    }

    render() {
        const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
        // const navigate = useNavigate();
        const userContext = {
            login: async (user, password) => {
                try {
                    let loginResponse = await axios.post(url + "users/login", {
                        user,
                        password
                    });
                    let tokenData = loginResponse.data;
                    await localStorage.setItem('accessToken', JSON.stringify(tokenData.accessToken));
                    await localStorage.setItem('refreshToken', JSON.stringify(tokenData.refreshToken));
                    await localStorage.setItem('first_name', JSON.stringify(tokenData.first_name));
                    await localStorage.setItem('last_name', JSON.stringify(tokenData.last_name));
                    await this.setState({
                        loggedIn: true,
                        first_name: tokenData.first_name,
                        last_name: tokenData.last_name
                    });
                    return (this.state.first_name + " " + this.state.last_name)
                } catch (e) {
                    console.log("there =>")
                    return false
                }
            },
            logout: async () => {
                let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
                let logoutResponse = await axios.post(url + "users/logout", {
                    refreshToken
                });
                console.log(logoutResponse.data);
                await localStorage.removeItem('accessToken');
                await localStorage.removeItem('refreshToken');
                await this.setState({
                    loggedIn: false
                });
            },
            getUserState: () => {
                return this.state.loggedIn
            },
            getName: () => {
                return this.state.first_name
            },
            getProfile: async () => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let userProfileResponse = await axios.get(url + "users/profile");
                await this.setState({
                    user: userProfileResponse.data
                });
                return userProfileResponse.data
            }
        }
        return (
            <UserContext.Provider value={userContext}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}