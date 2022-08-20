import React from 'react';
import axios from 'axios';

export default function Login(props) {
    const [loginState, setLoginState] = React.useState({
        user: "",
        password: ""
    });

    const url = props.url;
    const checkoutUrl = url + "checkout";

    const updateFormField = (e) => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    const Login = async () => {
        let user = loginState.user;
        let password = loginState.password;
        let loginResponse = await axios.post(url + "users/login", {
            user,
            password
        });
        let tokenData = loginResponse.data;
        await localStorage.setItem('accessToken', JSON.stringify(tokenData.accessToken));
        await localStorage.setItem('refreshToken', JSON.stringify(tokenData.refreshToken));
        console.log(loginResponse.data);
        console.log(localStorage.getItem('accessToken'));
    };

    const GetNewToken = async () => {
        let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        let refreshResponse = await axios.post(url + "users/refresh", {
            refreshToken
        });
        console.log(refreshResponse.data);
        let newToken = refreshResponse.data.accessToken;
        await localStorage.setItem('accessToken', JSON.stringify(newToken));
    }

    const GetProfile = async () => {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        console.log(accessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        let profileResponse = await axios.get(url + "users/profile");
        console.log(profileResponse.data)
    };

    const Checkout = async () => {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'))
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        let checkout = await axios.get(url + "checkout", {
            customer_email: "customer@email.com",
            block_street: "testing block",
            unit: "testing unit",
            postal: "testing postal"
        });
        console.log(checkout.data)
    }

    return (
        <React.Fragment>
            <div className="container">
                <h1>Login</h1>
                <div>
                <div>
                    <label>Username/Email:</label>
                    <input type="text" name="user" className="form-control" value={loginState.user} onChange={updateFormField} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" className="form-control" value={loginState.password} onChange={updateFormField} />
                </div>
                <button className="btn btn-dark" onClick={Login}>Login</button>
            </div>
            <button className="btn btn-primary" onClick={GetProfile}>Profile</button>
            <button className="btn btn-danger" onClick={Checkout}>Checkout</button>
            <button className="btn btn-warning" onClick={GetNewToken}>Refresh Token</button>
            </div>
        </React.Fragment>
    )
}