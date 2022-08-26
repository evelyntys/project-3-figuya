import TokenContext from "../context/UserContext";
import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";


export default class UserProvider extends React.Component {
    state = {
        loggedIn: false,
        first_name: "",
        last_name: ""
    }

    async componentDidMount() {
        if (localStorage.getItem('refreshToken')) {
            await this.setState({
                loggedIn: true,
                first_name: JSON.parse(localStorage.getItem('first_name')),
                last_name: JSON.parse(localStorage.getItem('last_name'))
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
                    return true
                    console.log("here => ")
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
            }
        }
        return (
            <UserContext.Provider value={userContext}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}