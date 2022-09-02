import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';
import { toast, ToastContainer } from 'react-toastify';

export default function Products() {
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    const navigate = useNavigate();

    let figureType = [];
    let blind_box = "a";

    const [products, setProducts] = React.useState({})
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
    });

    useEffect(() => {
        async function defaultState() {
            let figureTypes = productContext.getFigureType();
            await setFigureTypes(figureTypes);
            let products = await productContext.getProducts();
            let filtered = await productContext.getState();
            let filterChose = await productContext.getFiltered();
            if (filtered.length == 0) {
                await setProducts(products);
            }
            else {
                if (filterChose == "action") {
                    console.log("action")
                    await setSearchBox({
                        ...searchBox,
                        figureType: ['1']
                    })
                } else if (filterChose == "complete") {
                    await setSearchBox({
                        ...searchBox,
                        figureType: ['2']
                    })
                } else if (filterChose == "scale") {
                    await setSearchBox({
                        ...searchBox,
                        figureType: ['3']
                    })
                } else {
                    console.log("BLIND")
                    await setSearchBox({
                        ...searchBox,
                        blind_box: '1'
                    })
                }
                await setProducts(filtered)
            }
        }
        defaultState();
    }, []);


    const [showSearch, setShowSearch] = React.useState(false)

    const [figureTypes, setFigureTypes] = React.useState([]);

    const showProduct = async (productId) => {
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
        let baseProducts = await productContext.filterProducts(emptySearch);
        await setProducts(baseProducts)
    };

    const filterProducts = async () => {
        let filteredProducts = await productContext.filterProducts(searchBox);
        await setProducts(filteredProducts)
    }


    const resetSearchMob = async () => {
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
        let baseProducts = await productContext.filterProducts(emptySearch);
        await setProducts(baseProducts)
    };

    const filterProductsMob = async () => {
        let filteredProducts = await productContext.filterProducts(searchBox);
        await setProducts(filteredProducts)
    }

    return (
        <React.Fragment>
            <ToastContainer position="bottom-right" />
            <div className="d-none d-lg-block">
                <div className="row m-2">
                    <div className="col-12 col-lg-3">
                        <div className="container">
                            <h1>Search</h1>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9">
                        <div className="container">
                            <h1>Showing {products.length} product(s):</h1>
                        </div>
                    </div>
                </div>
                <div className="row ms-2 my-2 search-container">
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
                                            value="1" onChange={updateSearchField} checked={searchBox.blind_box == "1"} />
                                        Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="blind_box"
                                            value="0" onChange={updateSearchField} checked={searchBox.blind_box == "0"} />
                                        No</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="blind_box"
                                            value="a" onChange={updateSearchField} checked={searchBox.blind_box == "a"} />
                                        Any</label>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn main-btn btn-sm my-2 mx-1" onClick={resetSearch}>Reset</button>
                                <button className="btn main-btn btn-sm my-2 mx-1" onClick={filterProducts}>Search</button>
                            </div>

                        </div>
                    </div>
                    <div className="col-12 col-lg-9">
                        <div className="grid d-flex flex-wrap">
                            {products.length ?
                                <React.Fragment>
                                    {products.map(each => {
                                        return (
                                            <div className="card m-2 card-border" style={{ "width": "16rem" }}>
                                                <div className="tags-overlay">
                                                    <img src={each.image_url} className={"class-img-top card-img" + (each.quantity ? "" : " sold-out-img")} />
                                                    {!each.quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                    {!each.launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                                </div>
                                                {each.blind_box ? <span className="blind-box">BLIND-BOX</span> : ""}
                                                <div className="card-body pb-0">
                                                    <h5 className="card-title view-more text-truncate mb-0" onClick={() => showProduct(each.id)}>{each.name}</h5>
                                                    <span className="figure-type">{each.figure_type.figure_type} figure</span>
                                                    <h4>${(each.cost / 100).toFixed(2)}</h4>
                                                    <div>
                                                        <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span>
                                                        <span className="badge card-badges m-1">{each.series.series_name}</span> <br />
                                                        <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span>
                                                        <span className="badge card-badges m-1">{each.collection.collection_name}</span> <br />
                                                        <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span>
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
                                                    onClick={() => cartContext.addToCart(each.id, 1)}>
                                                    ADD TO CART
                                                </button>
                                            </div>
                                        )
                                    })}
                                </React.Fragment>
                                : null}
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-lg-none container mob-content">
                <div className="row my-2">
                    <div className="col-12 p-0">
                        <div className="row search-box mx-2">
                            {showSearch ? <div className="col-12 my-1 d-flex justify-content-end">
                                <button className="btn main-btn btn-sm"
                                    onClick={() => setShowSearch(!showSearch)}>
                                    <i class="bi bi-caret-up-fill"></i>
                                </button>
                            </div> : ""}
                            <div className={showSearch ? "col-12" : "col-8 my-2"}>
                                <label>Search:</label>
                                <input type="text" className="form-control" value={searchBox.search}
                                    placeholder="e.g. one piece, levi ackerman" onChange={updateSearchField}
                                    name="search" />
                            </div>
                            {showSearch ?
                                <React.Fragment>
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
                                                    value="1" onChange={updateSearchField} checked={searchBox.blind_box == "1"} />
                                                Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="blind_box"
                                                    value="0" onChange={updateSearchField} checked={searchBox.blind_box == "0"} />
                                                No</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="blind_box"
                                                    value="a" onChange={updateSearchField} checked={searchBox.blind_box == "a"} />
                                                Any</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn main-btn btn-sm my-2 mx-1" onClick={resetSearchMob}>Reset</button>
                                        <button className="btn main-btn btn-sm my-2 mx-1" onClick={filterProductsMob}>Search</button>
                                    </div>
                                </React.Fragment> :
                                <React.Fragment>
                                    <div className="col">
                                        <div style={{ "height": "30px" }}></div>
                                        <div className="d-flex flex-wrap">
                                            <div className="mx-auto">
                                                <button className="btn main-btn btn-sm"
                                                    onClick={filterProductsMob}>
                                                    <i class="bi bi-search"></i>
                                                </button>
                                            </div>
                                            <div className="mx-auto">
                                                <button className="btn main-btn btn-sm"
                                                    onClick={resetSearchMob}>
                                                    <i class="bi bi-arrow-counterclockwise"></i>
                                                </button>
                                            </div>
                                            <div className="mx-auto">
                                                <button className="btn main-btn btn-sm"
                                                    onClick={() => setShowSearch(!showSearch)}>
                                                    <i class="bi bi-caret-down-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                    <div className="col-12 p-0">
                        <div className="container text-center">
                            <h1>Showing {products.length} product(s):</h1>
                        </div>
                        <div className="container d-flex justify-content-evenly flex-wrap">
                            {products.length ?
                                <React.Fragment>
                                    {products.map(each => {
                                        return (
                                            <div className="card my-2 card-border" style={{ "width": "16rem" }}>
                                                <div className="tags-overlay">
                                                    <img src={each.image_url} className={"class-img-top card-img" + (each.quantity ? "" : " sold-out-img")} />
                                                    {!each.quantity ? <div className="tags badge bg-danger">SOLD OUT</div> : null}
                                                    {!each.launch_status ? <div className="po-banner"><span>PRE-ORDER</span></div> : null}
                                                </div>
                                                {each.blind_box ? <span className="blind-box">BLIND-BOX</span> : ""}
                                                <div className="card-body pb-0">
                                                    <h5 className="card-title view-more text-truncate mb-0" onClick={() => showProduct(each.id)}>{each.name}</h5>
                                                    <span className="figure-type">{each.figure_type.figure_type} figure</span>
                                                    <h4>${(each.cost / 100).toFixed(2)}</h4>
                                                    <div>
                                                        <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span>
                                                        <span className="badge card-badges m-1">{each.series.series_name}</span> <br />
                                                        <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span>
                                                        <span className="badge card-badges m-1">{each.collection.collection_name}</span> <br />
                                                        <span><i className="bi bi-tags-fill m-1" style={{ "color": "#F18300" }}></i></span>
                                                        <span className="badge card-badges m-1">{each.manufacturer.manufacturer_name}</span> <br />
                                                    </div>
                                                </div>
                                                {/* <div className="d-flex justify-content-end align-items-end my-1">
                                                    <button className="btn card-btn mx-1" disabled={each.quantity < 1}
                                                        onClick={() => cartContext.addToCart(each.id, 1)}>
                                                        <i class="bi bi-cart-plus-fill"></i>
                                                    </button>
                                                </div> */}
                                                <button className="btn card-btn btn-sm m-1" disabled={each.quantity < 1}
                                                    onClick={() => cartContext.addToCart(each.id, 1)}>
                                                    ADD TO CART
                                                </button>
                                            </div>
                                        )
                                    })
                                    }
                                </React.Fragment> : null}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}