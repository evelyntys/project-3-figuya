import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CancelCheckout(){
    const navigate = useNavigate();
    const cart = () => {
        navigate("/cart")
    }
    const products = () => {
        navigate("/products")
    }
    return (
        <React.Fragment>
            <div className="container d-flex align-items-center justify-content-center" style={{"height": "80vh"}}>
                <div className="row">
                    <div className="col-6 d-flex justify-content-center">
                        <img src={require("../images/checkout_error.png")} style={{"height": "200px"}} />
                    </div>
                    <div className="col-6" style={{"fontSize": "40px"}}>
                        Checkout has been cancelled...
                        <div style={{"fontSize": "20px"}}>
                    Return your <span className="view-more" onClick={cart}>cart</span> to try again,
                    or go to <span className="view-more" onClick={products}>shop more</span>.
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}