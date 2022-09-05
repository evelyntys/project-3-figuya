import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import '../App.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UserContext from '../context/UserContext';


export default function NavigationBar() {
    const userContext = React.useContext(UserContext);
    const user = userContext.getName();
    let userCart = userContext.getCart();
    const [cart, setCart] = React.useState(userCart);

    useEffect(() => {
        let cart = userContext.getCart();
        console.log(cart)
        setCart(cart);
    }, [])

    useEffect(() => {
        let cart = userContext.getCart();
        setCart(cart);
    }, [userCart])

    return (

        <Navbar collapseOnSelect expand="lg" className="navbar-color">
            <div className="container-fluid">
                <Navbar.Brand className="mx-auto m-lg-0" as={NavLink} to="/">
                    <img src={require("../images/logo.png")} style={{ "height": "40px" }} className="mx-2" alt="logo" />
                    FIGU屋
                </Navbar.Brand>
                <div className="d-none d-lg-block">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="d-none" />
                    <Navbar.Collapse className="d-none d-lg-block" id="responsive-navbar-nav">
                        <Nav className="ms-auto me-5">
                            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                            {userContext.getUserState() ?
                                <React.Fragment>
                                    <Nav.Link as={NavLink} to="/cart" className="position-relative mx-2">Cart
                                        {
                                            userContext.getUserState() ? (
                                                cart.length > 0 ? (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {cart.length}
                                                </span>) : null) : null
                                        }
                                    </Nav.Link>
                                    <img className="ms-2" src={require("../images/user.png")} alt="cat user" style={{ "height": "30px" }} />
                                    <NavDropdown title={user} id="collasible-nav-dropdown">
                                        <NavDropdown.Item as={NavLink} to="/profile" onClick={() => userContext.getProfile()}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/orders">
                                            Orders
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} onClick={() => userContext.logout()} to="/login">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </React.Fragment>
                                : <Nav.Link as={NavLink} to="/login">Login/Register</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </div>
        </Navbar>
    )
}