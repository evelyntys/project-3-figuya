import React from 'react';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';

export default function SingleProduct() {
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    const product = productContext.getProductToShow();
    const [productQty, setProductQty] = React.useState(1);

    const updateQty = (e) => {
        setProductQty(e.target.value)
    }

    return (
        <React.Fragment>
            <div className="container">
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
                    <button className="btn btn-sm" onClick={() => productQty >=1 ? setProductQty(parseInt(productQty) + 1) : null}>+</button>
                    <input type="text" className="form-control text-center" name="productQty" value={productQty}
                        onChange={updateQty} style={{ "width": "50px", "display": "inline-block" }} />
                    <button className="btn btn-sm" onClick={() => productQty >1? setProductQty(parseInt(productQty) - 1): null}>-</button>
                </div>
                <button className="btn btn-dark" onClick={() => cartContext.addToCart(product.id, productQty)}>Add to cart</button>
                <span className="badge bg-warning">{product.series.series_name}</span>
                <span className="badge bg-warning">{product.collection.collection_name}</span>
                <span className="badge bg-warning">{product.manufacturer.manufacturer_name}</span>
                {product.series.mediums.map(eachMedium => {
                    return (
                        <span className="badge bg-warning">{eachMedium.media_medium}</span>
                    )
                })}
            </div>
        </React.Fragment>

    )
}