import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import Carousel from 'react-bootstrap/Carousel';
import ProductListing from './ProductListings';
import CartContext from '../context/CartContext';
import { ToastContainer } from 'react-toastify';

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

    // const [index, setIndex] = React.useState(0);

    // const handleSelect = (selectedIndex, e) => {
    //     setIndex(selectedIndex);
    // }

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
                            alt="First slide"
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
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Complete Figures</h3>
                            <p className="caro-p">Typically fixed in position and unmoveable figure parts.</p>
                            <button className="btn header-btn" onClick={complete}>See all complete figures</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <img
                            className="d-block w-100 caro-overlay"
                            src={require('../images/scale.jpg')}
                            alt="First slide"
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
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Blind boxes</h3>
                            <p className="caro-p">
                                Collectible toy is kept as a mystery until it is opened.<br />
                                Some figurines are rarer to find than others, these are referred to as "secret", "hidden" or "chase" figures.
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
                                <div className="col-12 mt-3 mx-auto d-flex d-none d-md-block justify-content-center mob-content">
                                    <div className="row align-items-center">
                                        <div className="col-2 text-end">
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
                                        <div className="col-2">
                                            <button className="btn" onClick={rightArrow}><i class="bi bi-caret-right-fill"></i></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-md-none mx-auto container justify-content-center row align-items-center">
                                    <div className="col-2">
                                        <button className="btn" onClick={mobLeft}><i class="bi bi-caret-left-fill"></i></button>
                                    </div>
                                    <div className="col-8">
                                        <div className="mx-auto card card-border" style={{ "width": "14rem" }}>
                                            <div className="tags-overlay">
                                                <img src={newProducts[mobCurrent].image_url} className={"class-img-top card-img" + (newProducts[mobCurrent] ? "" : " sold-out-img")} />
                                                {!newProducts[mobCurrent].quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                {!newProducts[mobCurrent].launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                                {newProducts[mobCurrent].blind_box ? <span className="blind-box-tag badge bg-warning text-dark"><i class="bi bi-patch-question-fill"></i></span> : null}
                                            </div>
                                            <div className="card-body pb-0">
                                                <h5 className="card-title view-more text-truncate mb-0" onClick={() => showProduct(newProducts[mobCurrent].id)}>{newProducts[mobCurrent].name}</h5>
                                                <span className="figure-type">{newProducts[mobCurrent].figure_type.figure_type} figure</span>
                                                <h4>${(newProducts[mobCurrent].cost / 100).toFixed(2)}</h4>
                                                <div>
                                                    {/* <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span> */}
                                                    <span className="badge card-badges m-1">{newProducts[mobCurrent].series.series_name}</span> <br />
                                                    {/* <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span> */}
                                                    <span className="badge card-badges m-1">{newProducts[mobCurrent].collection.collection_name}</span> <br />
                                                    {/* <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span> */}
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
                                        <button className="btn" onClick={mobRight}><i class="bi bi-caret-right-fill"></i></button>
                                    </div>
                                </div>

                            </React.Fragment>

                            // <div className="col-12 mt-3 d-flex flex-column justify-content-center mob-content">
                            //     <h4 className="text-center">Check out the latest products</h4>
                            //     <div className="col-2">Previous</div>
                            //     <div className="col-8 d-flex flex-wrap justify-content-center">
                            //         <ProductListing products={newProducts} showProduct={showProduct}
                            //             cartContext={cartContext} />
                            //     </div>
                            //     <div className="col-2">Next</div>
                            // </div>
                            // :
                            // <div height="10vh">
                            // </div>
                            : null}
                    </div>
                    :
                    <div className="container d-flex justify-content-center align-items-center">
                        <img className="loader-size" src={require("../images/loader.gif")} />
                    </div>
                }
            </div>
            {/* <div className="d-none d-lg-block">
                <div className="header-wrapper">
                    <video className="header-banner" loop muted autoPlay>
                        <source src={require('../images/header.mp4')} type="video/mp4" />
                    </video>
                    <div className="overlay">
                        Use FREESHIPPING for free standard shipping on purchases over $100 <br />
                        <button className="btn header-btn" onClick={products}>Shop now</button>
                    </div>
                </div>
                <div className="">
                    <div className="row justify-content-center">
                        <div className="col-10 m-1 landing-box">
                            Action Figures <br />
                            A poseable character model figure, which may have movable figure parts
                        </div>
                        <div className="col-10 m-1 landing-box">
                            Complete Figures <br />
                            Typically fixed in position and unmoveable figure parts
                        </div>
                        <div className="col-10 m-1 landing-box">
                            Scale Figures <br />
                            Fixed-pose figures that are sized based on the “actual” dimensions of the character, with a size reference
                        </div>
                        <div className="col-10 m-1 landing-box">
                            Blind boxes<br />
                            Blind Box refers to the type of packaging that keeps the collectible toy as a mystery until it is opened. Some figurines are rarer to find than others, these are referred to as "secret", "hidden" or "chase" figures.
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-lg-none mob-content">
                <div className="header-mobile">
                    <video className="video-mobile" loop muted autoPlay>
                        <source src={require('../images/header.mp4')} type="video/mp4" />
                    </video>
                    <div className="mobile-overlay">
                        Use FREESHIPPING for free standard shipping on purchases over $100 <br />
                        <button className="btn btn-sm header-btn my-1" onClick={products}>Shop now</button>
                    </div>
                </div>

                <div className="mob-container container">
                    <div className="row mx-1">
                        <div className="col-12 my-1 figures-container" onClick={action}>
                            Action Figures <br />
                            A poseable character model figure, which may have movable figure parts
                        </div>
                        <div className="col-12 my-1 figures-container" onClick={complete}>
                            Complete Figures <br />
                            Typically fixed in position and unmoveable figure parts
                        </div>
                        <div className="col-12 my-1 figures-container" onClick={scale}>
                            Scale Figures <br />
                            Fixed-pose figures that are sized based on the “actual” dimensions of the character, with a size reference
                        </div>
                        <div className="col-12 my-1 figures-container" onClick={blind}>
                            Blind boxes<br />
                            Blind Box refers to the type of packaging that keeps the collectible toy as a mystery until it is opened. Some figurines are rarer to find than others, these are referred to as "secret", "hidden" or "chase" figures.
                        </div>
                    </div>
                </div>
            </div> */}
        </React.Fragment>
    )
}