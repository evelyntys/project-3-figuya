import ProductContext from "../context/ProductContext";
import React from 'react';
import axios from 'axios'

export default class ProductProvider extends React.Component {
  state = {
    products: [],
    productToShow: []
  };

  async componentDidMount() {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
    let response = await axios.get(url + "products");
    this.setState({
      products: response.data
    })
  };

  render() {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
    const productContext = {
      getProducts: () => {
        return this.state.products
      },
      showProduct: async (id) => {
        let productToShowResponse = await axios.get(url + "products/" + id + "/view");
        let productToShow = productToShowResponse.data.product
        console.log(productToShow)
        await this.setState({
          productToShow: productToShow
        });
        return productToShow
      },
      getProductToShow: () => {
        return this.state.productToShow
      },
      filterProducts: async (searchBox) => {
        let productResponse = await axios.get(url + "products/search", {
          params: {
            name: searchBox.search,
            min_cost: searchBox.min_cost,
            max_cost: searchBox.max_cost
          }
        });
        console.log(productResponse.data)
        let products = productResponse.data;
        console.log(products);
        await this.setState({
          products: products
        });
        // return productContext.getProducts()
      }
    }
    return (
      <ProductContext.Provider value={productContext}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}