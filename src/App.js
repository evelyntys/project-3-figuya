import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orders from './components/Orders';
import Login from './components/Login';
import ProductProvider from './contextProviders/ProductProvider';
import CartProvider from './contextProviders/CartProvider';
import OrderProvider from './contextProviders/OrderProvider';
import NavigationBar from './components/NavBar';
import Products from './components/Products';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Register from './components/Register';
import UserProvider from './contextProviders/UserProvider';
import SingleProduct from './components/SingleProduct';
import Landing from './components/Landing';
import CancelCheckout from './components/CancelCheckout';
import SuccessCheckout from './components/SuccessCheckout';
import MobileNav from './components/MobileNav';
import { CheckRefreshExpiry } from './helpers/helper';


export default class App extends React.Component {
  async componentDidMount() {
    await CheckRefreshExpiry();
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <ProductProvider>
            <CartProvider>
              <UserProvider>
                <OrderProvider>
                  <NavigationBar />
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products/:productId" element={<SingleProduct />} />
                    <Route path="/checkout/cancel" element={<CancelCheckout />} />
                    <Route path="/checkout/success" element={<SuccessCheckout />} />
                  </Routes>
                  <MobileNav />
                </OrderProvider>
              </UserProvider>
            </CartProvider>
          </ProductProvider>
        </Router>
      </React.Fragment >
    )
  }
}