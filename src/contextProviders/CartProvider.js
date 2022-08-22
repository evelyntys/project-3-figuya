import CartContext from "../context/CartContext";
import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";
export default class CartProvider extends React.Component {
    state = {
        cartItems: []
    }

    // async componentDidMount() {
    //     const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
    //     let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    //     console.log(accessToken);
    //     let cartResponse = await axios.get(url + "cart");
    //     let cart = cartResponse.data;
    //     this.setState({
    //         cartItems: cart
    //     })
    // }
    render() {
        const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
        const cartContext = {
            getCart: async () => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                // console.log(accessToken);
                let cartResponse = await axios.get(url + "cart");
                let cart = cartResponse.data;
                // console.log(cart);
                return cart
            },
            // getCart: () => {
            //     return this.state.cartItems
            // },
            addToCart: async (figureId) => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let cartResponse = await axios.get(url + "cart/" + figureId + "/add", {
                    params: {
                        quantity: 1
                    }
                });
                let newCart = cartResponse.data.cart;
                // await this.setState({
                //     cartItems: newCart
                // });
                return newCart;
                // return this.state.cartItems
            },
            removeItem: async (figureId) => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let cartResponse = await axios.get(url + "cart/" + figureId + "/remove");
                let newCart = cartResponse.data.cart;
                await this.setState({
                    cartItems: newCart
                });
                // return this.state.cartItems;
            },
            getTotal: (cart) => {
                let total = 0;
                for(let each of cart){
                    total += (each.figure.cost * each.quantity)
                };
                return ((total/100).toFixed(2))
            },
            getAddress: async () => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let customerResponse = await axios.get(url + "users/profile");
                let email = customerResponse.data.customer.email;
                let block_street = customerResponse.data.customer.block_street;
                let unit = customerResponse.data.customer.unit;
                let postal = customerResponse.data.customer.postal;
                console.log(customerResponse.data.customer);
                return [email, block_street, unit, postal];
            },
            changeQuantity: async (figureId, newQuantity) => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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