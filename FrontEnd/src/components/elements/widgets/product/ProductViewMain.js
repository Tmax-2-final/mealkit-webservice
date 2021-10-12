import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Rating from '../../ui/Rating';
import axios from 'axios';

export default function ProductView({categoryName, sliceNumber, columNumber, search, setSearch}){
    console.log(categoryName);
    console.log(search);
    let process = require('../../../../myProcess.json');

    const [newData, setnewData] = useState([]);
    

    useEffect(() => {
        axios.get("/catalog-service/catalogs")
        .then(res => {
            setnewData(res.data);
            console.log(res.data);
        })
    },[]);


    console.log("===searchData====");

    const searchDataMain = categoryName !== "전체메뉴" ? newData.filter(item => item.category === categoryName): newData;





    const handleDelete = (id) => {
        fetch(`http://${process.IP}:${process.PORT}/wish/${id}`,{
            method: "DELETE"
        }).then(
            alert("삭제되었습니다.")
        )
    }

    const handlePutCompareList = (id) => {

        fetch(`http://${process.IP}:${process.PORT}/product/${id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            fetch(`http://${process.IP}:${process.PORT}/compare`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: data.id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    discount: data.discount,
                    shortDescription: data.shortDescription,
                    rating : data.rating,
                }),
            })
        }).then(
            alert("success")
        )

    }

    const handlePutWishList = (id) => {
        
        fetch(`http://${process.IP}:${process.PORT}/product/${id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            fetch(`http://${process.IP}:${process.PORT}/wish/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: data.id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    discount: data.discount
                }),
            })
        }).then(
            alert("success")
        )
    }
    
    const productList = searchDataMain.map((item, index) => (
        
        <div className={`col-xl-${columNumber} col-md-6 col-lg-${columNumber} col-sm-6`} key={item.productId}>
        <div className="product-wrap mb-25">
            <div className="product-img">
                <Link to={`/productdetail/${item.productId}`}>
                    <img className="default-img" src={`https://bookstore-image.s3.us-east-2.amazonaws.com/${item.image}`} alt="" />
                    <img className="hover-img" src={`https://bookstore-image.s3.us-east-2.amazonaws.com/${item.image}`} alt="" />
                </Link>
                {/*<div className="product-action">*/}
                {/*    <div className="pro-same-action pro-wishlist">*/}
                {/*        <button*/}
                {/*            value={item.productId}*/}
                {/*            onClick={() => handlePutWishList(item.productId)}*/}
                {/*        >*/}
                {/*            <i className="las la-bookmark"></i>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*    <div className="pro-same-action pro-cart">*/}
                {/*        <button disabled="" className="active">Buy</button>*/}
                {/*    </div>*/}
                {/*    <div className="pro-same-action pro-quickview">*/}
                {/*        <button */}
                {/*            className="" */}
                {/*            title={item.productId}*/}
                {/*            onClick={() => handlePutCompareList(item.productId)}*/}
                {/*            value={item.productId}*/}
                {/*        >*/}
                {/*            <i className="las la-eye"></i>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="product-content text-center">
                <h3><Link to={`/productdetail/${item.productId}`}>{item.name}</Link></h3>
                <div className="product-rating">
                    {item.rating && item.rating > 0 ? (
                        <Rating ratingValue={item.rating} />
                    ) : (
                    ""
                    )}
                </div>
                <div className="product-price">
                    <span>{item.unitPrice}원</span>
                </div>
            </div>
        </div>
    </div>
        

    )).slice(0,sliceNumber);



    return(
        <div className="row mt-5">
            {productList}
        </div>
        
    );
}