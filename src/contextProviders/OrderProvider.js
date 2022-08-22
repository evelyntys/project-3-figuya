import React from 'react';
import axios from 'axios';
import OrderContext from '../context/OrderContext';

export default class OrderProvider extends React.Component {

    render() {
        const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/";

        const orderContext = {
            getOrders: async (Id) => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                console.log(accessToken);
                let orderResponse = await axios.get(url + "orders");
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