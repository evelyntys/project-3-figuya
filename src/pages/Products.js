import React from 'react';
import ProductContext from '../context/ProductContext';

export default function Products() {
    const context = React.useContext(ProductContext);
    const [products, setProducts] = React.useState(context.getProducts());

    return (
        <React.Fragment>
            <div className="row my-2">
                <div className="col-12 col-md-3">
                    <div className="container">
                        <h1>Search</h1>
                    </div>
                </div>
                <div className="col-12 col-md-9">
                    <div className="container">
                        <h1>Products</h1>
                    </div>
                </div>
            </div>
            <div className="row my-2">
                <div className="col-12 col-md-3">
                    <div className="container m-2" style={{ "border": "1px solid black", "borderRadius": "0.25rem" }}>
                        <div>
                            <label>Search:</label>
                            <input type="text" className="form-control" placeholder="e.g. one piece, levi ackerman" />
                            <button className="btn btn-dark btn-sm">Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-9">
                    <div className="container d-flex justify-content-evenly">
                        {context.getProducts().map(each => {
                            return (
                                <div className="card" style={{ "width": "16rem", "border": "1px solid black" }}>
                                    <img src={each.image_url} className="class-img-top" style={{
                                        "height": "10rem",
                                        "width": "100%", "objectFit": "contain", "border": "1px solid black"
                                    }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{each.name}</h5>
                                        <span className="card-text d-inline-block text-truncate"
                                            style={{ "maxWidth": "100%", "maxHeight": "200px" }}>
                                            {each.description}</span><br />
                                        <h6>${(each.cost / 100).toFixed(2)}</h6>
                                        {each.launch_status ? "" : <span className="badge bg-danger">PRE-ORDER</span>}
                                        <div>
                                            <span className="badge bg-dark mx-1">{each.series.series_name}</span>
                                            <span className="badge bg-dark mx-1">{each.collection.collection_name}</span>
                                            {each.series.mediums.map(eachMedium => {
                                                return (<span className="badge bg-dark mx-1">{eachMedium.media_medium}</span>)
                                            })}
                                            <span className="badge bg-dark mx-1">{each.manufacturer.manufacturer_name}</span>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-end">
                                            <button className="btn btn-sm">Cart</button>
                                            <button className="btn btn-sm">View more</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}