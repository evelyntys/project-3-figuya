import CartContext from "../context/CartContext";
// import axios from 'axios';
import React from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function CartProvider(props) {
    const [cartItems, setCartItems] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function checkLogin() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
            if (accessToken && refreshToken) {
                let decoded = jwt_decode(accessToken);
                let currentDate = new Date();
                console.log(decoded);
                if (decoded.exp * 1000 < currentDate.getTime()) {
                    console.log("cart provider expired")
                    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
                    const newAccessTokenResponse = await axios.post("https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/users/refresh", {
                        refreshToken
                    });
                    const newAccessToken = newAccessTokenResponse.data.accessToken;
                    console.log(JSON.stringify(newAccessToken));
                    console.log(newAccessToken)
                    console.log(decoded.exp)
                    localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                } else {
                    console.log(accessToken)
                    console.log('cart provider here')
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                }
                const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
                let cartResponse = await axios.get(url + "cart");
                let cart = cartResponse.data;
                await setCartItems(cart);
            }
        }
        checkLogin();
    }, [])

    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
    const cartContext = {
        getState: () => {
            return cartItems
        },
        getCart: async () => {
            // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            // console.log(accessToken);
            let cartResponse = await axios.get(url + "cart");
            let cart = cartResponse.data;
            // console.log(cart);
            await setCartItems(cart)
            return cartItems
        },
        // getCart: () => {
        //     return this.state.cartItems
        // },
        addToCart: async (figureId, qty) => {
            // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            const addToast = toast.loading("Adding to cart");
            // await cartContext.addToCart(figureId, 1);
            try {
                let cartResponse = await axios.get(url + "cart/" + figureId + "/add", {
                    params: {
                        quantity: qty
                    }
                });
                let newCart = cartResponse.data.cart;
                await setCartItems(newCart)
                toast.update(addToast, {
                    render: 'Added to cart',
                    type: "success",
                    isLoading: false,
                    autoClose: 1000
                })
            } catch (e) {
                console.log(e);
                console.log(e.response.data)
                let errorMessage = ""
                if (e.request.status == 400) {
                    errorMessage = "There is not enough stock quantity"
                } else if (e.request.status == 403) {
                    errorMessage = "Please try again"
                } else if (e.response.data == "Please ensure that you are logged in.") {
                    errorMessage = "Please login to add to cart"
                }
                toast.update(addToast, {
                    render: errorMessage,
                    type: "error",
                    isLoading: false,
                    autoClose: 1000
                })
                if (errorMessage = "Please login to add to cart") {
                    setTimeout(function () {
                        navigate("/login");
                    }, 2000)
                }
            }
            // return true
            // return this.state.cartItems
        },
        removeItem: async (figureId) => {
            // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            let cartResponse = await axios.get(url + "cart/" + figureId + "/remove");
            let newCart = cartResponse.data.cart;
            await setCartItems(newCart)
            return newCart
            // navigate(cart);
        },
        getTotal: (cart) => {
            let total = 0;
            for (let each of cart) {
                total += (each.figure.cost * each.quantity)
            };
            return ((total / 100).toFixed(2))
        },
        getAddress: async () => {
            // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            let customerResponse = await axios.get(url + "users/profile");
            let email = customerResponse.data.customer.email;
            let block_street = customerResponse.data.customer.block_street;
            let unit = customerResponse.data.customer.unit;
            let postal = customerResponse.data.customer.postal;
            console.log(customerResponse.data.customer);
            return [email, block_street, unit, postal];
        },
        changeQuantity: async (figureId, newQuantity) => {
            // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            let updateResponse = await axios.post(url + "cart/" + figureId + "/quantity/update", {
                newQuantity: newQuantity
            });
            console.log(updateResponse.data);
            let updatedCart = updateResponse.data.cart;
            return (updatedCart)
        }
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}