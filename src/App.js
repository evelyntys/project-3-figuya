import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// import CartProvider from './contextProviders/CartProvider';
// import NavigationBar from './pages/NavBar';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import Orders from './pages/Orders';
import Login from './pages/Login';
import ProductContext from './context/ProductContext';
import ProductProvider from './contextProviders/ProductProvider';
import CartProvider from './contextProviders/CartProvider';
import OrderProvider from './contextProviders/OrderProvider';
import CartContext from './context/CartContext';
import NavigationBar from './pages/NavBar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Register from './pages/Register';
import axios from 'axios';
import UserContext from './context/UserContext';
import UserProvider from './contextProviders/UserProvider';
import SingleProduct from './pages/SingleProduct';
import Landing from './pages/Landing';
import CancelCheckout from './pages/CancelCheckout';
import SuccessCheckout from './pages/SuccessCheckout';
import MobileNav from './pages/MobileNav';


export default class App extends React.Component {
  render() {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
    return (
      <React.Fragment>
        <UserProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <Router>
                  <NavigationBar />
                  <Routes>
                    <Route path="/" element={<Landing url={url} />} />
                    <Route path="/login" element={<Login url={url} />} />
                    <Route path="/products" element={
                      <ProductProvider>
                        <Products />
                      </ProductProvider>} />
                    <Route path="/cart" element={
                      <Cart url={url} />
                    } />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={
                      <Orders />

                    } />
                    <Route path="/register" element={<Register url={url} />} />
                    <Route path="/products/:productId" element=
                      {
                        <SingleProduct />
                      } />
                    <Route path="/checkout/cancel" element={<CancelCheckout />} />
                    <Route path="/checkout/success" element={<SuccessCheckout />} />
                  </Routes>
                  <MobileNav />
                </Router>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </UserProvider>
      </React.Fragment>
    )
  }
}