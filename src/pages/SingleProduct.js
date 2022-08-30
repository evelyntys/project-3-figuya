import React from 'react';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';
import { ToastContainer } from 'react-toastify';
import { Accordion } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function SingleProduct() {
    const { productId } = useParams();
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    // const product = productContext.showProduct(productId);
    const [product, setProduct] = React.useState([]);
    const [productQty, setProductQty] = React.useState(1);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchProduct = async () => {
            let tempProduct = await productContext.showProduct(parseInt(productId));
            console.log("this=>", tempProduct);
            await setProduct(tempProduct);
        }
        fetchProduct();
    }, [parseInt(productId)])


    const products = () => {
        navigate("/products")
    }

    const updateQty = (e) => {
        setProductQty(e.target.value)
    }

    return (
        <React.Fragment>
            <ToastContainer />
            {product.id ? <React.Fragment>
                <div className="container d-none d-lg-block">
                    <div className="row">
                        <div className="col-12">
                            <button className="btn" onClick={products}><i class="bi bi-arrow-90deg-left"></i></button>
                        </div>
                        <div className="col-5">
                            <img src={product.image_url} className="desktop-single-product" />
                        </div>
                        <div className="col-7">
                            <h3 className="m-0">{product.name}</h3>
                            {!product.launch_status ?
                                <span className="badge bg-danger">
                                    PRE-ORDER
                                </span>
                                : null
                            }
                            {product.blind_box ?
                                <span className="badge bg-warning text-dark">
                                    BLIND BOX
                                </span>
                                : null
                            }
                            <h4>${(product.cost / 100).toFixed(2)}</h4>
                            <div className="d-flex">
                                <table className="text-start" width="100%">
                                    <tr>
                                        <td width="50%">Height</td>
                                        <td width="50%">{product.height / 10} cm</td>
                                    </tr>
                                    <tr>
                                        <td width="50%">Series</td>
                                        <td width="50%" className="detail-text">{product.series.series_name}</td>
                                    </tr>
                                    <tr>
                                        <td width="50%">Series mediums</td>
                                        <td width="50%" className="detail-text">
                                            {product.series.mediums.map((eachMedium, index) => {
                                                return (
                                                    <span>{eachMedium.media_medium}{index < product.series.mediums.length - 1 ? ", " : ""}</span>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="50%">Collection</td>
                                        <td width="50%" className="detail-text">{product.collection.collection_name}</td>
                                    </tr>
                                    <tr>
                                        <td width="50%">Manufacturer</td>
                                        <td width="50%" className="detail-text">{product.manufacturer.manufacturer_name}</td>
                                    </tr>
                                </table>
                            </div>
                            <p>{product.description}</p>
                            <div className="container">
                                <button className="btn btn-sm" onClick={() => productQty >= 1 ? setProductQty(parseInt(productQty) + 1) : null}><i class="bi bi-plus-circle-fill"></i></button>
                                <input type="text" className="form-control text-center" name="productQty" value={productQty}
                                    onChange={updateQty} style={{ "width": "50px", "display": "inline-block" }} />
                                <button className="btn btn-sm" onClick={() => productQty > 1 ? setProductQty(parseInt(productQty) - 1) : null}><i class="bi bi-dash-circle-fill"></i></button>
                                <button className="btn main-btn" onClick={() => cartContext.addToCart(product.id, productQty)}>Add to cart</button>
                            </div>
                            <h6>{product.quantity} left in stock</h6>
                        </div>
                    </div>
                </div>


                <div className="container d-lg-none">
                    <div className="row">
                        <div className="col-12">
                            <button className="btn" onClick={products}><i class="bi bi-arrow-90deg-left"></i></button>
                        </div>
                        <div className="col-12 text-center">
                            <div className="d-flex justify-content-center">
                                <img src={product.image_url} style={{ "height": "200px" }} />
                            </div>
                            {!product.launch_status ?
                                <span className="badge bg-danger text-start p-2">
                                    PRE-ORDER
                                </span>
                                : null
                            }
                            {product.blind_box ?
                                <span className="badge bg-warning text-dark">
                                    BLIND BOX
                                </span>
                                : null
                            }
                            <h3 className="product-name">{product.name}
                            </h3>
                            <div className="d-flex justify-content-center">
                                <table className="text-start">
                                    <tr>
                                        <td width="50%">Height</td>
                                        <td width="50%">{product.height / 10} cm</td>
                                    </tr>
                                    <tr>
                                        <td width="50%">Series</td>
                                        <td width="50%" className="detail-text">{product.series.series_name}</td>
                                    </tr>
                                    <tr>
                                        <td width="50%">Series mediums</td>
                                        <td width="50%" className="detail-text">
                                            {product.series.mediums.map((eachMedium, index) => {
                                                return (
                                                    <span>{eachMedium.media_medium}{index < product.series.mediums.length - 1 ? ", " : ""}</span>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="50%">Collection</td>
                                        <td width="50%" className="detail-text">{product.collection.collection_name}</td>
                                    </tr>
                                    <tr>
                                        <td width="50%">Manufacturer</td>
                                        <td width="50%" className="detail-text">{product.manufacturer.manufacturer_name}</td>
                                    </tr>
                                </table>
                            </div>
                            <h4>${(product.cost / 100).toFixed(2)}</h4>
                            <div className="container my-1">
                                <button className="btn btn-sm" onClick={() => productQty >= 1 ? setProductQty(parseInt(productQty) + 1) : null}><i class="bi bi-plus-circle-fill"></i></button>
                                <input type="text" className="form-control text-center" name="productQty" value={productQty}
                                    onChange={updateQty} style={{ "width": "50px", "display": "inline-block" }} />
                                <button className="btn btn-sm" onClick={() => productQty > 1 ? setProductQty(parseInt(productQty) - 1) : null}><i class="bi bi-dash-circle-fill"></i></button>
                                <button className="btn main-btn my-1" onClick={() => cartContext.addToCart(product.id, productQty)}>Add to cart</button>
                            </div>
                            <h6>{product.quantity} left in stock</h6>
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Description</Accordion.Header>
                                    <Accordion.Body>
                                        {product.description}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </React.Fragment>
                : 
                <div className="d-flex justify-content-center">
                    <img src={require("../images/loader.gif")} />
                </div>
                }
        </React.Fragment >

    )
}