import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';
import { ToastContainer } from 'react-toastify';
import ProductListing from './ProductListings';
import Pagination from './Pagination';

export default function Products() {
    const productContext = React.useContext(ProductContext);
    const cartContext = React.useContext(CartContext);
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);
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
    const [loader, setLoader] = React.useState();
    const [currentPage, setCurrentPage] = React.useState(1);
    const [productsPerPage] = React.useState(9);
    const lastProduct = currentPage * productsPerPage;
    const firstProduct = lastProduct - productsPerPage;
    const currentProducts = products.slice(firstProduct, lastProduct);
    const nPages = Math.ceil(products.length / productsPerPage);
    const [currentPageMob, setCurrentPageMob] = React.useState(1);
    const [productsPerPageMob] = React.useState(6);
    const lastProductMob = currentPageMob * productsPerPageMob;
    const firstProductMob = lastProductMob - productsPerPageMob;
    const currentProductsMob = products.slice(firstProductMob, lastProductMob);
    const nPagesMob = Math.ceil(products.length / productsPerPageMob);

    useEffect(() => {
        async function defaultState() {
            setLoader(true)
            let figureTypes = productContext.getFigureType();
            await setFigureTypes(figureTypes);
            let products = await productContext.getProducts();
            let filtered = await productContext.getState();
            let filterChose = await productContext.getFiltered();
            if (filtered.length === 0) {
                await setProducts(products);
            }
            else {
                if (filterChose === "action") {
                    console.log("action")
                    await setSearchBox({
                        ...searchBox,
                        figureType: ['1']
                    })
                } else if (filterChose === "complete") {
                    await setSearchBox({
                        ...searchBox,
                        figureType: ['2']
                    })
                } else if (filterChose === "scale") {
                    await setSearchBox({
                        ...searchBox,
                        figureType: ['3']
                    })
                } else if (filterChose === "blind-box"){
                    await setSearchBox({
                        ...searchBox,
                        blind_box: '1'
                    })
                }
                await setProducts(filtered)
            }
            setLoader(false)
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
        setLoader(true)
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
        setLoader(false)
    };

    const filterProducts = async () => {
        setLoader(true)
        let filteredProducts = await productContext.filterProducts(searchBox);
        await setProducts(filteredProducts)
        setLoader(false)
    }


    const resetSearchMob = async () => {
        setLoader(true);
        setShowSearch(false);
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
        setLoader(false)
    };

    const filterProductsMob = async () => {
        setLoader(true)
        setShowSearch(false)
        let filteredProducts = await productContext.filterProducts(searchBox);
        await setProducts(filteredProducts)
        setLoader(false)
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="container-fluid d-none d-lg-block">
                <div className="row my-2 search-container">
                    <div className="col-12 col-lg-3">
                        <div className="row search-box">
                            <div className="container">
                                <h1>Search</h1>
                            </div>
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
                                        <div className="form-check" key={each[1]}>
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
                                    <option value={0}>Choose a collection</option>
                                    {productContext.getCollections().map(each => {
                                        return <option key={each[1]} value={each[0]}>{each[1]}</option>
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
                                            value="0" onChange={updateSearchField} checked={searchBox.launch_status === "0"} />
                                        Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="launch_status"
                                            value="1" onChange={updateSearchField} checked={searchBox.launch_status === "1"} />
                                        No</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="launch_status"
                                            value="a" onChange={updateSearchField} checked={searchBox.launch_status === "a"} />
                                        Any</label>
                                </div>
                            </div>
                            <div>
                                <div><label>Blindbox?</label></div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="blind_box"
                                            value="1" onChange={updateSearchField} checked={searchBox.blind_box === "1"} />
                                        Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="blind_box"
                                            value="0" onChange={updateSearchField} checked={searchBox.blind_box === "0"} />
                                        No</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="blind_box"
                                            value="a" onChange={updateSearchField} checked={searchBox.blind_box === "a"} />
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
                        {!loader ?
                            <React.Fragment>
                                <div className="container">
                                    <h3>Showing {products.length} product(s):</h3>
                                </div>
                                <div className="row">
                                    {products.length ?
                                        <React.Fragment>
                                            <ProductListing products={currentProducts} showProduct={showProduct}
                                                cartContext={cartContext} />
                                        </React.Fragment>
                                        : null}
                                </div>
                                <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                            </React.Fragment>
                            :
                            <div className="d-flex justify-content-center">
                                <img src={require("../images/loader.gif")} className="loader-size" alt="loader" />
                            </div>
                        }
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
                                                <div className="form-check" key={each[1]}>
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
                                            <option value={0}>Choose a collection</option>
                                            {productContext.getCollections().map(each => {
                                                return <option key={each[1]} value={each[0]}>{each[1]}</option>
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
                                                    value="0" onChange={updateSearchField} checked={searchBox.launch_status === "0"} />
                                                Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="launch_status"
                                                    value="1" onChange={updateSearchField} checked={searchBox.launch_status === "1"} />
                                                No</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="launch_status"
                                                    value="a" onChange={updateSearchField} checked={searchBox.launch_status === "a"} />
                                                Any</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div><label>Blindbox?</label></div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="blind_box"
                                                    value="1" onChange={updateSearchField} checked={searchBox.blind_box === "1"} />
                                                Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="blind_box"
                                                    value="0" onChange={updateSearchField} checked={searchBox.blind_box === "0"} />
                                                No</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="blind_box"
                                                    value="a" onChange={updateSearchField} checked={searchBox.blind_box === "a"} />
                                                Any</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn main-btn btn-sm my-2 mx-1" onClick={resetSearchMob}>Reset</button>
                                        <button className="btn main-btn btn-sm my-2 mx-1" onClick={filterProductsMob}>Search</button>
                                    </div>
                                </React.Fragment> :
                                <React.Fragment>
                                    <div className="col ps-0">
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
                        {!loader ?
                            <React.Fragment>
                                <div className="container text-center">
                                    <h4>Showing {products.length} product(s):</h4>
                                </div>
                                <div className="container d-flex justify-content-evenly flex-wrap">
                                    {products.length ?
                                        <React.Fragment>
                                            <ProductListing products={currentProductsMob} cartContext={cartContext}
                                                showProduct={showProduct} />
                                        </React.Fragment> : null
                                    }
                                </div>
                                <Pagination nPages={nPagesMob} currentPage={currentPageMob} setCurrentPage={setCurrentPageMob} />
                            </React.Fragment>
                            : <div className="d-flex justify-content-center">
                                <img src={require("../images/loader.gif")} className="loader-size" alt="loader" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}