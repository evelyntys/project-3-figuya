import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';

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
    return (
        <React.Fragment>
            <div className="d-none d-lg-block">
                <div className="header-wrapper">
                    <video className="header-banner" loop muted autoPlay>
                        <source src={require('../images/header.mp4')} type="video/mp4" />
                    </video>
                    <div className="overlay">
                        Use FREESHIPPING for free standard shipping on purchases over $100 <br />
                        <button className="btn header-btn" onClick={products}>Shop now</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 landing-box">
                        Action Figures <br />
                        A poseable character model figure, which may have movable figure parts
                    </div>
                    <div className="col-3 landing-box">
                        Complete Figures <br />
                        Typically fixed in position and unmoveable figure parts
                    </div>
                    <div className="col-3 landing-box">
                        Scale Figures <br />
                        Fixed-pose figures that are sized based on the “actual” dimensions of the character, with a size reference
                    </div>
                    <div className="col-3 landing-box">
                        Blind boxes<br />
                        Blind Box refers to the type of packaging that keeps the collectible toy as a mystery until it is opened. Some figurines are rarer to find than others, these are referred to as "secret", "hidden" or "chase" figures.
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
                {/* <div className="row">
                    <div className="col-6 landing-box">
                        Action Figures <br />
                        A poseable character model figure, which may have movable figure parts
                    </div>
                    <div className="col-6 landing-box">
                        Complete Figures <br />
                        Typically fixed in position and unmoveable figure parts
                    </div>
                    <div className="col-6 landing-box">
                        Scale Figures <br />
                        Fixed-pose figures that are sized based on the “actual” dimensions of the character, with a size reference
                    </div>
                    <div className="col-6 landing-box">
                        Blind boxes<br />
                        Blind Box refers to the type of packaging that keeps the collectible toy as a mystery until it is opened. Some figurines are rarer to find than others, these are referred to as "secret", "hidden" or "chase" figures.
                    </div>
                </div> */}
            </div>
        </React.Fragment>
    )
}