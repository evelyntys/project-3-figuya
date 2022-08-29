import React from 'react';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';
import { ToastContainer } from 'react-toastify';
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SingleProduct() {
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    const product = productContext.getProductToShow();
    const [productQty, setProductQty] = React.useState(1);
    const navigate = useNavigate();

    const products = () => {
        navigate("/products")
    }

    const updateQty = (e) => {
        setProductQty(e.target.value)
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="container d-none d-lg-block">
                <img src={product.image_url} style={{ "height": "200px" }} />
                <h3>{product.name}</h3>
                {!product.launch_status ?
                    <span className="badge bg-danger">
                        PRE-ORDER
                    </span>
                    : null
                }
                <h6>{product.quantity} left in stock</h6>
                <h4>${(product.cost / 100).toFixed(2)}</h4>
                <h6>Height: {product.height} mm</h6>
                <p>{product.description}</p>
                <div className="container">
                    <button className="btn btn-sm" onClick={() => productQty >= 1 ? setProductQty(parseInt(productQty) + 1) : null}>+</button>
                    <input type="text" className="form-control text-center" name="productQty" value={productQty}
                        onChange={updateQty} style={{ "width": "50px", "display": "inline-block" }} />
                    <button className="btn btn-sm" onClick={() => productQty > 1 ? setProductQty(parseInt(productQty) - 1) : null}>-</button>
                </div>
                <button className="btn btn-dark" onClick={() => cartContext.addToCart(product.id, productQty)}>Add to cart</button>
                <span className="badge bg-warning">{product.series.series_name}</span>
                <span className="badge bg-warning">{product.collection.collection_name}</span>
                <span className="badge bg-warning">{product.manufacturer.manufacturer_name}</span>
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
                        <h3 className="product-name">{product.name}
                        </h3>
                        <div className="d-flex justify-content-center">
                            <table className="text-start">
                                <tr>
                                    <td width="50%">Height</td>
                                    <td width="50%">{product.height} mm</td>
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
        </React.Fragment >

    )
}