import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Rating from '../../ui/Rating';
import axios from "axios";

function ComareTable(props) {
    const [myPackageDatas, setMyPackageDatas] = useState([]);
    const [columNumber, setColumNumber] = useState(4);
    const [patalogData, setPatalogData] = useState();
    const [pkgMgtData, setPkgMgtData] = useState([]);

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');

    const headers = {
        Authorization: `Bearer ${token}`
    }


    let process = require('../../../../myProcess.json');

    useEffect(() => {
        axios.get(`/catalog-service/${userId}/mypackage`, {
            headers : headers
        })
            .then(res => {
                setMyPackageDatas(res.data);
                console.log(res.data);
            })
    },[]);

    console.log(myPackageDatas);





    const createPatalog = () => {




    }

    const handleDelete = (id) => {

        axios.delete(`/catalog-service/${userId}/mypackage/${id}`, {
            headers : headers
        })
            .then(res => {
                alert("삭제 되었습니다.")
                axios.get(`/catalog-service/${userId}/mypackage`,{
                    headers : headers
                })
                    .then(data => {
                        console.log(data.data);
                        setMyPackageDatas(data.data);
                        // setCatalogDatas(data.data);
                    })
            })

    }

    const handleAllDelete = (id) => {
        axios.delete(`/catalog-service/${userId}/mypackage`)
            .then(res => {
                alert("삭제 되었습니다.")
                axios.get(`catalog-service/mypackage`)
                    .then(data =>{
                        console.log(data.data);
                        setMyPackageDatas(data.data);
                    })
            })
    }





    const comparelist01 = myPackageDatas.map((item, index) => (

        <div className={`col-xl-${columNumber} col-md-6 col-lg-${columNumber} col-sm-6`} key={item.catalogEntity.catalogId}>
            <div className="product-wrap mb-25">
                <div className="product-img">
                    <Link to={`/packagedetail/${item.catalogEntity.catalogId}`}>
                        <img className="img-fluid" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.catalogEntity.image1}`} alt=""/>
                        <img className="hover-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.catalogEntity.image1}`} alt="" />
                    </Link>
                </div>
                <div className="compare-remove">
                    <button onClick={()=>handleDelete(item.myPkgId)}><i className="las la-trash"></i></button>
                </div>
                <div className="product-content text-center">
                    <h3><Link to={`/packagedetail/${item.catalogEntity.catalogId}`}>{item.catalogEntity.name}</Link></h3>
                    <div className="product-rating">
                        {item.catalogEntity.rating && item.catalogEntity.rating > 0 ? (
                            <Rating ratingValue={item.catalogEntity.rating} />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="product-price">

                        <span>{item.catalogEntity.unitPrice}원</span>
                        {/*<span className="old">{item.unitPrice}</span>*/}

                    </div>

                </div>
            </div>
        </div>

    )).slice(0, 30);



    // const comparelist01 = myPackageDatas.map(item => (
    //
    //     <td className="product-image-title">
    //         <div className="compare-remove">
    //             <button onClick={()=>handleDelete(item.catalogEntity.catalogId)}><i className="las la-trash"></i></button>
    //         </div>
    //         <div className="product-img">
    //         <Link className="image" to={`/packagedetail/${item.catalogEntity.catalogId}`}><img className="img-fluid" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.catalogEntity.image1}`} alt=""/></Link>
    //         <div className="product-title">
    //             <Link className="image" to={`/packagedetail/${item.catalogEntity.catalogId}`}>{item.catalogEntity.name}</Link>
    //         </div>
    //         </div>
    //         {/*<div className="compare-btn">*/}
    //         {/*    <Link className="image" to={`/packagedetail/${item.catalogEntity.catalogId}`}>패키지 상세 페이지</Link>*/}
    //         {/*</div>*/}
    //     </td>
    // )).slice(0,7);

    // const comparelist02 = myPackageDatas.map(item => (
    //     <td className="product-price">
    //         {/*<span className="amount old">{item.unitPrice.toFixed(2)}</span>*/}
    //         <span className="amount">{item.catalogEntity.unitPrice}</span>
    //     </td>
    // )).slice(0,7);

    // const comparelist03 = myPackageDatas.map(item => (
    //     <td className="product-desc">
    //         <p>N/A</p>
    //     </td>
    // )).slice(0,7);

    // const comparelist04 = myPackageDatas.map(item => (
    //     <td className="product-rating">
    //         {item.rating && item.rating > 0 ? (
    //             <Rating ratingValue={item.rating} />
    //         ) : (
    //         ""
    //         )}
    //     </td>
    // )).slice(0,7);

    const confirmSubPkgHandler = (e) => {

        let body = {
            name: "hello1님의 패키지",
            category: userId + "님의 패키지",
            rating: "3",
            image: "01.jpg"
        }

        console.log(body);

        axios.post(`/catalog-service/${userId}/patalogs`,{
            headers: headers,
            body: body
        } )
            .then(res => {
                console.log(res)
                if (res.status == 201) {
                    alert("상품 등록이 완료 되었습니다.");
                    console.log(res.data);
                    axios.get(`/catalog-service/${userId}/firstpatalogs`, {
                        headers : headers
                    } )
                        .then(res => {
                            setPatalogData(res.data);
                            console.log(res.data);
                            let jsonArray = new Array();
                            myPackageDatas.map( item=> {
                                let jsonObj = new Object();
                                jsonObj.catalogId = item.catalogEntity.catalogId;
                                jsonObj.patalogId = res.data.patalogId;
                                jsonObj = JSON.stringify(jsonObj);
                                jsonArray.push(JSON.parse(jsonObj));
                            })
                            setPkgMgtData(jsonArray);
                            console.log(jsonArray);
                            console.log(pkgMgtData);
                            axios.post(`/catalog-service/${userId}/pkgmgt`, {
                                headers : headers,
                                body : jsonArray
                            })
                                .then(res => {
                                    console.log(res)
                                    if(res.status == 201){
                                        console.log(res.data);
                                    }
                                    else{
                                        console.log(res);
                                        alert("오류 발생")
                                    }
                                })
                        })


                }
                else if(res.status === 200) {
                    alert("장바구니에 동일한 상품이 있어 수량을 변경했습니다.");

                }
                else {
                    console.log(res);
                    alert("오류 발생. 장바구니에 상품이 담기지 않았습니다.")
                }
            })
            .catch(err => {
                alert("다시 다시 입력해주세요.");
                console.log(body);
            });


        e.preventDefault();

        props.history.push({        
            pathname: "/subscription/confirmusubpkg",
            state: {
                myPkgData : myPackageDatas
            }
        })
    }

    return(
        <div className="compare-main-area pt-90 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="cart-shiping-update-wrapper">
                            <div className="cart-shiping-update">
                                <Link to="#" onClick={confirmSubPkgHandler}>패키지 확정</Link>
                            </div>
                            <div className="cart-clear">
                                <button onClick={()=>handleAllDelete("hello1")}>패키지 비우기</button>
                            </div>
                        </div>
                        <div className="compare-page-content">
                            <div className="compare-table table-responsive">
                                <table className="table table-bordered mb-0">
                                    <tbody>
                                        <tr>
                                            <th className="title-column">나의 구독 상품</th>
                                            <div className="row grid three-column">
                                                {comparelist01}
                                            </div>
                                        </tr>
                                        {/*<tr>*/}
                                        {/*    <th className="title-column">가격</th>*/}
                                        {/*    {comparelist02}*/}
                                        {/*</tr>*/}
                                        {/*<tr>*/}
                                        {/*    <th className="title-column">상품 설명</th>*/}
                                        {/*    {comparelist03}*/}
                                        {/*</tr>*/}
                                        {/*<tr>*/}
                                        {/*    <th className="title-column">평점</th>*/}
                                        {/*    {comparelist04}*/}
                                        {/*    */}
                                        {/*</tr>*/}
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
                                    <div className="cart-shiping-update">
                                        <a href="/packagelist">패키지 찾기</a>
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

export default withRouter(ComareTable);