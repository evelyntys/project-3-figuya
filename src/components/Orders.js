import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import OrderContext from '../context/OrderContext';
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Taipei');

export default function Orders() {
    const orderContext = React.useContext(OrderContext);
    const [pendingOrders, setPendingOrders] = React.useState([]);
    const [completedOrders, setCompletedOrders] = React.useState([]);
    const [showDetails, setShowDetails] = React.useState();
    const [loader, setLoader] = React.useState()

    React.useEffect(() => {
        async function setData() {
            setLoader(true);
            let orders = await orderContext.getOrders();
            let pendingOrders = orders.filter((each) => { return (each.order_status_id !== 5 && each.order_status_id !== 6) });
            let completedOrders = orders.filter((each) => { return (each.order_status_id == 5 || each.order_status_id == 6) });
            await setPendingOrders(pendingOrders);
            await setCompletedOrders(completedOrders);
            setLoader(false);
        }
        setData();
    }, []);

    const toggleDetails = (id) => {
        if (showDetails != id) {
            setShowDetails(id)
        } else {
            setShowDetails()
        }
    }

    return (
        <React.Fragment>
            <div className="container mob-content">
                <h1>Your orders</h1>
                <Tabs
                    defaultActiveKey="pending"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="pending" title="Pending">
                        {!loader ?
                            <React.Fragment>
                                {pendingOrders.length ?
                                    <React.Fragment>
                                        {pendingOrders.map(each => {
                                            return (
                                                <div className="container my-2" style={{ "border": "1px solid black" }}>
                                                    <div className="container row">
                                                        <div className="col-6 text-start"><h6>Order #{each.id}</h6></div>
                                                        <div className="col-6 text-end"><h6>{moment(each.ordered_date).format("DD/MM/YYYY", "LTS")}</h6></div>

                                                        <div className="col-12 col-lg-6">
                                                            <a className="link-dec" href={each.receipt_url}>{each.payment_reference}</a>, via <span style={{ "text-transform": "uppercase" }}>{each.payment_method}</span><br />
                                                            Order status:  <span style={{ "text-transform": "uppercase" }}>{each.order_status.order_status}</span><br />
                                                            {each.remarks}
                                                        </div>
                                                        <div className="col-12 col-lg-6 text-lg-end">
                                                            <p>Total amount: ${(each.total_cost / 100).toFixed(2)}</p>
                                                            <button className="btn btn-sm mb-2 view-more" style={{ "color": "orange" }} onClick={() => toggleDetails(each.id)}>View details</button>
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
                                                </div>
                                            )
                                        })}
                                    </React.Fragment>
                                    :
                                    <div>
                                        no pending orders</div>}
                            </React.Fragment>
                            :
                            <div className="d-flex justify-content-center">
                                <img src={require("../images/loader.gif")} className="loader-size" />
                            </div>
                        }
                    </Tab>
                    <Tab eventKey="delivered" title="Delivered">
                        {!loader ?
                            <React.Fragment>
                                {completedOrders.length ?
                                    <React.Fragment>
                                        {completedOrders.map(each => {
                                            return (
                                                <div className="container my-2" style={{ "border": "1px solid black" }}>
                                                    <div className="container row">
                                                        <div className="col-6 text-start"><h6>Order #{each.id}</h6></div>
                                                        <div className="col-6 text-end"><h6>{moment(each.ordered_date).format("DD/MM/YYYY", "LTS")}</h6></div>

                                                        <div className="col-12 col-lg-6">
                                                            <a className="link-dec" href={each.receipt_url}>{each.payment_reference}</a>, via <span style={{ "text-transform": "uppercase" }}>{each.payment_method}</span><br />
                                                            Order status:  <span style={{ "text-transform": "uppercase" }}>{each.order_status.order_status}</span><br />
                                                            {each.remarks}
                                                        </div>
                                                        <div className="col-12 col-lg-6 text-lg-end">
                                                            <p>Total amount: ${(each.total_cost / 100).toFixed(2)}</p>
                                                            <button className="btn btn-sm mb-2 view-more" style={{ "color": "orange" }} onClick={() => toggleDetails(each.id)}>View details</button>
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
                                                </div>
                                            )
                                        })}
                                    </React.Fragment>
                                    :
                                    <div>
                                        no completed orders</div>}
                            </React.Fragment>
                            :
                            <div className="d-flex justify-content-center">
                                <img src={require("../images/loader.gif")} className="loader-size" />
                            </div>
                        }
                    </Tab>
                </Tabs>
            </div>
        </React.Fragment>
    )
}