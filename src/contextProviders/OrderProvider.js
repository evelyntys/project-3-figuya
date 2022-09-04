import React from 'react';
import axios from "../helpers/AxiosInterceptor";
import OrderContext from '../context/OrderContext';
import { checkAccessExpiry } from '../helpers/helper';

export default class OrderProvider extends React.Component {

    async componentDidMount() {
        await checkAccessExpiry();
    }

    render() {

        const orderContext = {
            getOrders: async () => {
                let accessToken = await checkAccessExpiry();
                let orderResponse = await axios.get("orders", {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
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