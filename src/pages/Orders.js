import React from 'react';
import OrderContext from '../context/OrderContext';
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Taipei');

export default function Orders() {
    const orderContext = React.useContext(OrderContext);
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        async function setData() {
            let orders = await orderContext.getOrders();
            await setOrders(orders);
        }
        setData();
    });

    return (
        <React.Fragment>
            <div className="container">
                <h1>Your orders</h1>
                {orders.map(each => {
                    return (
                        <div className="row my-2" style={{"border": "1px solid black"}}>
                            <div className="col-3">
                                <h4>Order #{each.id}</h4>
                                <h5>Total amount: ${(each.total_cost / 100).toFixed(2)}</h5>
                                <h6>Ordered on: {moment(each.ordered_date).format('DD/MM/YYYY, LTS')}</h6>
                                <h6>{each.shipping_type.shipping_type} delivery</h6>
                                <p>delivers in {each.shipping_type.min_day} - {each.shipping_type.max_day} business days</p>
                            </div>
                            <div className="col-9">
                                <div className="d-flex flex-wrap">
                                    {each.orderedItems.map(eachItem => {
                                        return (
                                            <div className="d-flex flex-row my-1">
                                                 <div className="mx-2">
                                                    <img src={eachItem.figure.image_url} style={{
                                                        "height": "90px", "width": "90px",
                                                        "objectFit": "cover", "border": "1px solid black"
                                                    }} />
                                                </div>
                                                <div class="d-flex flex-column flex-wrap mx-2">
                                                    <h6>{eachItem.figure.name}</h6>
                                                    <h6>Quantity: {eachItem.quantity}</h6>
                                                    <h6>Subtotal: ${(eachItem.quantity * eachItem.figure.cost /100).toFixed(2)}</h6>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}