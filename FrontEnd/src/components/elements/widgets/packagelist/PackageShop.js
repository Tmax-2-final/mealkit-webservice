import React, {useEffect, useState} from 'react';
import ProductView from '../product/ProductView';
import Pagination from "../../ui/Pagination";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import Rating from "../../ui/Rating";
import Button from "@mui/material/Button";

export default function PackageShop({search, categoryName, setSearch, props}) {
    console.log(search)
    console.log(categoryName);
    console.log(props);
    const [sliceNumber, setSliceNumber] = useState(15);
    const [columNumber, setColumNumber] = useState(4);
    const [onActive, setOnActive] = useState(false);
    const history = useHistory();

    const [newData, setnewData] = useState([]);
    const [preferenceData, setPreferenceData] = useState();
    const [catalogData, setCatalogData] = useState();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ postsPerPage ] = useState(5);
    const [ loading, setLoading ] = useState(false);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');

    console.log(token);

    useEffect(() => {

        const fetchPosts = async () => {
            setLoading(true);
        }

        axios.get("/catalog-service/patalogs")
            .then(res => {
                setnewData(res.data);
                setSearch(null);
                setLoading(false);
                console.log(res.data);
            });

        fetchPosts();

        axios.get(`/user-service/users/preference/{userId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
            .then(res => {
                setPreferenceData(res.data);
                console.log(res.data);
                setLoading(false);

            })

        axios.get(`/catalog-service/catalogs`)
            .then(res =>{
                setCatalogData(res.data);
                console.log(res.data);

            })


        fetchPosts();
    },[S]);


    const categoryData = categoryName !== "전체메뉴" ? categoryName !== "추천 패키지" ? newData && newData.filter(item => item.category === categoryName ) : catalogData && catalogData.filter(item => item.age === preferenceData.age ||
        item.theme === preferenceData.theme || item.flavor === preferenceData.flavor) :newData;

    const searchData = search !== null ? newData.filter(item => (item.name.toLowerCase().includes(search)) || (item.category.includes(search))) : newData;

    const searchList = searchData.map((item, index) => (

        <div className={`col-xl-${columNumber} col-md-6 col-lg-${columNumber} col-sm-6`} key={item.patalogsId}>
            <div className="product-wrap mb-25">
                <div className="product-img">
                    <Link to={`/packagedetail/${item.patalogId}`}>
                        <img className="default-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt="" />
                        <img className="hover-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt="" />
                    </Link>
                </div>
                <div className="product-content text-center">
                    <h3><Link to={`/packagedetail/${item.patalogId}`}>{item.name}</Link></h3>
                    <div className="product-rating">
                        {item.rating && item.rating > 0 ? (
                            <Rating ratingValue={item.rating} />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="product-price">
                        <span>{item.unitPrice}원</span>
                        {/*<span className="old">{item.unitPrice}</span>*/}
                    </div>
                </div>
            </div>
        </div>


    )).slice(indexOfFirstPost, indexOfLastPost);


    const packageList = categoryData.map((item, index) => (

        <div className={`col-xl-${columNumber} col-md-6 col-lg-${columNumber} col-sm-6`} key={item.patalogId}>
            <div className="product-wrap mb-25">
                <div className="product-img">
                    <Link to={`/packagedetail/${item.patalogId}`}>
                        <img className="default-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt="" />
                        <img className="hover-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt="" />
                    </Link>
                </div>
                <div className="product-content text-center">
                    <h3><Link to={`/packagedetail/${item.patalogId}`}>{item.name}</Link></h3>
                    <div className="product-rating">
                        {item.rating && item.rating > 0 ? (
                            <Rating ratingValue={item.rating} />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="product-price">
                        <span>{item.unitPrice}원</span>
                        {/*<span className="old">{item.unitPrice}</span>*/}
                    </div>
                </div>
            </div>
        </div>

    )).slice(indexOfFirstPost, indexOfLastPost);

    const categoryList = categoryData.map((item, index) => (

        <div className={`col-xl-${columNumber} col-md-6 col-lg-${columNumber} col-sm-6`} key={item.catalogId}>
            <div className="product-wrap mb-25">
                <div className="product-img">
                    <Link to={`/packagedetail/${item.catalogId}`}>
                        <img className="default-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image1}`} alt="" />
                        <img className="hover-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image1}`} alt="" />
                    </Link>
                </div>
                <div className="product-content text-center">
                    <h3><Link to={`/packagedetail/${item.catalogId}`}>{item.name}</Link></h3>
                    <div className="product-rating">
                        {item.rating && item.rating > 0 ? (
                            <Rating ratingValue={item.rating} />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="product-price">
                        <span>{item.unitPrice}원</span>
                        {/*<span className="old">{item.unitPrice}</span>*/}
                    </div>
                </div>
            </div>
        </div>

    )).slice(indexOfFirstPost, indexOfLastPost);



    const currentNewData = (search == null ? categoryData :searchData);
    const currentList = (categoryName == "유저 패키지"? packageList : categoryList)


    const handleLayout = (sln, coln) => {
        setSliceNumber(sln)
        setColumNumber(coln)
        setOnActive(!onActive)
    }

    console.log(postsPerPage)
    console.log(paginate)

    const confirmSubPkgHandler = (e) => {

        let body = {
            name: userId +"님의 패키지",
            category: "유저 패키지",
            rating: "3",
            image: "01.jpg"
        }



        e.preventDefault();

        console.log(props);

        history.push({
            pathname: "/subscription/confirmusubpkg",
            state: {
                myPkgData : categoryData
            }
        })
    }

    return(
        <div className="col-lg-9 order-1 order-lg-2">
            <div className="shop-top-bar mb-35">
                <div className="select-shoing-wrap">
                    <div className="shop-select">
                        {/*<select>*/}
                        {/*    <option value="default">Default</option>*/}
                        {/*    <option value="priceHighToLow">Price - High to Low</option>*/}
                        {/*    <option value="priceLowToHigh">Price - Low to High</option>*/}
                        {/*</select>*/}
                    </div>
                    {/*<p>Showing 15 of 144 result</p>*/}
                </div>
                <div className="shop-tab">
                    <button className={ onActive ? "active" : ""} onClick={()=> onActive ? "" : handleLayout(10,6)}><i className="fa fa-th-large"></i></button>
                    <button className={ onActive ? "" : "active"} onClick={()=> onActive ? handleLayout(30,4) : ""}><i className="fa fa-th"></i></button>
                </div>
            </div>
            <div className="shop-bottom-area mt-35">
                <div className="row grid three-column">
                    <p>{categoryName}</p>
                    {categoryName === "추천 패키지" &&
                    <Button
                        sx={{width: "12rem", height: "3rem"}}
                        variant="contained"
                        size="large"
                        onClick={confirmSubPkgHandler}
                    >
                        추천 패키지 구독
                    </Button>
                    }
                    <ProductView
                        sliceNumber = {sliceNumber}
                        columNumber = {columNumber}
                        categoryName = {categoryName}
                        search={search}
                        setSearch={setSearch}
                        currentList = {currentList}

                    />

                </div>
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={currentNewData.length}
                        paginate={paginate} />
            {/*<div className="pro-pagination-style text-center mt-30">*/}
            {/*    <ul className="mb-0 mt-0">*/}
            {/*        <li className="page-item active"><button className="page-link">1</button></li>*/}
            {/*        <li className="page-item null"><button className="page-link">2</button></li>*/}
            {/*        <li className="page-item null"><button className="page-link">3</button></li>*/}
            {/*        <li className="page-item null"><button className="page-link">4</button></li>*/}
            {/*        <li className="page-item null"><button className="page-link">5</button></li>*/}
            {/*        <li className="page-item null"><button className="page-link">6</button></li>*/}
            {/*        <li className="page-item null"><button className="page-link">7</button></li>*/}
            {/*        <li className="page-item"><button className="page-link">»</button></li>*/}
            {/*        <li className="page-item null"><button className="page-link">10</button></li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    );
}