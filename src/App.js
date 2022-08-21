import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import axios from 'axios';
import './App.css'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Orders from './pages/Orders';
import Login from './pages/Login';
import ProductContext from './context/ProductContext';

export default class App extends React.Component {
  state = {
    products: []
  };

  async componentDidMount() {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
    let response = await axios.get(url + "products");
    this.setState({
      products: response.data
    })
  };

  render() {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
    const productContext = {
      getProducts: () => {
        return this.state.products
      },
      getProductsAxios: async () => {
        let response = await axios.get(url + "products");
        return response.data
      }
    }

    return (
      <React.Fragment>
        <ProductContext.Provider value={productContext}>
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
                    <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
                    <NavDropdown title="User" id="collasible-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/orders">
                        Orders
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
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
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Router>
        </ProductContext.Provider>
      </React.Fragment>
    )
  }
}