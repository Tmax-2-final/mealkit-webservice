import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Bloglist(){

    const [newBlogData , setNewBlogData] = useState([]);
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`catalog-service/patalogs?page=&size=8`,{
            headers: {
                Authoriazation : `Bearer ${token}`
            }
        })
            .then(res => {
                setNewBlogData(res.data.content);
                console.log(res.data);
            })
    },[]);



    const blogList = newBlogData.map(item => (
        <div key={item.id} className="col-xl-3 col-md-6 col-lg-3 col-sm-6">
            <div className="product-wrap mb-25">
                <div className="package-img">
                    <Link to={`/packagedetail/${item.patalogId}`}>
                        <img className="default-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt="" width="100%" />
                    </Link>
                </div>
                <Link to={`/packagedetail/${item.patalogId}`}>
                </Link>
                <div className="recommend-package-text">
                    <Link to={`/packagedetail/${item.patalogId}`}>
                        <p style={{ textAlign: "center", fontSize: "15px" }}><span style={{ fontWeight: "bold" }}>{item.name.split("@")[0]}</span> 님의 패키지</p>
                    </Link>
                </div>
            </div>
        </div>
    )).slice(0,8)


    return(
        <div className="row mt-5">
            {blogList}
        </div>
    );
}