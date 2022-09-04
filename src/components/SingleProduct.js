import React from 'react';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';
import { ToastContainer } from 'react-toastify';
import { Accordion } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Taipei');

export default function SingleProduct() {
    const { productId } = useParams();
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    const [product, setProduct] = React.useState([]);
    const [productQty, setProductQty] = React.useState(1);
    const navigate = useNavigate();
    const [relatedProducts, setRelatedProducts] = React.useState([]);
    const [loader, setLoader] = React.useState();
    const [mobCurrent, setMobCurrent] = React.useState(0);

    React.useEffect(() => {
        const fetchProduct = async () => {
            setLoader(true);
            let tempProduct = await productContext.showProduct(parseInt(productId));
            await setProduct(tempProduct);
            let relatedProducts = await productContext.getRelatedProducts(tempProduct);
            relatedProducts = relatedProducts.filter(each => { return (each.id !== tempProduct.id) });
            relatedProducts = relatedProducts.slice(0, 3);
            await setRelatedProducts(relatedProducts);
            setLoader(false)
        }
        fetchProduct();
    }, [parseInt(productId)])

    const mobLeft = () => {
        if (mobCurrent !== 0) {
            setMobCurrent(mobCurrent - 1)
        }
    }

    const mobRight = () => {
        if (relatedProducts.length === 3) {
            if (mobCurrent !== 2) {
                setMobCurrent(mobCurrent + 1)
            }
        }
        else if (relatedProducts.length === 2) {
            if (mobCurrent !== 1) {
                setMobCurrent(mobCurrent + 1)
            }
        }
    }

    const products = () => {
        navigate("/products")
    }

    const updateQty = (e) => {
        if (!(e.target.value).isNaN) {
            setProductQty(parseInt(e.target.value))
        }
    }

    const showProduct = async (productId) => {
        navigate(`/products/${productId}`)
    }

    return (
        <React.Fragment>
            <ToastContainer />
            {!loader ? <React.Fragment>
                {product.id ? <React.Fragment>
                    <div className="container d-none d-lg-block">
                        <div className="row">
                            <div className="col-12">
                                <button className="btn" onClick={products}>
                                    <i className="bi bi-arrow-90deg-left"></i>
                                    </button>
                            </div>
                            <div className="col-6">
                                <img src={product.image_url} className="desktop-single-product" alt="figure" />
                            </div>
                            <div className="col-6">
                                <h2 className="m-0 pdt-padding product-name">{product.name}</h2>
                                {!product.launch_status ?
                                    <div className="pdt-padding">
                                        <span className="badge bg-danger">
                                            PRE-ORDER
                                        </span>
                                    </div>
                                    : null
                                }
                                {product.blind_box ?
                                    <div className="pdt-padding">
                                        <span className="badge bg-warning text-dark">
                                            BLIND BOX
                                        </span>
                                    </div>
                                    : null
                                }
                                <h4 className="pdt-padding">${(product.cost / 100).toFixed(2)}</h4>
                                <div className="d-flex pdt-padding">
                                    <table className="text-start" width="100%">
                                        <tbody>
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
                                                            <span key={eachMedium.media_medium}>{eachMedium.media_medium}{index < product.series.mediums.length - 1 ? ", " : ""}</span>
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
                                            <tr>
                                                <td width="50%">Release date</td>
                                                <td width="50%" className="detail-text">{moment(product.release_date).format('DD/MM/YYYY')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div></div>
                                <div className="container d-flex justify-content-center align-items-center mt-3">
                                    <button className="btn qty-btn" onClick={() => productQty > 1 ? setProductQty(parseInt(productQty) - 1) : null} disabled={product.quantity <= 1 || productQty <= 1}>
                                        <i className="bi bi-dash-circle-fill"></i>
                                        </button>
                                    <input type="text" className="form-control text-center" name="productQty" value={productQty}
                                        onChange={updateQty} style={{ "width": "50px", "display": "inline-block" }} />
                                    <button className="btn qty-btn" onClick={() => productQty >= 1 ? setProductQty(parseInt(productQty) + 1) : null} 
                                    disabled={productQty >= product.quantity}>
                                        <i className="bi bi-plus-circle-fill"></i>
                                        </button>
                                    <button className="btn main-btn" onClick={() => cartContext.addToCart(product.id, productQty)} disabled={productQty > product.quantity}>Add to cart</button>
                                </div>
                                <div className="container d-flex justify-content-center my-2">
                                    {product.quantity ? <h6>{product.quantity} left in stock</h6>
                                        : <h6 style={{ "color": "red" }}>SOLD OUT</h6>}
                                </div>
                                <Accordion flush>
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


                    <div className="container d-lg-none">
                        <div className="row">
                            <div className="col-12">
                                <button className="btn" onClick={products}>
                                    <i className="bi bi-arrow-90deg-left"></i>
                                    </button>
                            </div>
                            <div className="col-12 text-center">
                                <div className="d-flex justify-content-center">
                                    <img src={product.image_url} style={{ "height": "200px" }} alt="figure" />
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
                                <h4>${(product.cost / 100).toFixed(2)}</h4>
                                <div className="d-flex justify-content-center mob-table">
                                    <table className="text-start" width="100%">
                                        <tbody>
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
                                                            <span key={eachMedium.media_medium + " mob"}>{eachMedium.media_medium}{index < product.series.mediums.length - 1 ? ", " : ""}</span>
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
                                            <tr>
                                                <td width="50%">Release date</td>
                                                <td width="50%" className="detail-text">{moment(product.release_date).format('DD/MM/YYYY')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="container d-flex justify-content-center align-items-center mt-3">
                                    <button className="btn btn-sm qty-btn" onClick={() => productQty > 1 ? setProductQty(parseInt(productQty) - 1) : null}>
                                        <i className="bi bi-dash-circle-fill"></i>
                                        </button>
                                    <input type="text" className="form-control text-center" name="productQty" value={productQty}
                                        onChange={updateQty} style={{ "width": "50px", "display": "inline-block" }} />
                                    <button className="btn btn-sm qty-btn" onClick={() => productQty >= 1 ? setProductQty(parseInt(productQty) + 1) : null} disabled={productQty >= product.quantity}>
                                        <i className="bi bi-plus-circle-fill"></i>
                                        </button>
                                    <button className="btn btn-sm main-btn my-1" onClick={() => cartContext.addToCart(product.id, productQty)} disabled={productQty > product.quantity}>Add to cart</button>
                                </div>
                                {product.quantity ? <h6>{product.quantity} left in stock</h6>
                                    : <h6 style={{ "color": "red" }}>SOLD OUT</h6>}
                                <Accordion flush>
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
                    {relatedProducts.length ?
                        <React.Fragment>
                            <div className="col-12 mt-3 justify-content-center d-none d-md-block">
                                <h4 className="text-center">View other products from the same series</h4>
                                <div className="d-flex flex-wrap justify-content-center">
                                    {relatedProducts.map(each => {
                                        return (
                                            <div key={each.id} className="col-12 col-md-4">
                                                <div className="mx-auto card m-2 card-border" style={{ "width": "16rem" }}>
                                                    <div className="tags-overlay">
                                                        <img src={each.image_url} className={"class-img-top card-img" + (each.quantity ? "" : " sold-out-img")} alt="figure" />
                                                        {!each.quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                        {!each.launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                                        {each.blind_box ? <span className="blind-box-tag badge bg-warning text-dark">
                                                            <i className="bi bi-patch-question-fill"></i>
                                                            </span> : null}
                                                    </div>
                                                    <div className="card-body pb-0">
                                                        <h5 className="card-title view-more text-truncate mb-0" onClick={() => showProduct(each.id)}>{each.name}</h5>
                                                        <span className="figure-type">{each.figure_type.figure_type} figure</span>
                                                        <h4>${(each.cost / 100).toFixed(2)}</h4>
                                                        <div>
                                                            <span className="badge card-badges m-1">{each.series.series_name}</span> <br />
                                                            <span className="badge card-badges m-1">{each.collection.collection_name}</span> <br />
                                                            <span className="badge card-badges m-1">{each.manufacturer.manufacturer_name}</span> <br />
                                                        </div>
                                                    </div>
                                                    <button className="btn card-btn btn-sm m-1" disabled={each.quantity < 1}
                                                        onClick={() => cartContext.addToCart(each.id, 1)}>
                                                        ADD TO CART
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="d-md-none mob-content">
                                <div className="col-12 mt-3 justify-content-center">
                                    <h4 className="text-center">View other products from the same series</h4>
                                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                                        <div className="col-2 text-end">
                                            <button className="btn" onClick={mobLeft}>
                                                <i className="bi bi-caret-left-fill"></i>
                                                </button>
                                        </div>
                                        <div className="col-8">
                                            <div className="mx-auto card m-2 card-border" style={{ "width": "16rem" }}>
                                                <div className="tags-overlay">
                                                    <img src={relatedProducts[mobCurrent].image_url} alt="figure" className={"class-img-top card-img" + (relatedProducts[mobCurrent].quantity ? "" : " sold-out-img")} />
                                                    {!relatedProducts[mobCurrent].quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                    {!relatedProducts[mobCurrent].launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                                    {relatedProducts[mobCurrent].blind_box ? <span className="blind-box-tag badge bg-warning text-dark">
                                                        <i className="bi bi-patch-question-fill"></i>
                                                        </span> : null}
                                                </div>
                                                <div className="card-body pb-0">
                                                    <h5 className="card-title view-more text-truncate mb-0" onClick={() => showProduct(relatedProducts[mobCurrent].id)}>{relatedProducts[mobCurrent].name}</h5>
                                                    <span className="figure-type">{relatedProducts[mobCurrent].figure_type.figure_type} figure</span>
                                                    <h4>${(relatedProducts[mobCurrent].cost / 100).toFixed(2)}</h4>
                                                    <div>
                                                        <span className="badge card-badges m-1">{relatedProducts[mobCurrent].series.series_name}</span> <br />
                                                        <span className="badge card-badges m-1">{relatedProducts[mobCurrent].collection.collection_name}</span> <br />
                                                        <span className="badge card-badges m-1">{relatedProducts[mobCurrent].manufacturer.manufacturer_name}</span> <br />
                                                    </div>
                                                </div>
                                                <button className="btn card-btn btn-sm m-1" disabled={relatedProducts[mobCurrent].quantity < 1}
                                                    onClick={() => cartContext.addToCart(relatedProducts[mobCurrent].id, 1)}>
                                                    ADD TO CART
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-2 text-start">
                                            <button className="btn" onClick={mobRight}>
                                                <i className="bi bi-caret-right-fill"></i>
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                        :
                        <div height="10vh">
                        </div>
                    }
                </React.Fragment>
                    :
                    <div className="d-flex justify-content-center">
                        <img src={require("../images/loader.gif")} className="loader-size" alt="loader" />
                    </div>
                }
            </React.Fragment>

                :
                <div className="d-flex justify-content-center">
                    <img src={require("../images/loader.gif")} className="loader-size" alt="loafer" />
                </div>
            }
        </React.Fragment >

    )
}