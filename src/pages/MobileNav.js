import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import Profile from './Profile';
import Register from './Register';
import axios from 'axios';
import '../App.css'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Orders from './Orders';
import Login from './Login';
import ProductContext from '../context/ProductContext';
import ProductProvider from '../contextProviders/ProductProvider';
import CartProvider from '../contextProviders/CartProvider';
import OrderProvider from '../contextProviders/OrderProvider';
import CartContext from '../context/CartContext';
import NavBar from '../pages/NavBar';
import UserContext from '../context/UserContext';


export default function MobileNav() {
    const url = "https://etys-figuya-express.herokuapp.com/api/"
    const cartContext = React.useContext(CartContext);
    const userContext = React.useContext(UserContext);
    const navigate = useNavigate();

    const Logout = async () => {
        await userContext.logout();
        navigate("/login")
    };

    const home = async () => {
        navigate("/")
    };

    const products = async () => {
        navigate("/products")
    };

    const profile = async () => {
        navigate("/profile")
    };

    const cart = async () => {
        navigate("/cart")
    };

    return (
        <div className="bottom-nav container-fluid d-block d-lg-none d-flex justify-content-evenly">
            <button className="btn mob-nav" onClick={home}><i class="bi bi-house-door-fill"></i></button>
            <button className="btn mob-nav" onClick={products}><i class="bi bi-shop"></i></button>
            <button className="btn mob-nav position-relative" onClick={cart}><i class="bi bi-cart4"></i>
                {
                    userContext.getUserState() ? (
                        cartContext.getState().length > 0 ? (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartContext.getState().length}
                            <span className="visually-hidden">unread messages</span>
                        </span>) : null) : null
                }</button>
            <button className="btn mob-nav" onClick={profile}><i class="bi bi-person-circle"></i></button>
            <button className="btn mob-nav" onClick={Logout}><i class="bi bi-box-arrow-right"></i></button>
        </div>
    )
}