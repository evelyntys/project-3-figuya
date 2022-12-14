import ProductContext from "../context/ProductContext";
import React from 'react';
import axios from '../helpers/AxiosInterceptor';
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Taipei');

export default class ProductProvider extends React.Component {
  state = {
    products: [],
    productToShow: [],
    figureTypes: [],
    collections: [],
    manufacturers: [],
    filter: ""
  };

  async componentDidMount() {
    let searchFieldsResponse = await axios.get("products/fields");
    await this.setState({
      figureTypes: searchFieldsResponse.data.allFigureTypes,
      collections: searchFieldsResponse.data.allCollections,
      manufacturers: searchFieldsResponse.data.allManufacturers
    })
  };

  render() {
    const productContext = {
      getProducts: async () => {
        let productResponse = await axios.get("products");
        return productResponse.data;
      },
      showProduct: async (id) => {
        let productToShowResponse = await axios.get("products/" + id + "/view");
        let productToShow = productToShowResponse.data.product
        console.log("here=>", productToShow)
        await this.setState({
          productToShow: productToShow
        });
        return productToShow
      },
      getProductToShow: () => {
        return this.state.productToShow
      },
      filterProducts: async (searchBox) => {
        let productResponse = await axios.get("products/search", {
          params: {
            name: searchBox.search,
            min_cost: searchBox.min_cost,
            max_cost: searchBox.max_cost,
            figure_type_id: searchBox.figureType,
            collection_id: searchBox.collection,
            min_height: searchBox.min_height,
            max_height: searchBox.max_height,
            blind_box: searchBox.blind_box,
            launch_status: searchBox.launch_status
          }
        });
        console.log(productResponse.data)
        let products = productResponse.data;
        if (searchBox.series) {
          products = products.filter(each => { return each.series.series_name.includes(searchBox.series.toLowerCase()) })
        }
        if (searchBox.release_date) {
          products = products.filter(each => { return moment(each.release_date).format("DD/MM/YYYY") === moment(searchBox.release_date).format("DD/MM/YYYY") })
        }
        if (parseInt(searchBox.manufacturer) !== 0) {
          products = products.filter(each => { return each.manufacturer.id === parseInt(searchBox.manufacturer) })
        }
        await this.setState({
          products: products
        });
        return products
      },
      getFigureType: () => {
        return this.state.figureTypes
      },
      getCollections: () => {
        return this.state.collections
      },
      getManufacturers: () => {
        return this.state.manufacturers
      },
      getActionFigures: async () => {
        let productResponse = await axios.get("products/search", {
          params: {
            figure_type_id: [1]
          }
        });
        let products = productResponse.data;
        await this.setState({
          products: products,
          filter: "action"
        })
        console.log(products);
      },
      getState: () => {
        return this.state.products
      },
      getCompleteFigures: async () => {
        let productResponse = await axios.get("products/search", {
          params: {
            figure_type_id: [2]
          }
        });
        let products = productResponse.data;
        await this.setState({
          products: products,
          filter: "complete"
        })
      },
      getScaleFigures: async () => {
        let productResponse = await axios.get("products/search", {
          params: {
            figure_type_id: [3]
          }
        });
        let products = productResponse.data;
        await this.setState({
          products: products,
          filter: "scale"
        })
      },
      getBlindBox: async () => {
        let productResponse = await axios.get("products/search", {
          params: {
            blind_box: 1
          }
        });
        let products = productResponse.data;
        await this.setState({
          products: products,
          filter: "blind-box"
        })
      },
      getFiltered: async () => {
        return this.state.filter
      },
      getRelatedProducts: async (figure) => {
        let seriesId = figure.series_id;
        let productsResponse = await axios.get("products/series/" + seriesId);
        let relatedProducts = productsResponse.data.relatedProducts
        return relatedProducts
      },
      getNewlyListed: async () => {
        let productsResponse = await axios.get("products/newlylisted");
        let newProducts = productsResponse.data.products;
        return newProducts
      }
    }
    return (
      <ProductContext.Provider value={productContext}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}