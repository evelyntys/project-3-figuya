import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import Carousel from 'react-bootstrap/Carousel';
import ProductListing from './ProductListings';
import CartContext from '../context/CartContext';
import { ToastContainer } from 'react-toastify';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';

export default function Landing() {
    const navigate = useNavigate();
    const products = () => {
        navigate("/products")
    }
    const [loader, setLoader] = React.useState();
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    const [newProducts, setNewProducts] = React.useState([]);
    const [firstPage, setFirstPage] = React.useState([]);
    const [secondPage, setSecondPage] = React.useState([]);
    const [page, setPage] = React.useState("1");
    const [mobCurrent, setMobCurrent] = React.useState(0);

    const mobLeft = () => {
        if (mobCurrent !== 0) {
            setMobCurrent(mobCurrent - 1)
        }
    }

    const mobRight = () => {
        if (mobCurrent !== 5) {
            setMobCurrent(mobCurrent + 1)
        }
    }

    const leftArrow = () => {
        setPage("1")
    }

    const rightArrow = () => {
        setPage("2")
    }

    useEffect(() => {
        async function getProducts() {
            setLoader(true)
            let newProducts = await productContext.getNewlyListed();
            console.log('mount', newProducts);
            await setNewProducts(newProducts);
            setFirstPage(newProducts.slice(0, 3));
            setSecondPage(newProducts.slice(3));
            setLoader(false)
        }
        getProducts();
    }, [])


    const showProduct = async (id) => {
        let product = await productContext.showProduct(id);
        navigate(`/products/${id}`)
    }

    const action = async () => {
        await productContext.getActionFigures();
        navigate("/products")
    };

    const complete = async () => {
        await productContext.getCompleteFigures();
        navigate("/products")
    };

    const scale = async () => {
        await productContext.getScaleFigures();
        navigate("/products")
    };

    const blind = async () => {
        await productContext.getBlindBox();
        navigate("/products")
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="mob-content">
                <div className="header-wrapper">
                    <video className="header-banner" loop muted autoPlay>
                        <source src={require('../images/header.mp4')} type="video/mp4" />
                    </video>
                    <div className="overlay">
                        Use FREESHIPPING for free standard shipping on purchases over $100 <br />
                        <button className="btn header-btn" onClick={products}>Shop now</button>
                    </div>
                </div>
                <Carousel>
                    <Carousel.Item interval={10000}>
                        <img
                            className="d-block w-100 caro-overlay"
                            src={require('../images/action.jpg')}
                            alt="action figures"
                        />
                        <Carousel.Caption>
                            <h3>Action Figures</h3>
                            <p className="caro-p"> A poseable character model figure, which may have movable figure parts.</p>
                            <button className="btn header-btn" onClick={action}>See all action figures</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <img
                            className="d-block w-100 caro-overlay"
                            src={require('../images/complete.jpeg')}
                            alt="complete digures"
                        />
                        <Carousel.Caption>
                            <h3>Complete Figures</h3>
                            <p className="caro-p">Typically fixed in position and have unmoveable figure parts.</p>
                            <button className="btn header-btn" onClick={complete}>See all complete figures</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <img
                            className="d-block w-100 caro-overlay"
                            src={require('../images/scale.jpg')}
                            alt="scale figures"
                        />
                        <Carousel.Caption>
                            <h3>Scale Figures</h3>
                            <p className="caro-p">
                                Fixed-pose figures that are sized based on the “actual” dimensions of the character, with a size reference.
                            </p>
                            <button className="btn header-btn" onClick={scale}>See all scale figures</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <img
                            className="d-block w-100 caro-overlay"
                            src={require('../images/blind_box.jpg')}
                            alt="blind boxes"
                        />
                        <Carousel.Caption>
                            <h3>Blind boxes</h3>
                            <p className="caro-p">
                                Collectible toy that is kept as a mystery until it is opened.<br />
                                Some figurines are rarer and harder to find than others, and may be known as "secret", "hidden" or "chase" figures.
                            </p>
                            <button className="btn caro-btn" onClick={blind}>Test your luck today!</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                {!loader ?
                    <div>
                        <h4 className="text-center">Check out the latest products</h4>
                        {newProducts.length ?
                            <React.Fragment>
                                <div className="container col-12 mt-3 mx-auto d-flex d-none d-lg-block justify-content-center mob-content">
                                    <div className="row align-items-center justify-content-center" style={{ "overflow": "hidden" }}>
                                        <div className="col-1 col-lg-2 text-end">
                                            <button className="btn" onClick={leftArrow}>
                                                <i class="bi bi-caret-left-fill"></i>
                                            </button>
                                        </div>
                                        <div className="col-8 d-flex flex-wrap justify-content-center">
                                            {page === "1" ?
                                                <ProductListing products={firstPage} showProduct={showProduct}
                                                    cartContext={cartContext} />
                                                :
                                                <ProductListing products={secondPage} showProduct={showProduct}
                                                    cartContext={cartContext} />
                                            }
                                        </div>
                                        <div className="col-1 col-lg-2">
                                            <button className="btn" onClick={rightArrow}><i className="bi bi-caret-right-fill"></i></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-lg-none mx-auto container justify-content-center row align-items-center">
                                    <div className="col-2">
                                        <button className="btn" onClick={mobLeft}><i className="bi bi-caret-left-fill"></i></button>
                                    </div>
                                    <div className="col-8">
                                        <div className="mx-auto card card-border" style={{ "width": "14rem" }}>
                                            <div className="tags-overlay">
                                                <img src={newProducts[mobCurrent].image_url} alt="figure" className={"class-img-top card-img" + (newProducts[mobCurrent] ? "" : " sold-out-img")} />
                                                {!newProducts[mobCurrent].quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                {!newProducts[mobCurrent].launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                                {newProducts[mobCurrent].blind_box ?
                                                    <OverlayTrigger key={'top'} placement={'top'} overlay={<Tooltip id={'tooltip-top'}>Blind-box</Tooltip>}>
                                                        <span className="blind-box-tag badge bg-warning text-dark"><i className="bi bi-patch-question-fill"></i></span>
                                                    </OverlayTrigger>
                                                    : null}
                                            </div>
                                            <div className="card-body pb-0">
                                                <h5 className="card-title view-more text-truncate mb-0" onClick={() => showProduct(newProducts[mobCurrent].id)}>{newProducts[mobCurrent].name}</h5>
                                                <span className="figure-type">{newProducts[mobCurrent].figure_type.figure_type} figure</span>
                                                <h4>${(newProducts[mobCurrent].cost / 100).toFixed(2)}</h4>
                                                <div>
                                                    <span className="badge card-badges m-1">{newProducts[mobCurrent].series.series_name}</span> <br />
                                                    <span className="badge card-badges m-1">{newProducts[mobCurrent].collection.collection_name}</span> <br />
                                                    <span className="badge card-badges m-1">{newProducts[mobCurrent].manufacturer.manufacturer_name}</span> <br />
                                                </div>
                                            </div>
                                            <button className="btn card-btn btn-sm m-1" disabled={newProducts[mobCurrent].quantity < 1}
                                                onClick={() => cartContext.addToCart(newProducts[mobCurrent].id, 1)}>
                                                ADD TO CART
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-2 text-start">
                                        <button className="btn" onClick={mobRight}><i className="bi bi-caret-right-fill"></i></button>
                                    </div>
                                </div>
                            </React.Fragment>
                            : null}
                    </div>
                    :
                    <div className="container d-flex justify-content-center align-items-center">
                        <img className="loader-size" src={require("../images/loader.gif")} alt="loader" />
                    </div>
                }
            </div>
        </React.Fragment>
    )
}