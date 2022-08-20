import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import './App.css'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Orders from './pages/Orders';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
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
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders/>} />
          </Routes>
        </Router>

      </React.Fragment>
    )
  }
}