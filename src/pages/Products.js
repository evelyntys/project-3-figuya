import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';
import { toast, ToastContainer } from 'react-toastify';

export default function Products() {
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    const navigate = useNavigate();
    
    const addToCart = async (figureId) => {
        const addToast = toast.loading("Adding to cart");
        await cartContext.addToCart(figureId, 1);
        toast.update(addToast, {
            render: 'Added to cart',
            type: "success",
            isLoading: false,
            autoClose: 1000
        })
        
    }

    const [searchBox, setSearchBox] = React.useState({
        search: "",
        min_cost: "",
        max_cost: "",
        figureType: 0,
        collection: 0
    })

    const [figureTypes, setFigureTypes] = React.useState([]);

    useEffect(() => {
        async function defaultState() {
            let figureTypes = productContext.getFigureType();
            await setFigureTypes(figureTypes);
        }
        defaultState();
    }, []);

    const showProduct = async (id) => {
        console.log(productContext.getFigureType());
        let product = await productContext.showProduct(id);
        navigate(`/products/${id}`)
    }

    const updateSearchField = (e) => {
        setSearchBox({
            ...searchBox,
            [e.target.name]: e.target.value
        })
    }

    return (
        <React.Fragment>
            <ToastContainer position="bottom-right"/>
            <div className="container">
                <div className="row my-2">
                    <div className="col-12 col-md-3">
                        <div className="container">
                            <h1>Search</h1>
                        </div>
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="container">
                            <h1>Showing {productContext.getProducts().length} product(s)</h1>
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-12 col-md-3">
                        <div className="container m-2" style={{ "border": "1px solid black", "borderRadius": "0.25rem" }}>
                            <div>
                                <label>Search:</label>
                                <input type="text" className="form-control" value={searchBox.search}
                                    placeholder="e.g. one piece, levi ackerman" onChange={updateSearchField}
                                    name="search" />
                                <div className="row">
                                    <div className="col">
                                        <label>Min cost:</label>
                                        <input type="text" className="form-control" value={searchBox.min_cost}
                                            placeholder="0" onChange={updateSearchField}
                                            name="min_cost" />
                                        <div className="col">
                                            <label>Max cost:</label>
                                            <input type="text" className="form-control" value={searchBox.max_cost}
                                                placeholder="100" onChange={updateSearchField}
                                                name="max_cost" />
                                        </div>
                                    </div>
                                </div>
                                <select className="form-select" value={searchBox.figureType} onChange={updateSearchField} name="figureType">
                                    <option selected={searchBox.figureType == 0}>Choose a figure type</option>
                                    {productContext.getFigureType().map(each => {
                                        return <option value={each[0]} selected={searchBox.figureType == each[0]}>{each[1]}</option>
                                    })}
                                </select>
                                <select className="form-select" value={searchBox.collection} onChange={updateSearchField} name="collection">
                                    <option selected={searchBox.collection == 0}>Choose a collection</option>
                                    {productContext.getCollections().map(each => {
                                        return <option value={each[0]} selected={searchBox.collection == each[0]}>{each[1]}</option>
                                    })}
                                </select>
                                <button className="btn btn-dark btn-sm my-2" onClick={() => productContext.filterProducts(searchBox)}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="container d-flex justify-content-evenly flex-wrap">
                            {productContext.getProducts().map(each => {
                                return (
                                    <div className="card my-2" style={{ "width": "16rem", "border": "1px solid black" }}>
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
                                                <button className="btn btn-sm" onClick={() => addToCart(each.id)}>Cart</button>
                                                <button className="btn btn-sm" onClick={() => showProduct(each.id)}>View more</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}