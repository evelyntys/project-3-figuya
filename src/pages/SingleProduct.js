import React from 'react';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';
import { ToastContainer } from 'react-toastify';
import { Accordion } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ProductListing from './ProductListings';

export default function SingleProduct() {
    const { productId } = useParams();
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    // const product = productContext.showProduct(productId);
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
            console.log("this=>", tempProduct);
            await setProduct(tempProduct);
            let relatedProducts = await productContext.getRelatedProducts(tempProduct);
            relatedProducts = relatedProducts.filter(each => { return (each.id !== tempProduct.id) });
            relatedProducts = relatedProducts.slice(0, 3);
            console.log(relatedProducts);
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
        if (relatedProducts.length === 3){
            if (mobCurrent !== 2){
                setMobCurrent(mobCurrent + 1)
            }
        }
        else if (relatedProducts.length === 2){
            if (mobCurrent !== 1){
                setMobCurrent(mobCurrent + 1)
            }
        }
    }

    const products = () => {
        navigate("/products")
    }

    const updateQty = (e) => {
        setProductQty(e.target.value)
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
                                <button className="btn" onClick={products}><i class="bi bi-arrow-90deg-left"></i></button>
                            </div>
                            <div className="col-6">
                                <img src={product.image_url} className="desktop-single-product" />
                                {/* <Accordion flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Description</Accordion.Header>
                                    <Accordion.Body>
                                        {product.description}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion> */}
                            </div>
                            <div className="col-6">
                                <h3 className="m-0 pdt-padding product-name">{product.name}</h3>
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
                                {/* <p style={{"fontSize": "12px", "fontStyle": "italic"}}>{product.description}</p> */}
                                <div className="d-flex pdt-padding">
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
                                <div></div>
                                <div className="container d-flex justify-content-center align-items-center mt-3">
                                    <button className="btn qty-btn" onClick={() => productQty > 1 ? setProductQty(parseInt(productQty) - 1) : null} disabled={productQty > product.quantity}><i class="bi bi-dash-circle-fill"></i></button>
                                    <input type="text" className="form-control text-center" name="productQty" value={productQty}
                                        onChange={updateQty} style={{ "width": "50px", "display": "inline-block" }} disabled={productQty > product.quantity} />
                                    <button className="btn qty-btn" onClick={() => productQty >= 1 ? setProductQty(parseInt(productQty) + 1) : null} disabled={productQty > product.quantity}><i class="bi bi-plus-circle-fill"></i></button>
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
                                <h4>${(product.cost / 100).toFixed(2)}</h4>
                                <div className="d-flex justify-content-center mob-table">
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
                                <div className="container d-flex justify-content-center align-items-center mt-3">
                                    <button className="btn btn-sm qty-btn" onClick={() => productQty > 1 ? setProductQty(parseInt(productQty) - 1) : null} disabled={productQty > product.quantity}><i class="bi bi-dash-circle-fill"></i></button>
                                    <input type="text" className="form-control text-center" name="productQty" value={productQty}
                                        onChange={updateQty} style={{ "width": "50px", "display": "inline-block" }} disabled={productQty > product.quantity} />
                                    <button className="btn btn-sm qty-btn" onClick={() => productQty >= 1 ? setProductQty(parseInt(productQty) + 1) : null} disabled={productQty > product.quantity}><i class="bi bi-plus-circle-fill"></i></button>
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
                                            <div className="col-12 col-md-4">
                                                <div className="mx-auto card m-2 card-border" style={{ "width": "16rem" }}>
                                                    <div className="tags-overlay">
                                                        <img src={each.image_url} className={"class-img-top card-img" + (each.quantity ? "" : " sold-out-img")} />
                                                        {!each.quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                        {!each.launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                                        {each.blind_box ? <span className="blind-box-tag badge bg-warning text-dark"><i class="bi bi-patch-question-fill"></i></span> : null}
                                                    </div>
                                                    <div className="card-body pb-0">
                                                        <h5 className="card-title view-more text-truncate mb-0" onClick={() => showProduct(each.id)}>{each.name}</h5>
                                                        <span className="figure-type">{each.figure_type.figure_type} figure</span>
                                                        <h4>${(each.cost / 100).toFixed(2)}</h4>
                                                        <div>
                                                            {/* <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span> */}
                                                            <span className="badge card-badges m-1">{each.series.series_name}</span> <br />
                                                            {/* <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span> */}
                                                            <span className="badge card-badges m-1">{each.collection.collection_name}</span> <br />
                                                            {/* <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span> */}
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
                                            <button className="btn" onClick={mobLeft}><i class="bi bi-caret-left-fill"></i></button>
                                        </div>
                                        <div className="col-8">
                                            <div className="mx-auto card m-2 card-border" style={{ "width": "16rem" }}>
                                                <div className="tags-overlay">
                                                    <img src={relatedProducts[mobCurrent].image_url} className={"class-img-top card-img" + (relatedProducts[mobCurrent].quantity ? "" : " sold-out-img")} />
                                                    {!relatedProducts[mobCurrent].quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                    {!relatedProducts[mobCurrent].launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                                    {relatedProducts[mobCurrent].blind_box ? <span className="blind-box-tag badge bg-warning text-dark"><i class="bi bi-patch-question-fill"></i></span> : null}
                                                </div>
                                                <div className="card-body pb-0">
                                                    <h5 className="card-title view-more text-truncate mb-0" onClick={() => showProduct(relatedProducts[mobCurrent].id)}>{relatedProducts[mobCurrent].name}</h5>
                                                    <span className="figure-type">{relatedProducts[mobCurrent].figure_type.figure_type} figure</span>
                                                    <h4>${(relatedProducts[mobCurrent].cost / 100).toFixed(2)}</h4>
                                                    <div>
                                                        {/* <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span> */}
                                                        <span className="badge card-badges m-1">{relatedProducts[mobCurrent].series.series_name}</span> <br />
                                                        {/* <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span> */}
                                                        <span className="badge card-badges m-1">{relatedProducts[mobCurrent].collection.collection_name}</span> <br />
                                                        {/* <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span> */}
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
                                            <button className="btn" onClick={mobRight}><i class="bi bi-caret-right-fill"></i></button>
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
                        <img src={require("../images/loader.gif")} className="loader-size" />
                    </div>
                }
            </React.Fragment>

                :
                <div className="d-flex justify-content-center">
                    <img src={require("../images/loader.gif")} className="loader-size" />
                </div>
            }
        </React.Fragment >

    )
}