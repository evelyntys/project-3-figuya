import React, { useEffect } from 'react';
import CartContext from '../context/CartContext';
import axios from "axios";
import { Button, Modal } from 'react-bootstrap';
import AddressModal from './AddressModal';
import ProductContext from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default function Cart(props) {
    const cartContext = React.useContext(CartContext);
    const [cart, setCart] = React.useState([]);
    const [quantity, setQuantity] = React.useState([]);
    const [cartTotal, setCartTotal] = React.useState([]);
    const productContext = React.useContext(ProductContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function setData() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let decoded = jwt_decode(accessToken);
            let currentDate = new Date();
            console.log(decoded);
            if (decoded.exp * 1000 < currentDate.getTime()) {
                const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
                const newAccessTokenResponse = await axios.post("https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/users/refresh", {
                    refreshToken
                });
                const newAccessToken = newAccessTokenResponse.data.accessToken;
                console.log(JSON.stringify(newAccessToken));
                console.log(newAccessToken)
                console.log(decoded.exp)
                localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            } else {
                console.log(accessToken)
                console.log('here')
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            }
            const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
            let cartResponse = await axios.get(url + "cart");
            let cart = cartResponse.data;
            await setCart(cart);
            // for (let i=0; i<cartItems.length; i++){
            //     quantity[i] = cartItems[i].quantity;
            // }
            await setCartTotal(cartContext.getTotal(cart));
            for (let each of cart) {
                console.log(each.figure.id, each.quantity)
                quantity[each.figure.id] = each.quantity
            }
            // setQuantity(quantity)
        };
        setData();
    }, []);

    const updateQuantity = async (e) => {
        setQuantity({
            ...quantity,
            [e.target.name]: e.target.value
        });
        if (e.target.value) {
            let updatedCart = await cartContext.changeQuantity([e.target.name], e.target.value);
            await setCartTotal(cartContext.getTotal(updatedCart));
        }

    };

    const increaseQuantity = async (e) => {
        setQuantity({
            ...quantity,
            [e.target.name]: quantity[e.target.name] + 1
        });
        if (quantity[e.target.name]) {
            let updatedCart = await cartContext.changeQuantity([e.target.name], quantity[e.target.name] + 1);
            await setCartTotal(cartContext.getTotal(updatedCart));
        }
    }

    const decreaseQuantity = async (e) => {
        if (quantity[e.target.name] > 1) {
            setQuantity({
                ...quantity,
                [e.target.name]: quantity[e.target.name] - 1
            })
        }
        if (quantity[e.target.name]) {
            let updatedCart = await cartContext.changeQuantity([e.target.name], quantity[e.target.name] - 1);
            await setCartTotal(cartContext.getTotal(updatedCart));
        }
    }

    const [checkoutDetails, setCheckOutDetails] = React.useState({
        customer_email: "",
        block_street: "",
        unit: "",
        postal: ""
    });
    const [selectAddress, setSelectAddress] = React.useState(0);

    const updateFormField = (e) => {
        setCheckOutDetails({
            ...checkoutDetails,
            [e.target.name]: e.target.value
        })
    }

    const updateSelect = async (e) => {
        await setSelectAddress(e.target.value);
        if (e.target.value === "1") {
            console.log('hi')
            let address = await cartContext.getAddress();
            console.log("here=> ", address);
            await setCheckOutDetails({
                ...checkoutDetails,
                customer_email: address[0],
                block_street: address[1],
                unit: address[2],
                postal: address[3]
            })
        } else {
            setCheckOutDetails({
                ...checkoutDetails,
                customer_email: "",
                block_street: "",
                unit: "",
                postal: ""
            })
        }
    };

    const removeFromCart = async (id) => {
        let newCart = await cartContext.removeItem(id);
        console.log(newCart);
        await setCart(newCart);
        await setCartTotal(cartContext.getTotal(newCart));
    }

    const Checkout = async () => {
        // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // console.log(accessToken);
        let checkoutResponse = await axios.post("checkout", {
            customer_email: checkoutDetails.customer_email,
            block_street: checkoutDetails.block_street,
            unit: checkoutDetails.unit,
            postal: checkoutDetails.postal
        });
        console.log(checkoutResponse.data);
        window.location.href = checkoutResponse.data.url
    };

    const showProduct = async (id) => {
        let product = await productContext.showProduct(id);
        navigate(`/products/${id}`)
    }

    return (
        <React.Fragment>
            <div className="container my-2">
                <h1>Your cart:</h1>
                {cart.length ?
                    <React.Fragment>
                        <div className="list-group my-2">
                            {cart.map(each => {
                                return (
                                    <React.Fragment>
                                        <div className="list-group-item d-none d-md-block">
                                            <div className="col-1 text-end d-block d-md-none">
                                                <button className="btn btn-sm" onClick={() => removeFromCart(each.figure.id)}><i class="bi bi-trash-fill"></i></button>
                                            </div>
                                            <div className="row">
                                                <div className="col-11 col-md-3">
                                                    <img src={each.figure.image_url} className="cart-img" />
                                                </div>
                                                <div className="col-12 col-md-8">
                                                    {each.figure.launch_status ? "" : <span className="badge bg-danger">PRE-ORDER</span>}
                                                    <h4 className="view-more" onClick={() => showProduct(each.figure.id)}>{each.figure.name}</h4>
                                                    <h6>${(each.figure.cost / 100).toFixed(2)}</h6>
                                                    <div className="container">
                                                        <button className="btn btn-sm qty-btn" name={each.figure.id} onClick={decreaseQuantity}><i class="bi bi-dash-circle-fill"></i></button>
                                                        <input type="text" className="form-control text-center" name={each.figure.id} value={quantity[each.figure.id]}
                                                            onChange={updateQuantity} style={{ "width": "50px", "display": "inline-block" }} />
                                                        <button className="btn btn-sm qty-btn" name={each.figure.id} onClick={increaseQuantity}><i class="bi bi-plus-circle-fill"></i></button>
                                                    </div>
                                                    <h6>{each.figure.quantity} remaining in stock</h6>
                                                </div>
                                                <div className="col-1 text-end d-none d-md-block">
                                                    <button className="btn btn-sm" onClick={() => removeFromCart(each.figure.id)}><i class="bi bi-trash-fill"></i></button>
                                                </div>
                                                <div className="d-flex justify-content-end align-items-end">
                                                    Subtotal: ${((each.figure.cost * quantity[each.figure.id]) / 100).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="list-group-item d-lg-none">
                                            <div className="row">
                                                <div className="col-3 pe-0">
                                                    <img src={each.figure.image_url} className="cart-img" />
                                                </div>
                                                <div className="col-8">
                                                    {each.figure.launch_status ? "" : <span className="badge bg-danger cart-preorder">PRE-ORDER</span>}
                                                    <p className="cart-name-mob text-center m-0 view-more" onClick={() => showProduct(each.figure.id)}>{each.figure.name}</p>
                                                    <p className="cart-cost-mob text-center m-0">${(each.figure.cost / 100).toFixed(2)}</p>
                                                    <div className="container text-center">
                                                        <button className="btn btn-sm qty-btn" name={each.figure.id} onClick={decreaseQuantity}><i class="bi bi-dash-circle-fill"></i></button>
                                                        <input type="text" className="form-control text-center" name={each.figure.id} value={quantity[each.figure.id]}
                                                            onChange={updateQuantity} style={{ "width": "50px", "display": "inline-block" }} />
                                                        <button className="btn btn-sm qty-btn" name={each.figure.id} onClick={increaseQuantity}><i class="bi bi-plus-circle-fill"></i></button>
                                                    </div>
                                                    <h6 className="text-center">{each.figure.quantity} remaining in stock</h6>
                                                </div>
                                                <div className="col-1 p-0 text-end d-block d-md-none">
                                                    <button className="btn btn-sm" onClick={() => removeFromCart(each.figure.id)}><i class="bi bi-trash-fill"></i></button>
                                                </div>
                                                <div className="d-flex justify-content-end align-items-end">
                                                    Subtotal: ${((each.figure.cost * quantity[each.figure.id]) / 100).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                        <div className="mob-content">
                        <div className="d-flex justify-content-end">
                            <h6>Total: {cartTotal}</h6>
                        </div>
                        <div className="d-flex justify-content-end">
                            <AddressModal customer_email={checkoutDetails.customer_email} block_street={checkoutDetails.block_street}
                                unit={checkoutDetails.unit} postal={checkoutDetails.postal} updateFormField={updateFormField}
                                Checkout={Checkout} selectAddress={selectAddress} updateSelect={updateSelect} />
                            {/* <button className="btn btn-danger text-end" onClick={Checkout}>Checkout</button> */}
                        </div>
                        </div>
                    </React.Fragment>
                    : <div>no items in your cart currently...</div>}
            </div>
        </React.Fragment>
    )
}