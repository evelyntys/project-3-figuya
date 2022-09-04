import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import UserContext from '../context/UserContext';


export default function MobileNav() {
    const userContext = React.useContext(UserContext);
    const navigate = useNavigate();
    const [cartItems, setCartItems] = React.useState([]);
    let userCart = userContext.getCart();

    React.useEffect(() => {
        let cart = userContext.getCart();
        console.log(cart)
        setCartItems(cart);
    }, [])

    React.useEffect(() => {
        let cart = userContext.getCart();
        setCartItems(cart);
    }, [userCart])

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

    const orders = async () => {
        navigate("/orders")
    }

    const cart = async () => {
        navigate("/cart")
    };

    const login = async () => {
        navigate("/login")
    }

    return (
        <div className="bottom-nav container-fluid d-block d-lg-none d-flex justify-content-evenly">
            {!userContext.getUserState() ? <button className="btn mob-nav" onClick={home}><i class="bi bi-house-door-fill"></i></button> : ""}
            <button className="btn mob-nav" onClick={products}><i class="bi bi-shop"></i></button>
            {userContext.getUserState() ?
                <React.Fragment>
                    <button className="btn mob-nav position-relative" onClick={cart}><i class="bi bi-cart4"></i>
                        {
                            userContext.getUserState() ? (
                                cartItems.length > 0 ? (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>) : null) : null
                        }</button>
                    <button className="btn mob-nav" onClick={profile}><i class="bi bi-person-circle"></i></button>
                    <button className="btn mob-nav" onClick={orders}><i class="bi bi-receipt"></i></button>
                    <button className="btn mob-nav" onClick={Logout}><i class="bi bi-box-arrow-right"></i></button>
                </React.Fragment>
                :
                <React.Fragment>
                    <button className="btn mob-nav" onClick={login}><i class="bi bi-person-circle"></i></button>
                </React.Fragment>}
        </div>
    )
}