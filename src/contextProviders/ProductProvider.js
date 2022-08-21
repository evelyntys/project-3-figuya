import ProductContext from "../context/ProductContext";
import React from 'react';
import axios from 'axios'

export default class ProductProvider extends React.Component{
    state = {
        products: []
      };
    
      async componentDidMount() {
        const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
        let response = await axios.get(url + "products");
        this.setState({
          products: response.data
        })
      };
      render(){
        const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
        const productContext = {
            getProducts: () => {
              return this.state.products
            },
            // getProductsAxios: async () => {
            //   let response = await axios.get("https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/" + "products");
            //   return response.data
            // }
          }
        return (
            <ProductContext.Provider value={productContext}>
                {this.props.children}
            </ProductContext.Provider>
        )
      }
}