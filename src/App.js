import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

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
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Register from './pages/Register';
import axios from 'axios';
import UserContext from './context/UserContext';
import UserProvider from './contextProviders/UserProvider';
import SingleProduct from './pages/SingleProduct';


export default class App extends React.Component {
  render() {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
    return (
      <React.Fragment>
        <Router>
          <UserProvider>
            <CartProvider>
              <NavigationBar />
              <Routes>
                <Route path="/" element={<Login url={url} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={
                  <ProductProvider>
                    <Products />
                  </ProductProvider>} />
                <Route path="/cart" element={
                  <Cart url={url} />
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<OrderProvider>
                  <Orders />
                </OrderProvider>
                } />
                <Route path="/register" element={<Register url={url} />} />
                <Route path="/products/:figureId" element=
                {<ProductProvider>
                <SingleProduct/>
                </ProductProvider>
                }/>
              </Routes>
            </CartProvider>
          </UserProvider>
        </Router>
      </React.Fragment>
    )
  }
}