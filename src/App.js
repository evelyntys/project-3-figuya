import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Register from './pages/Register';
import axios from 'axios';
import './App.css'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Orders from './pages/Orders';
import Login from './pages/Login';
import ProductContext from './context/ProductContext';
import ProductProvider from './contextProviders/ProductProvider';
import CartProvider from './contextProviders/CartProvider';
import OrderProvider from './contextProviders/OrderProvider';
import CartContext from './context/CartContext';
import NavigationBar from './pages/NavBar';

export default class App extends React.Component {
  // state = {
  //   products: []
  // };

  // async componentDidMount() {
  //   const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
  //   let response = await axios.get(url + "products");
  //   this.setState({
  //     products: response.data
  //   })
  // };
  state = {
    cartItems: []
  };

  async componentDidMount() {
    let cart = await CartContext.getCart();
    this.setState({
      cartItems: CartContext
    })
    // <CartContext.Consumer>
    //   {context => { this.setState({ cartItems: context.getCart() }) }}
    // </CartContext.Consumer>
    // const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
    // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    // console.log(accessToken);
    // let cartResponse = await axios.get(url + "cart");
    // let cart = cartResponse.data;
    // await this.setState({
    //   cartItems: cart
    // })
  }

  componentDidUpdate(){
    <CartContext.Consumer>
    {context => { 
      let cart = context.getCart()
      if (this.state.cartItems !== cart)
      this.setState({ cartItems: cart }) }}
  </CartContext.Consumer>
  }

  render() {
    <CartContext.Consumer>
      {context => { this.setState({ cartItems: context.getCart() }) }}
    </CartContext.Consumer>
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
    // const productContext = {
    //   getProducts: () => {
    //     return this.state.products
    //   },
    //   getProductsAxios: async () => {
    //     let response = await axios.get(url + "products");
    //     return response.data
    //   }
    // }

    // const CartContext = React.useContext(CartContext)



    return (
      <React.Fragment>
        <CartProvider>
          <NavigationBar/>
        </CartProvider>
      </React.Fragment>
    )
  }
}