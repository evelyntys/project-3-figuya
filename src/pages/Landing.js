import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import Carousel from 'react-bootstrap/Carousel';

export default function Landing() {
    const navigate = useNavigate();
    const products = () => {
        navigate("/products")
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

    const productContext = React.useContext(ProductContext);

    // const [index, setIndex] = React.useState(0);

    // const handleSelect = (selectedIndex, e) => {
    //     setIndex(selectedIndex);
    // }

    return (
        <React.Fragment>
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
                                Collectible toy is kept as a mystery until it is opened.<br/>
                                Some figurines are rarer to find than others, these are referred to as "secret", "hidden" or "chase" figures.
                            </p>
                            <button className="btn caro-btn" onClick={blind}>Test your luck today!</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
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