import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Rating from '../../ui/Rating';
import axios from "axios";

export default function ComareTable() {

    const [myPackageDatas, setMyPackageDatas] = useState([]);

    let process = require('../../../../myProcess.json');

    useEffect(() => {
        axios.get("/catalog-service/mypackage")
            .then(res => {
                setMyPackageDatas(res.data);
                console.log(res.data);
            })
    },[]);

    console.log(myPackageDatas);

    // useEffect(()=>{
    //     fetch(`http://${process.IP}:${process.PORT}/compare`)
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         setCompareDatas(data);
    //     });
    // },[process.IP, process.PORT]);




    const handleDelete = (id) => {

        axios.delete(`/catalog-service/hello1/mypackage/${id}`)
            .then(res => {
                alert("삭제 되었습니다.")
                axios.get(`/catalog-service/mypackage`)
                    .then(data => {
                        console.log(data.data);
                        setMyPackageDatas(data.data);
                        // setCatalogDatas(data.data);
                    })
            })
        
        // fetch(`http://${process.IP}:${process.PORT}/compare/${id}`,{
        //     method: "DELETE"
        // }).then(
        //     alert("삭제되었습니다."),
        //     fetch(`http://${process.IP}:${process.PORT}/compare`)
        //     .then(res => {
        //         return res.json();
        //     })
        //     .then(data => {
        //         setMyPackageDatas(data);
        //         console.log(data);
        //     })
        // )
    }

    const handleAllDelete = (id) => {
        axios.delete(`/catalog-service/hello1/mypackage`)
            .then(res => {
                alert("삭제 되었습니다.")
                axios.get(`catalog-service/mypackage`)
                    .then(data =>{
                        console.log(data.data);
                        setMyPackageDatas(data.data);
                    })
            })
    }



    const comparelist01 = myPackageDatas.map(item => (
        <td className="product-image-title">
            <div className="compare-remove">
                <button onClick={()=>handleDelete(item.patalogId)}><i className="las la-trash"></i></button>
            </div>
            <Link className="image" to={`/packagedetail/${item.patalogId}`}><img className="img-fluid" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt=""/></Link>
            <div className="product-title">
                <Link className="image" to={`/packagedetail/${item.patalogId}`}>{item.name}</Link>
            </div>
            <div className="compare-btn">
                <Link className="image" to={`/packagedetail/${item.patalogId}`}>패키지 상세 페이지</Link>
            </div>
        </td>
    )).slice(0,3);

    const comparelist02 = myPackageDatas.map(item => (
        <td className="product-price">
            {/*<span className="amount old">{item.unitPrice.toFixed(2)}</span>*/}
            <span className="amount">{item.unitPrice}</span>
        </td>
    )).slice(0,3);

    const comparelist03 = myPackageDatas.map(item => (
        <td className="product-desc">
            <p>N/A</p>
        </td>
    )).slice(0,3);

    const comparelist04 = myPackageDatas.map(item => (
        <td className="product-rating">
            {item.rating && item.rating > 0 ? (
                <Rating ratingValue={item.rating} />
            ) : (
            ""
            )}
        </td>
    )).slice(0,3);

    

    return(
        <div className="compare-main-area pt-90 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="compare-page-content">
                            <div className="compare-table table-responsive">
                                <table className="table table-bordered mb-0">
                                    <tbody>
                                        <tr>
                                            <th className="title-column">패키지 정보</th>
                                            {comparelist01}
                                        </tr>
                                        <tr>
                                            <th className="title-column">가격</th>
                                            {comparelist02}
                                        </tr>
                                        <tr>
                                            <th className="title-column">상품 설명</th>
                                            {comparelist03}
                                        </tr>
                                        <tr>
                                            <th className="title-column">평점</th>
                                            {comparelist04}
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cart-shiping-update-wrapper">
                                    <div className="cart-shiping-update">
                                        <a href="/productlist">상품 찾기</a>
                                    </div>
                                    <div className="cart-clear">
                                        <button onClick={()=>handleAllDelete("hello1")}>패키지 비우기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}