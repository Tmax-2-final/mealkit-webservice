import React, {useEffect, useState} from 'react';
import ProductView from '../product/ProductView';
import Pagination from "../../ui/Pagination";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import Rating from "../../ui/Rating";
import Button from "@mui/material/Button";

export default function PackageShop({search, categoryName, setSearch, props}) {
    const [sliceNumber, setSliceNumber] = useState(15);
    const [columNumber, setColumNumber] = useState(4);
    const [onActive, setOnActive] = useState(false);
    const history = useHistory();

    const [newData, setnewData] = useState([]);
    const [preferenceData, setPreferenceData] = useState();
    const [catalogData, setCatalogData] = useState();
    const [ loading, setLoading ] = useState(false);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        getSubPatalogs(pageNumber);
    }

    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');

    // 페이징
    const [ currentPage, setCurrentPage ] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(0);

    const getSubPatalogs = (page) => {
        console.log("=== 검색 ===");
        console.log(search);
        axios.get("/catalog-service/patalogs/user",{
            params: {
                page: page,
                searchValue : search
            }
        })
            .then(res => {
                console.log("=== 구독 패키지 데이터 ===");
                console.log(res.data);
                console.log("=====================");
                setnewData(res.data.content);
                setTotalPosts(res.data.totalElements);
                setPostsPerPage(res.data.size);
            });
    }

    useEffect(() => {
        getSubPatalogs(currentPage);
    }, [search])

    useEffect(() => {
        axios.get(`/user-service/users/preference/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log("=== 설문조사 데이터 ===");
                console.log(res.data);
                console.log("=====================");
                
                setPreferenceData(res.data);

                const params = {
                    themes : res.data.theme,
                    flavors : res.data.flavor,
                    cookingtime: res.data.cookingtime,
                    age: res.data.age,
                }

                axios.get("/catalog-service/patalogs/recommend",{
                    params: params
                })
                .then(res => {
                    console.log("=== 추천 상품 데이터 ===");
                    console.log(res.data);
                    console.log("======================");

                    setCatalogData(res.data);
                })
            })
    },[]);


    const categoryData = newData;

    const searchData = newData;

    console.log("=== 카테고리 데이터 ===");
    console.log(categoryData);

    const packageList = categoryData.map((item, index) => (

        <div className={`col-xl-${columNumber} col-md-6 col-lg-${columNumber} col-sm-6`} key={item.patalogId}>
            <div className="product-wrap mb-25">
                <div className="product-img">
                    <Link to={`/packagedetail/${item.patalogId}`}>
                        <img className="default-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt="" />
                        {/* <img className="hover-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt="" /> */}
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
                </div>
            </div>
        </div>
    ))

    const catalogList = catalogData && catalogData.map((item, index) => (

        <div className={`col-xl-${columNumber} col-md-6 col-lg-${columNumber} col-sm-6`} key={item.patalogId}>
            <div className="product-wrap mb-25">
                <div className="product-img">
                    <Link to={`/productdetail/${item.catalogId}`}>
                        <img className="default-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image1}`} alt="" />
                        {/* <img className="hover-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt="" /> */}
                    </Link>
                </div>
                <div className="product-content text-center">
                    <h3><Link to={`/productdetail/${item.patalogId}`}>{item.name}</Link></h3>
                    <div className="product-rating">
                        {item.rating && item.rating > 0 ? (
                            <Rating ratingValue={item.rating} />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    ))

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

    ))


    const handleLayout = (sln, coln) => {
        setSliceNumber(sln)
        setColumNumber(coln)
        setOnActive(!onActive)
    }

    console.log(postsPerPage)
    console.log(paginate)


    const confirmSubPkgHandler = (e) => {
        e.preventDefault();

        console.log(props);

        history.push({
            pathname: "/subscription/confirmusubpkg",
            state: {
                myPkgData : catalogData,
            }
        })
    }

    return(
        <div className="col-lg-9 order-1 order-lg-2">
            <div className="shop-top-bar mb-35">
                <div className="select-shoing-wrap">
                    <div className="shop-select">
                    </div>
                </div>
                <div className="shop-tab">
                    <button className={ onActive ? "active" : ""} onClick={()=> onActive ? "" : handleLayout(10,6)}><i className="fa fa-th-large"></i></button>
                    <button className={ onActive ? "" : "active"} onClick={()=> onActive ? handleLayout(30,4) : ""}><i className="fa fa-th"></i></button>
                </div>
            </div>
            <div className="shop-bottom-area mt-35">
                <div className="row grid three-column">
                    <p style={{fontWeight:"bold", fontSize:"1.2rem"}}>{categoryName} </p>
                    {categoryName === "유저 패키지" ? <span>다른 회원들이 직접 제작한 패키지들을 마이패키지에 담을 수 있습니다.</span> : <span>회원의 설문조사를 기반으로 패키지를 추천합니다. <br/>추천한 상품 목록을 확인하고 해당 상품들을 구독할 수 있습니다.</span>}
                    {categoryName === "추천 패키지" &&
                    <Button
                        sx={{width: "12rem", height: "3rem", mt:"2rem"}}
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
                        currentList = {categoryName === "유저 패키지" ? packageList : catalogList}
                    />
                </div>
            </div>
            {
                categoryName === "유저 패키지" ? <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} currentPage={currentPage} paginate={paginate} /> : ""
            }
            
        </div>
    );
}