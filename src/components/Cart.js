import React, { useEffect } from 'react';
import CartContext from '../context/CartContext';
import axios from "../helpers/AxiosInterceptor";
import AddressModal from './AddressModal';
import ProductContext from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { checkAccessExpiry } from '../helpers/helper';
import { toast, ToastContainer } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function Cart() {
    const cartContext = React.useContext(CartContext);
    const [cart, setCart] = React.useState([]);
    const [quantity, setQuantity] = React.useState([]);
    const [cartTotal, setCartTotal] = React.useState([]);
    const productContext = React.useContext(ProductContext);
    const navigate = useNavigate();
    const [loader, setLoader] = React.useState();
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));

    useEffect(() => {
        async function setData() {
            setLoader(true);
            accessToken = await checkAccessExpiry();
            let cartResponse = await axios.get("cart", {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
            let cart = cartResponse.data;
            await setCart(cart);
            await setCartTotal(cartContext.getTotal(cart));
            for (let each of cart) {
                quantity[each.figure.id] = each.quantity
            }
            setLoader(false)
        };
        setData();
    }, []);

    const updateQuantity = async (e) => {
        setQuantity({
            ...quantity,
            [e.target.name]: e.target.value
        })
        if (e.target.value) {
            try {
                let updatedCart = await cartContext.changeQuantity([e.target.name], e.target.value);
                await setCartTotal(cartContext.getTotal(updatedCart));
            } catch (e) {
                console.log(e);
            }
        }
    }

    const increaseQuantity = async (e) => {
        setQuantity({
            ...quantity,
            [e.target.getAttribute('name')]: parseInt(quantity[e.target.getAttribute('name')]) + 1
        });
        if (quantity[e.target.getAttribute('name')]) {
            let updatedCart = await cartContext.changeQuantity(e.target.getAttribute('name'), quantity[e.target.getAttribute('name')] + 1);
            console.log("increase, updated=>", updatedCart)
            await setCartTotal(cartContext.getTotal(updatedCart));
        }
    }

    const decreaseQuantity = async (e) => {
        if (quantity[e.target.getAttribute('name')] > 1) {
            setQuantity({
                ...quantity,
                [e.target.getAttribute('name')]: parseInt(quantity[e.target.getAttribute('name')]) - 1
            })
        }
        if (quantity[e.target.getAttribute('name')]) {
            try {
                let updatedCart = await cartContext.changeQuantity(e.target.getAttribute('name'), quantity[e.target.getAttribute('name')] - 1);
                console.log("decrease  qty => ", updatedCart);
                await setCartTotal(cartContext.getTotal(updatedCart));
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const increaseQuantityMob = async (e) => {
        setQuantity({
            ...quantity,
            [e.target.getAttribute('name')]: parseInt(quantity[e.target.getAttribute('name')]) + 1
        });
        if (quantity[e.target.getAttribute('name')]) {
            let updatedCart = await cartContext.changeQuantity(e.target.getAttribute('name'), quantity[e.target.getAttribute('name')] + 1);
            console.log("increase, updated=>", updatedCart)
            await setCartTotal(cartContext.getTotal(updatedCart));
        }
    }

    const decreaseQuantityMob = async (e) => {
        if (quantity[e.target.getAttribute('name')] > 1) {
            setQuantity({
                ...quantity,
                [e.target.getAttribute('name')]: parseInt(quantity[e.target.getAttribute('name')]) - 1
            })
        }
        if (quantity[e.target.getAttribute('name')]) {
            let updatedCart = await cartContext.changeQuantity([e.target.getAttribute('name')], quantity[e.target.getAttribute('name')] - 1);
            console.log("decrease  qty => ", updatedCart);
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
        const removeToast = toast.loading("Removing from cart");
        let newCart = await cartContext.removeItem(id);
        console.log(newCart);
        await setCart(newCart);
        await setCartTotal(cartContext.getTotal(newCart));
        toast.update(removeToast, {
            render: 'Removed from cart',
            type: 'success',
            isLoading: false,
            autoClose: 1000
        })
    }

    const Checkout = async () => {
        try {
            let accessToken = await checkAccessExpiry();
            console.log(accessToken);
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            // console.log(accessToken);
            let checkoutResponse = await axios.post("checkout", {
                customer_email: checkoutDetails.customer_email,
                block_street: checkoutDetails.block_street,
                unit: checkoutDetails.unit,
                postal: checkoutDetails.postal
            }, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            },);
            console.log(checkoutResponse.data);
            // let stripePromise = loadStripe(checkoutResponse.data.publishableKey);
            // const stripe = await stripePromise;
            // stripe.redirectToCheckout({sessionId: checkoutResponse.data.sessionId})
            window.location.href = checkoutResponse.data.url
        }
        catch (e) {
            console.log(e)
        }
    };

    const showProduct = async (id) => {
        let product = await productContext.showProduct(id);
        navigate(`/products/${id}`)
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="container my-2">
                <h1>Your cart:</h1>
                {!loader ?
                    <React.Fragment>
                        {cart.length ?
                            <React.Fragment>
                                <div className="list-group my-2">
                                    {cart.map((each, index) => {
                                        return (
                                            <React.Fragment key={'cart ' + each.id}>
                                                <div className="list-group-item d-none d-lg-block">
                                                    <div className="col-1 text-end d-block d-lg-none">
                                                        <button className="btn btn-sm" onClick={() => removeFromCart(each.figure.id)}><i className="bi bi-trash-fill"></i></button>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-11 col-lg-3">
                                                            <div className="tags-overlay d-flex justify-content-center">
                                                                <img src={each.figure.image_url} className="cart-img" alt='figure' />
                                                                {!each.figure.quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                                {!each.figure.launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                                                {each.figure.blind_box ?
                                                                    <OverlayTrigger key={'top'} placement={'top'} overlay={<Tooltip id={'tooltip-top'}>Blind box</Tooltip>}>
                                                                        <span className="blind-box-tag badge bg-warning text-dark"><i className="bi bi-patch-question-fill"></i></span>
                                                                    </OverlayTrigger>
                                                                    : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-8">
                                                            <h4 className="view-more" onClick={() => showProduct(each.figure.id)}>{each.figure.name}</h4>
                                                            <h6>${(each.figure.cost / 100).toFixed(2)}</h6>
                                                            <div className="container">
                                                                <button className="btn btn-sm qty-btn" name={each.figure.id}
                                                                    onClick={decreaseQuantity}>
                                                                    <i name={each.figure.id} className="bi bi-dash-circle-fill"></i>
                                                                </button>
                                                                <input type="text" className="form-control text-center" name={each.figure.id}
                                                                    value={quantity[each.figure.id]} onChange={updateQuantity}
                                                                    style={{ "width": "50px", "display": "inline-block" }} />
                                                                <button className="btn btn-sm qty-btn" name={each.figure.id}
                                                                    onClick={increaseQuantity}>
                                                                    <i name={each.figure.id} className="bi bi-plus-circle-fill"></i>
                                                                </button>
                                                            </div>
                                                            <h6>{each.figure.quantity} remaining in stock</h6>
                                                        </div>
                                                        <div className="col-1 text-end d-none d-lg-block">
                                                            <button className="btn btn-sm" onClick={() => removeFromCart(each.figure.id)}><i className="bi bi-trash-fill"></i></button>
                                                        </div>
                                                        <div className="d-flex justify-content-end align-items-end">
                                                            Subtotal: ${((each.figure.cost * quantity[each.figure.id]) / 100).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className={"list-group-item d-lg-none " + (index === 0 ? "first-list" : "")}>
                                                    <div className="row">
                                                        <div className="col-3 pe-0">
                                                            <div className="tags-overlay">
                                                                <img src={each.figure.image_url} className="cart-img" alt="figure" />
                                                                {!each.figure.quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                                {!each.figure.launch_status ? <div className="cart-po-sm"><span>PRE-ORDER</span></div> : null}
                                                                {each.figure.blind_box ?
                                                                    <OverlayTrigger key={'top'} placement={'top'} overlay={<Tooltip id={'tooltip-top'}>Blind box</Tooltip>}>
                                                                        <span className="blind-box-tag badge bg-warning text-dark"><i className="bi bi-patch-question-fill"></i></span>
                                                                    </OverlayTrigger>
                                                                    : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-8">
                                                            <p className="cart-name-mob text-center m-0 view-more" onClick={() => showProduct(each.figure.id)}>{each.figure.name}</p>
                                                            <p className="cart-cost-mob text-center m-0">${(each.figure.cost / 100).toFixed(2)}</p>
                                                            <div className="container text-center">
                                                                <button className="btn btn-sm qty-btn" name={each.figure.id} onClick={decreaseQuantityMob}>
                                                                    <i name={each.figure.id} className="bi bi-dash-circle-fill"></i>
                                                                </button>
                                                                <input type="text" className="form-control text-center"
                                                                    name={each.figure.id} value={quantity[each.figure.id]}
                                                                    onChange={updateQuantity} style={{ "width": "50px", "display": "inline-block" }} />
                                                                <button className="btn btn-sm qty-btn" name={each.figure.id} onClick={increaseQuantityMob}>
                                                                    <i name={each.figure.id} className="bi bi-plus-circle-fill"></i>
                                                                </button>
                                                            </div>
                                                            <h6 className="text-center">{each.figure.quantity} remaining in stock</h6>
                                                        </div>
                                                        <div className="col-1 p-0 text-end d-block d-lg-none">
                                                            <button className="btn btn-sm" onClick={() => removeFromCart(each.figure.id)}>
                                                                <i className="bi bi-trash-fill"></i>
                                                            </button>
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
                                    </div>
                                </div>
                            </React.Fragment>
                            : <div>No items in your cart currently...</div>}
                    </React.Fragment>
                    :
                    <div className="container d-flex justify-content-center align-items-center">
                        <img className="loader-size" src={require("../images/loader.gif")} alt="figure" />
                    </div>
                }
            </div>
        </React.Fragment>
    )
}