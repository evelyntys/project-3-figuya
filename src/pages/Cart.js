import React, { useEffect } from 'react';
import CartContext from '../context/CartContext';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import AddressModal from './AddressModal';

export default function Cart(props) {
    const cartContext = React.useContext(CartContext);
    const [cart, setCart] = React.useState([]);
    const [quantity, setQuantity] = React.useState([]);
    const [cartTotal, setCartTotal] = React.useState([]);

    useEffect(() => {
        async function setData() {
            const cartItems = await cartContext.getCart();
            await setCart(cartItems);
            // for (let i=0; i<cartItems.length; i++){
            //     quantity[i] = cartItems[i].quantity;
            // }
            await setCartTotal(cartContext.getTotal(cartItems));
            for (let each of cartItems) {
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

    }

    // setCart(cartContext.getCart());
    const [checkoutDetails, setCheckOutDetails] = React.useState({
        customer_email: "",
        block_street: "",
        unit: "",
        postal: ""
    });
    const [selectAddress, setSelectAddress] = React.useState(0);

    // const getQuantites = () => {

    // }

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
        await setCart(newCart);
        await setCartTotal(cartContext.getTotal(newCart));
    }

    const Checkout = async () => {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        console.log(accessToken);
        let checkoutResponse = await axios.post(props.url + "checkout", {
            customer_email: checkoutDetails.customer_email,
            block_street: checkoutDetails.block_street,
            unit: checkoutDetails.unit,
            postal: checkoutDetails.postal
        });
        console.log(checkoutResponse.data);
        window.location.href = checkoutResponse.data.url
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
                            <div className="list-group-item">
                                <div className="row">
                                    <div className="col-3">
                                        <img src={each.figure.image_url} style={{ "height": "150px" }} />
                                    </div>
                                    <div className="col-8">
                                        <h4>{each.figure.name}</h4>
                                        <h6>${(each.figure.cost / 100).toFixed(2)}</h6>
                                        <div className="container">
                                            <button className="btn btn-sm">+</button>
                                            <input type="text" className="form-control text-center" name={each.figure.id} value={quantity[each.figure.id]}
                                                onChange={updateQuantity} style={{ "width": "50px", "display": "inline-block" }} />
                                            <button className="btn btn-sm">-</button>
                                        </div>
                                        {each.figure.launch_status ? "" : <span className="badge bg-danger">PRE-ORDER</span>}
                                        <h6>{each.figure.quantity} remaining in stock</h6>
                                    </div>
                                    <div className="col-1 text-end">
                                        <button className="btn btn-sm" onClick={() => removeFromCart(each.figure.id)}>Delete</button>
                                    </div>
                                    <div className="d-flex justify-content-end align-items-end">
                                        Subtotal: ${((each.figure.cost * quantity[each.figure.id]) / 100).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="d-flex justify-content-end">
                    <h6>Total: {cartTotal}</h6>
                </div>
                <div className="d-flex justify-content-end">
                    <AddressModal customer_email={checkoutDetails.customer_email} block_street={checkoutDetails.block_street}
                        unit={checkoutDetails.unit} postal={checkoutDetails.postal} updateFormField={updateFormField}
                        Checkout={Checkout} selectAddress={selectAddress} updateSelect={updateSelect} />
                    {/* <button className="btn btn-danger text-end" onClick={Checkout}>Checkout</button> */}
                </div>
                </React.Fragment>
                : <div>no items in your cart currently...</div> }
            </div>
        </React.Fragment>
    )
}