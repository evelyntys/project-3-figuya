import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessCheckout() {
    const navigate = useNavigate();
    const orders = () => {
        navigate("/orders")
    }
    const products = () => {
        navigate("/products")
    }
    return (
        <React.Fragment>
            <div className="container d-flex align-items-center justify-content-center" style={{ "height": "80vh" }}>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <img src={require("../images/checkout.png")} style={{ "height": "200px" }} alt="successful checkout" />
                    </div>
                    <div className="col align-self-center" style={{ "fontSize": "40px" }}>
                        Congratulations, you've managed to checkout successfully!
                        <div style={{ "fontSize": "20px" }}>
                            Head to view your <span className="view-more" onClick={orders}>Orders</span> now,
                            or go to <span className="view-more" onClick={products}>shop more</span>.
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}