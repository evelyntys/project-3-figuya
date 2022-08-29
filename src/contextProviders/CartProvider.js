import CartContext from "../context/CartContext";
// import axios from 'axios';
import React from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";

export default class CartProvider extends React.Component {
    state = {
        cartItems: []
    }

    async componentDidMount() {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        let decoded = jwt_decode(accessToken);
        let currentDate = new Date();
        let newAccessToken = "";
        console.log(decoded);
        if (decoded.exp * 1000 < currentDate.getTime()) {
            const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
            return axios.post("https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/users/refresh", {
                refreshToken
            }).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
                    newAccessToken = res.data.accessToken;
                }
            })
        };
        const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        let cartResponse = await axios.get(url + "cart");
        let cart = cartResponse.data;
        this.setState({
            cartItems: cart
        })
    }

    render() {
        const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
        const cartContext = {
            getState: () => {
                return this.state.cartItems
            },
            getCart: async () => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                // console.log(accessToken);
                let cartResponse = await axios.get(url + "cart");
                let cart = cartResponse.data;
                // console.log(cart);
                await this.setState({
                    cartItems: cart
                })
                return this.state.cartItems
            },
            // getCart: () => {
            //     return this.state.cartItems
            // },
            addToCart: async (figureId, qty) => {
                // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const addToast = toast.loading("Adding to cart");
                // await cartContext.addToCart(figureId, 1);
                let cartResponse = await axios.get(url + "cart/" + figureId + "/add", {
                    params: {
                        quantity: qty
                    }
                });
                let newCart = cartResponse.data.cart;
                await this.setState({
                    cartItems: newCart
                });
                toast.update(addToast, {
                    render: 'Added to cart',
                    type: "success",
                    isLoading: false,
                    autoClose: 1000
                })
                return true
                // return this.state.cartItems
            },
            removeItem: async (figureId) => {
                // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let cartResponse = await axios.get(url + "cart/" + figureId + "/remove");
                let newCart = cartResponse.data.cart;
                await this.setState({
                    cartItems: newCart
                });
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
                {this.props.children}
            </CartContext.Provider>
        )
    }
}