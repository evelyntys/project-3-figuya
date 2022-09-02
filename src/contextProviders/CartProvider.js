import CartContext from "../context/CartContext";
// import axios from 'axios';
import React from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { checkAccessExpiry } from "../helpers/helper";

export default function CartProvider(props) {
    const [cartItems, setCartItems] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function checkLogin() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
            if (accessToken && refreshToken) {
                await checkAccessExpiry();
            }
            const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
            let cartResponse = await axios.get(url + "cart", {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
            let cart = cartResponse.data;
            console.log(cart)
            await setCartItems(cart);
            console.log(cartItems)
        }
        checkLogin();
    }, [])

    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
    const cartContext = {
        getState: () => {
            console.log(cartItems)
            return cartItems
        },
        getCart: async () => {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let cartResponse = await axios.get(url + "cart", {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
            let cart = cartResponse.data;
            await setCartItems(cart)
            return cartItems
        },
        addToCart: async (figureId, qty) => {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            console.log(accessToken)
            const addToast = toast.loading("Adding to cart");
            try {
                let cartResponse = await axios.get(url + "cart/" + figureId + "/add", {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    },
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
                } else {
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
        },
        removeItem: async (figureId) => {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let cartResponse = await axios.get(url + "cart/" + figureId + "/remove", {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
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
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            let customerResponse = await axios.get(url + "users/profile", {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
            let email = customerResponse.data.customer.email;
            let block_street = customerResponse.data.customer.block_street;
            let unit = customerResponse.data.customer.unit;
            let postal = customerResponse.data.customer.postal;
            console.log(customerResponse.data.customer);
            return [email, block_street, unit, postal];
        },
        changeQuantity: async (figureId, newQuantity) => {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            let updateResponse = await axios.post(url + "cart/" + figureId + "/quantity/update", {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                },
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