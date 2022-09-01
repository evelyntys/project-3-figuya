import React from 'react';
import OrderContext from '../context/OrderContext';
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Taipei');

export default function Orders() {
    const orderContext = React.useContext(OrderContext);
    const [orders, setOrders] = React.useState([]);
    const [showDetails, setShowDetails] = React.useState();

    React.useEffect(() => {
        async function setData() {
            let orders = await orderContext.getOrders();
            await setOrders(orders);
        }
        setData();
    }, []);

    const toggleDetails = (id) => {
        if (showDetails != id){
            setShowDetails(id)
        } else{
            setShowDetails()
        }
    }

    return (
        <React.Fragment>
            <div className="container mob-content">
                <h1>Your orders</h1>
                {orders.map(each => {
                    return (
                        <div className="container my-2" style={{ "border": "1px solid black" }}>
                            <div className="container row">
                                <div className="col-6 text-start"><h6>Order #{each.id}</h6></div>
                                <div className="col-6 text-end"><h6>{moment(each.ordered_date).format("DD/MM/YYYY", "LTS")}</h6></div>

                                <div className="col-12 col-lg-6">
                                    <a className="link-dec" href={each.receipt_url}>{each.payment_reference}</a>, via <span style={{ "text-transform": "uppercase" }}>{each.payment_method}</span><br />
                                    Order status:  <span style={{ "text-transform": "uppercase" }}>{each.order_status.order_status}</span><br/>
                                    {each.remarks}
                                </div>
                                <div className="col-12 col-lg-6 text-lg-end">
                                    <p>Total amount: ${(each.total_cost / 100).toFixed(2)}</p>
                                    <button className="btn btn-sm mb-2 view-more" style={{"color": "orange"}} onClick={() => toggleDetails(each.id)}>View details</button>
                                </div>
                            </div>
                            {showDetails == each.id ?
                                <div className="row container my-2">
                                    <div className="col col-lg-2">
                                        <img src={each.orderedItems[0].figure.image_url} style={{ "height": "100px", "width": "100px", "objectFit": "cover" }} />
                                    </div>
                                    <div className="col col-lg-5">
                                        <ol>
                                            Ordered items:
                                            {each.orderedItems.map(eachItem => {
                                                return (
                                                    <li style={{ "fontSize": "12px" }}>{eachItem.figure.name} x {eachItem.quantity}</li>
                                                )
                                            })}
                                        </ol>
                                    </div>
                                    <div className="col col-lg-5">
                                        Delivering to:
                                        <div style={{ "text-transform": "uppercase" }}>
                                            {each.block_street}, {each.unit}, {each.postal} <br />
                                            {each.shipping_type.shipping_type} delivery
                                            {each.coupon_used ? <p>Discount code: {each.coupon_used}</p> : null}
                                        </div>
                                    </div>
                                </div>
                                : null}

                            {/* <ol>
                                <h6>Ordered items: </h6>
                                <div className="d-flex flex-wrap">
                                    {each.orderedItems.map(eachItem => {
                                        return (
                                            <img src={eachItem.figure.image_url} style={{"height": "100px"}} className="mx-2"/>

                                        )
                                    })}
                                </div>
                                {each.orderedItems.map(eachItem => {
                                    return (
                                        <React.Fragment>
                                            <li style={{ "fontSize": "12px", "fontStyle": "italic" }}>{eachItem.figure.name} x {eachItem.quantity} (${(eachItem.quantity * eachItem.figure.cost / 100).toFixed(2)}) </li>
                                        </React.Fragment>
                                    )
                                })}
                            </ol> */}
                        </div>
                        // <div className="row my-2" style={{"border": "1px solid black"}}>
                        //     <div className="col-3">
                        //         <h4>Order #{each.id}</h4>
                        //         <h5>Total amount: ${(each.total_cost / 100).toFixed(2)}</h5>
                        //         <h6>Ordered on: {moment(each.ordered_date).format('DD/MM/YYYY, LTS')}</h6>
                        //         <h6>{each.shipping_type.shipping_type} delivery (+${(each.shipping_type.amount/100).toFixed(2)})</h6>
                        //         <p>delivers in {each.shipping_type.min_day} - {each.shipping_type.max_day} business days</p>
                        //     </div>
                        //     <div className="col-9">
                        //         <div className="d-flex flex-wrap">
                        //             {each.orderedItems.map(eachItem => {
                        //                 return (
                        //                     <div className="d-flex flex-row my-1">
                        //                          <div className="mx-2">
                        //                             <img src={eachItem.figure.image_url} style={{
                        //                                 "height": "90px", "width": "90px",
                        //                                 "objectFit": "cover", "border": "1px solid black"
                        //                             }} />
                        //                         </div>
                        //                         <div class="d-flex flex-column flex-wrap mx-2">
                        //                             <h6>{eachItem.figure.name}</h6>
                        //                             <h6>Quantity: {eachItem.quantity}</h6>
                        //                             <h6>Subtotal: ${(eachItem.quantity * eachItem.figure.cost /100).toFixed(2)}</h6>
                        //                         </div>
                        //                     </div>
                        //                 )
                        //             })}
                        //         </div>
                        //     </div>
                        // </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}