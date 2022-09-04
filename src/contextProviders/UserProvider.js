import TokenContext from "../context/UserContext";
import React, { useEffect } from 'react';
import axios from '../AxiosInterceptor';
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import { checkAccessExpiry } from "../helpers/helper";
import CartContext from "../context/CartContext";


export default function UserProvider(props) {
    const cartContext = React.useContext(CartContext);
    const [defaultStatus, setDefaultStatus] = React.useState({
        loggedIn: false,
        first_name: "",
        last_name: "",
        user: "",
    });
    const cartFromContext = cartContext.getState();
    const [cart, setCart] = React.useState(cartFromContext);
    const navigate = useNavigate();
    const [pwErrors, setPwErrors] = React.useState({
        password: "",
        confirm_password: ""
    })

    useEffect(() => {
        async function CheckLogin() {
            if (localStorage.getItem('refreshToken')) {
                setDefaultStatus({
                    ...defaultStatus,
                    loggedIn: true,
                    first_name: JSON.parse(localStorage.getItem("first_name")),
                    last_name: JSON.parse(localStorage.getItem('last_name'))
                })
                let cart = cartContext.getCart();
                setCart(cart);
            };
            await checkAccessExpiry();
        }
        CheckLogin();
    }, []);

    // useEffect(() => {
    //     async function CheckLogin() {
    //         if (localStorage.getItem('refreshToken')) {
    //             setDefaultStatus({
    //                 ...defaultStatus,
    //                 loggedIn: true,
    //                 first_name: JSON.parse(localStorage.getItem("first_name")),
    //                 last_name: JSON.parse(localStorage.getItem('last_name'))
    //             })
    //             console.log(defaultStatus);
    //             let cart = cartContext.getCart();
    //             setCart(cart);
    //         };
    //         await checkAccessExpiry();
    //     }
    //     CheckLogin();
    // }, [defaultStatus.loggedIn])

    useEffect(() => {
        // async function CheckLogin() {
            if (localStorage.getItem('refreshToken')) {
                setDefaultStatus({
                    ...defaultStatus,
                    loggedIn: true,
                    first_name: JSON.parse(localStorage.getItem("first_name")),
                    last_name: JSON.parse(localStorage.getItem('last_name'))
                })
            //     console.log(defaultStatus);
            //     let cart = cartContext.getCart();
            //     setCart(cart);
            // };
            // await checkAccessExpiry();
            setCart(cartFromContext)
            // console.log(cart)
        }
        // CheckLogin();
    }, [cartFromContext])

    let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    const userContext = {
        login: async (user, password) => {
            try {
                let loginResponse = await axios.post("users/login", {
                    user,
                    password
                });
                let tokenData = loginResponse.data;
                await localStorage.setItem('accessToken', JSON.stringify(tokenData.accessToken));
                await localStorage.setItem('refreshToken', JSON.stringify(tokenData.refreshToken));
                await localStorage.setItem('first_name', JSON.stringify(tokenData.first_name));
                await localStorage.setItem('last_name', JSON.stringify(tokenData.last_name));
                setDefaultStatus({
                    ...defaultStatus,
                    loggedIn: true,
                    first_name: tokenData.first_name,
                    last_name: tokenData.last_name
                });
                let cart = await cartContext.getCart();
                setCart(cart)
                return (tokenData.first_name + " " + tokenData.last_name)
            } catch (e) {
                console.log("there =>")
                return false
            }
        },
        logout: async () => {
            let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
            let logoutResponse = await axios.post("users/logout", {
                refreshToken
            });
            console.log(logoutResponse.data);
            await localStorage.removeItem('accessToken');
            await localStorage.removeItem('refreshToken');
            await localStorage.removeItem('first_name');
            await localStorage.removeItem('last_name');
            setDefaultStatus({
                ...defaultStatus,
                loggedIn: false
            });
        },
        getUserState: () => {
            return defaultStatus.loggedIn
            console.log(defaultStatus.loggedIn)
        },
        getName: () => {
            return defaultStatus.first_name + " " + defaultStatus.last_name
        },
        getProfile: async () => {
            if (localStorage.getItem('refreshToken')) {
                let accessToken = await checkAccessExpiry();
                let userProfileResponse = await axios.get("users/profile", {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
                setDefaultStatus({
                    ...defaultStatus,
                    user: userProfileResponse.data
                })
                let cart = cartContext.getCart();
                setCart(cart);
                return userProfileResponse.data
            };
        },
        getCart: () => {
            return cart
        },
        updatePassword: async (password, confirm_password) => {
            let changePWToast = toast.loading("Updating your password");
            let accessToken = await checkAccessExpiry();
            try {
                let updateResponse = await axios.post('users/password/update', {
                    password,
                    confirm_password
                }, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
                console.log(updateResponse.data);
                setPwErrors({
                    ...pwErrors,
                    password: "",
                    confirm_password: ""
                })
                toast.update(changePWToast, {
                    render: "Password updated successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                })
            } catch (e) {
                console.log(e);
                setPwErrors({
                    ...pwErrors,
                    password: e.response.data.password,
                    confirm_password: e.response.data.confirm_password
                })
                toast.update(changePWToast, {
                    render: "Please check the fields again",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000
                })
            }
        },
        getPWErrors: () => {
            return pwErrors
        }
    }
    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}