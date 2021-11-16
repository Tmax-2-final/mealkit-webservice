import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Rating from '../../ui/Rating';
import axios from 'axios';

export default function ProductViewMain({categoryName, sliceNumber, columNumber, search, setSearch}){
    console.log(categoryName);
    console.log(search);
    
    const [newData, setNewData] = useState([]);

    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');
    
    useEffect(() => {
        const result = axios.get(`/catalog-service/catalogs?page=`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                if(res.status === 200) {
                    setNewData(res.data.content);
                }
            })

        axios.get(`/catalog-service/catalogs?page=`, {
            header: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setNewData(res.data.content);
            console.log(res.data);
        })
    },[]);


    console.log("===searchData====");

    const searchDataMain = categoryName !== "전체메뉴" ? newData.filter(item => item.category === categoryName): newData;
    
    const productList = searchDataMain.map((item, index) => (
        
        <div className={`col-xl-${columNumber} col-md-6 col-lg-${columNumber} col-sm-6`} key={item.productId}>
            <div className="product-wrap mb-25">
                <div className="product-img">
                    <Link to={`/productdetail/${item.productId}`}>
                        <img className="default-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image1}`} alt="" />
                        <img className="hover-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image2}`} alt="" />
                    </Link>
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
                </div>
            </div>
        </div>
        

    )).slice(0,8);



    return(
        <div className="row mt-5">
            {productList}
        </div>
        
    );
}