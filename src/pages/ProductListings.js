import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function ProductListing(props) {
    const products = props.products;
    return (
        <React.Fragment>
            {products.map(each => {
                return (
                    <div className="col-12 col-md-4">
                        <div className="mx-auto card m-2 card-border" style={{ "width": "16rem" }}>
                            <div className="tags-overlay">
                                <img src={each.image_url} className={"class-img-top card-img" + (each.quantity ? "" : " sold-out-img")} />
                                {!each.quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                {!each.launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                {each.blind_box ?
                                    <OverlayTrigger key={'top'} placement={'top'} overlay={<Tooltip id={'tooltip-top'}>Blind-box</Tooltip>}>
                                        <span className="blind-box-tag badge bg-warning text-dark"><i class="bi bi-patch-question-fill"></i></span>
                                    </OverlayTrigger>
                                    : null}
                            </div>
                            <div className="card-body pb-0">
                                <h5 className="card-title view-more text-truncate mb-0" onClick={() => props.showProduct(each.id)}>{each.name}</h5>
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
                            {/* <div className="d-flex justify-content-end align-items-end my-1">
                <button className="btn card-btn mx-1" disabled={each.quantity < 1}
                    onClick={() => cartContext.addToCart(each.id, 1)}>
                    ADD TO CART
                </button>
            </div> */}
                            <button className="btn card-btn btn-sm m-1" disabled={each.quantity < 1}
                                onClick={() => props.cartContext.addToCart(each.id, 1)}>
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                )
            })}
        </React.Fragment>
    )
}