import React from 'react';
import axios from "../AxiosInterceptor";
import OrderContext from '../context/OrderContext';

export default class OrderProvider extends React.Component {

    render() {

        const orderContext = {
            getOrders: async (Id) => {
                // let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                // console.log(accessToken);
                let orderResponse = await axios.get("orders");
                console.log(orderResponse.data);
                let orders = orderResponse.data;
                return orders
            }
        };

        return (
            <OrderContext.Provider value={orderContext}>
                {this.props.children}
            </OrderContext.Provider>
        )
    }
}