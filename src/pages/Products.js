import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';
import { toast, ToastContainer } from 'react-toastify';

export default function Products() {
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    const navigate = useNavigate();

    const [searchBox, setSearchBox] = React.useState({
        search: "",
        min_cost: "",
        max_cost: "",
        figureType: [],
        collection: 0,
        min_height: "",
        max_height: "",
        blind_box: "a",
        launch_status: "a",
        series: ""
    })

    const [figureTypes, setFigureTypes] = React.useState([]);

    useEffect(() => {
        async function defaultState() {
            let figureTypes = productContext.getFigureType();
            await setFigureTypes(figureTypes);
        }
        defaultState();
    }, []);

    const showProduct = async (productId) => {
        // let product = await productContext.showProduct(productId);
        // console.log(product)
        navigate(`/products/${productId}`)
    }

    const updateSearchField = (e) => {
        setSearchBox({
            ...searchBox,
            [e.target.name]: e.target.value
        })
    };

    const updateCheckboxes = (e) => {
        if (searchBox[e.target.name].includes(e.target.value)) {
            let indexToRemove = searchBox[e.target.name].indexOf(e.target.value);

            let cloned = [...searchBox[e.target.name].slice(0, indexToRemove),
            ...searchBox[e.target.name].slice(indexToRemove + 1)]
            setSearchBox({
                ...searchBox,
                [e.target.name]: cloned
            })
        }
        else {
            let cloned = [...searchBox[e.target.name], e.target.value]
            setSearchBox({
                ...searchBox,
                [e.target.name]: cloned
            })
        }
    }

    const resetSearch = async () => {
        setSearchBox({
            search: "",
            min_cost: "",
            max_cost: "",
            figureType: [],
            collection: 0,
            min_height: "",
            max_height: "",
            blind_box: "a",
            launch_status: "a",
            series: ""
        });
        const emptySearch = {
            search: "",
            min_cost: "",
            max_cost: "",
            figureType: [],
            collection: 0,
            min_height: "",
            max_height: "",
            blind_box: "a",
            launch_status: "a",
            series: ""
        };
        await productContext.filterProducts(emptySearch);
    }

    return (
        <React.Fragment>
            <ToastContainer position="bottom-right" />
            <div className="d-none d-lg-block">
                <div className="row my-2 mx-2">
                    <div className="col-12 col-lg-3">
                        <div className="container">
                            <h1>Search</h1>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9">
                        <div className="container">
                            <h1>Showing {productContext.getProducts().length} product(s):</h1>
                        </div>
                    </div>
                </div>
                <div className="row my-2 mx-2">
                    <div className="col-12 col-lg-3">
                        <div className="row search-box">

                            <div className="col-12">
                                <label>Search:</label>
                                <input type="text" className="form-control" value={searchBox.search}
                                    placeholder="e.g. one piece, levi ackerman" onChange={updateSearchField}
                                    name="search" />
                            </div>
                            <div className="col-12">
                                <label>Series:</label>
                                <input type="text" className="form-control" value={searchBox.series}
                                    placeholder="e.g. one piece, levi ackerman" onChange={updateSearchField}
                                    name="series" />
                            </div>

                            <div className="col-6">
                                <label>Min cost:</label>
                                <input type="text" className="form-control" value={searchBox.min_cost}
                                    placeholder="0" onChange={updateSearchField}
                                    name="min_cost" />
                            </div>
                            <div className="col-6">
                                <label>Max cost:</label>
                                <input type="text" className="form-control" value={searchBox.max_cost}
                                    placeholder="100" onChange={updateSearchField}
                                    name="max_cost" />
                            </div>

                            <div className="col-12">
                                <div><label>Figure Type: </label></div>
                                {/* <select className="form-select" value={searchBox.figureType} onChange={updateSearchField} name="figureType">
                                    <option value={0} selected={searchBox.figureType == 0}>Choose a figure type</option>
                                    {productContext.getFigureType().map(each => {
                                        return <option value={each[0]} selected={searchBox.figureType == each[0]}>{each[1]}</option>
                                    })}
                                </select> */}
                                {productContext.getFigureType().map(each => {
                                    return (
                                        <div className="form-check">
                                            <label className="form-label">{each[1]}
                                                <input type="checkbox" className="form-check-input"
                                                    value={each[0]} name="figureType"
                                                    checked={searchBox.figureType.includes(each[0].toString())} onChange={updateCheckboxes} />
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="col-12">
                                <select className="form-select" value={searchBox.collection} onChange={updateSearchField} name="collection">
                                    <option value={0} selected={searchBox.collection == 0}>Choose a collection</option>
                                    {productContext.getCollections().map(each => {
                                        return <option value={each[0]} selected={searchBox.collection == each[0]}>{each[1]}</option>
                                    })}
                                </select>
                            </div>

                            <div className="col-6">
                                <label>Min height:</label>
                                <input type="text" className="form-control" value={searchBox.min_height}
                                    placeholder="0" onChange={updateSearchField}
                                    name="min_height" />
                            </div>
                            <div className="col-6">
                                <label>Max height:</label>
                                <input type="text" className="form-control" value={searchBox.max_height}
                                    placeholder="100" onChange={updateSearchField}
                                    name="max_height" />
                            </div>

                            <div>
                                <div><label>Preorder?</label></div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="launch_status"
                                            value="0" onChange={updateSearchField} checked={searchBox.launch_status == "0"} />
                                        Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="launch_status"
                                            value="1" onChange={updateSearchField} checked={searchBox.launch_status == "1"} />
                                        No</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="launch_status"
                                            value="a" onChange={updateSearchField} checked={searchBox.launch_status == "a"} />
                                        Any</label>
                                </div>
                            </div>
                            <div>
                                <div><label>Blindbox?</label></div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="blind_box"
                                            value="1" onChange={updateSearchField} checked={searchBox.blind_box = "1"} />
                                        Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="blind_box"
                                            value="0" onChange={updateSearchField} checked={searchBox.blind_box = "0"} />
                                        No</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="blind_box"
                                            value="a" onChange={updateSearchField} checked={searchBox.blind_box = "a"} />
                                        Any</label>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn main-btn btn-sm my-2 mx-1" onClick={resetSearch}>Reset</button>
                                <button className="btn main-btn btn-sm my-2 mx-1" onClick={() => productContext.filterProducts(searchBox)}>Search</button>
                            </div>

                        </div>
                    </div>
                    <div className="col-12 col-lg-9">
                        <div className="container d-flex justify-content-evenly flex-wrap">
                            {productContext.getProducts().map(each => {
                                return (
                                    <div className="card my-2 card-border" style={{ "width": "16rem" }}>
                                        <img src={each.image_url} className="class-img-top card-img" />
                                        <div className="card-body pb-0">
                                            {each.launch_status ? "" : <span className="badge bg-danger">PRE-ORDER</span>}
                                            <h5 className="card-title view-more" onClick={() => showProduct(each.id)}>{each.name}</h5>
                                            <span className="card-text d-inline-block text-truncate"
                                                style={{ "maxWidth": "100%", "maxHeight": "200px" }}>
                                                {each.description}</span><br />
                                            <h6>${(each.cost / 100).toFixed(2)}</h6>
                                            <div>
                                                <span><i class="bi bi-tags-fill" style={{ "color": "#F18300" }}></i></span>
                                                <span className="badge card-badges mx-1">{each.figure_type.figure_type} figure</span>
                                                <span className="badge card-badges mx-1">{each.series.series_name}</span>
                                                <span className="badge card-badges mx-1">{each.collection.collection_name}</span>
                                                {each.series.mediums.map(eachMedium => {
                                                    return (<span className="badge card-badges mx-1">{eachMedium.media_medium}</span>)
                                                })}
                                                <span className="badge card-badges mx-1">{each.manufacturer.manufacturer_name}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-end my-1">
                                            <button className="btn btn-sm card-btn mx-1" onClick={() => cartContext.addToCart(each.id, 1)}><i class="bi bi-cart-plus-fill"></i></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-lg-none">
                <div className="row my-2">
                    <div className="col-12 col-lg-3">
                        <div className="container search-box mx-1">
                            <div className="row">
                                <div className="col-5 my-1">
                                    <label>Search:</label>
                                    <input type="text" className="form-control" value={searchBox.search}
                                        placeholder="e.g. one piece, levi ackerman" onChange={updateSearchField}
                                        name="search" />
                                </div>
                                <div className="col-3 my-1">
                                    <label>Min cost:</label>
                                    <input type="text" className="form-control" value={searchBox.min_cost}
                                        placeholder="0" onChange={updateSearchField}
                                        name="min_cost" />
                                </div>
                                <div className="col-4 my-1">
                                    <label>Max cost:</label>
                                    <input type="text" className="form-control" value={searchBox.max_cost}
                                        placeholder="100" onChange={updateSearchField}
                                        name="max_cost" />
                                </div>
                            </div>
                            <select className="form-select my-1" value={searchBox.figureType} onChange={updateSearchField} name="figureType">
                                <option value={0} selected={searchBox.figureType == 0}>Choose a figure type</option>
                                {productContext.getFigureType().map(each => {
                                    return <option value={each[0]} selected={searchBox.figureType == each[0]}>{each[1]}</option>
                                })}
                            </select>
                            <select className="form-select my-1" value={searchBox.collection} onChange={updateSearchField} name="collection">
                                <option value={0} selected={searchBox.collection == 0}>Choose a collection</option>
                                {productContext.getCollections().map(each => {
                                    return <option value={each[0]} selected={searchBox.collection == each[0]}>{each[1]}</option>
                                })}
                            </select>
                            <button className="btn main-btn btn-sm my-2" onClick={() => productContext.filterProducts(searchBox)}>Search</button>
                            <button className="btn main-btn btn-sm my-2" onClick={resetSearch}>Reset</button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9">
                        <div className="container">
                            <h1>Showing {productContext.getProducts().length} product(s):</h1>
                        </div>
                        <div className="container d-flex justify-content-evenly flex-wrap">
                            {productContext.getProducts().map(each => {
                                return (
                                    <div className="card my-2 card-border" style={{ "width": "16rem" }}>
                                        <img src={each.image_url} className="class-img-top card-img" />
                                        <div className="card-body pb-0">
                                            {each.launch_status ? "" : <span className="badge bg-danger">PRE-ORDER</span>}
                                            <h5 className="card-title view-more" onClick={() => showProduct(each.id)}>{each.name}</h5>
                                            <span className="card-text d-inline-block text-truncate"
                                                style={{ "maxWidth": "100%", "maxHeight": "200px" }}>
                                                {each.description}</span><br />
                                            <h6>${(each.cost / 100).toFixed(2)}</h6>
                                            <div>
                                                <span><i className="bi bi-tags-fill" style={{ "color": "#F18300" }}></i></span>
                                                <span className="badge card-badges mx-1">{each.figure_type.figure_type} figure</span>
                                                <span className="badge card-badges mx-1">{each.series.series_name}</span>
                                                <span className="badge card-badges mx-1">{each.collection.collection_name}</span>
                                                {each.series.mediums.map(eachMedium => {
                                                    return (<span className="badge card-badges mx-1">{eachMedium.media_medium}</span>)
                                                })}
                                                <span className="badge card-badges mx-1">{each.manufacturer.manufacturer_name}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-end my-1">
                                            <button className="btn btn-sm card-btn mx-1" onClick={() => cartContext.addToCart(each.id, 1)}><i class="bi bi-cart-plus-fill"></i></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}