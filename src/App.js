import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
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
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log(accessToken);
    let cartResponse = await axios.get(url + "cart");
    let cart = cartResponse.data;
    await this.setState({
      cartItems: cart
    })
  }

  render() {
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

    const logout = async () => {
      let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
      let logoutResponse = await axios.post(url + "users/logout", {
        refreshToken
      });
      console.log(logoutResponse.data);
      await localStorage.removeItem('accessToken');
      await localStorage.removeItem('refreshToken');
      
    }


    return (
      <React.Fragment>
        <CartProvider>
          <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Container>
                <Navbar.Brand className="me-auto" as={NavLink} to="/">
                  <img src={require("./images/logo.png")} style={{ "height": "40px" }} />
                  FIGU屋
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                    <Nav.Link as={NavLink} to="/cart" className="position-relative">Cart
                      {this.state.cartItems.length ? <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {this.state.cartItems.length}
                        <span class="visually-hidden">unread messages</span>
                      </span> : null}
                    </Nav.Link>
                    <NavDropdown title="User" id="collasible-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/orders">
                        Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/register">
                        Register
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
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
              <Route path="/orders" element={ <OrderProvider>
              <Orders />
              </OrderProvider>
              } />
              <Route path="/register" element={<Register url={url} />} />
            </Routes>
          </Router>
        </CartProvider>
      </React.Fragment>
    )
  }
}