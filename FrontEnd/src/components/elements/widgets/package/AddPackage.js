import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function AddPackage({props, packageData, pkgMgtData}) {


    console.log(pkgMgtData);

    const [count, setCount] = useState(1);
    const [isDisply, setIsDisplay] = useState("");
    const [stockTextColor, setStockTextColor] = useState("#676767");
    const [buyBtnColor, setBuyBtnColor] = useState("#343538");

    const [ catalogData, setCatalogData] = useState();
    const [ myPackageData, setMyPackageData] = useState();

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(()=>{
        if(packageData.stock === 0) {
            setIsDisplay("none");
            setStockTextColor("red");
            setBuyBtnColor("red")
        } else {
            setIsDisplay("block");
            setStockTextColor("#676767");
            setBuyBtnColor("#343538")
        }
    },[packageData]
    );


    const addQty = (e) => {

        packageData.qty = count;
        
    };

    const handleCountAdd = (e) => {
        setCount(count+1);
    }

    const handleCountDec = () => {
        count > 1 ? setCount(count-1) : alert("최소 수량은 1개 입니다.")
    }

    console.log(packageData);

    const handlePutCartList = () => {

        axios.post(`/catalog-service/${userId}/mypackage`, pkgMgtData )
            .then(res => {
                console.log(res)
                if (res.status == 201) {
                    alert("상품 등록이 완료 되었습니다.");
                    console.log(res.data);
                    console.log(pkgMgtData);


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
                console.log(pkgMgtData);
            });

        }        


    const handleCount = (e) => {
        setCount(e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'));
    }


    return(
        <>
            <div className="pro-details-quality">
                <div className="pro-details-cart btn-hover" style={{display:isDisply}}>
                    <button onClick={()=> handlePutCartList()}>마이패키지에 담기</button>
                </div>
                
                {/*<div className="pro-details-cart btn-hover ml-30"> */}
                {/*    <Link to={{*/}
                {/*                pathname: "/payment",*/}
                {/*                state: {*/}
                {/*                    data:[productData],*/}
                {/*                    totalPriceData:count*productData.unitPrice*/}
                {/*                },*/}
                {/*    }} */}
                {/*    onClick={addQty}*/}
                {/*    style={{backgroundColor:buyBtnColor}}>*/}
                {/*        {productData.stock !== 0 ? "구매하기" : "품절"}*/}
                {/*    </Link>*/}
                {/*</div>                */}
            </div>
            {/*<div class="pro-details-meta">*/}
            {/*    <span>재고 :</span>*/}
            {/*    <ul>*/}
            {/*        <li><a href="/shop-grid-standard" style={{color:stockTextColor}}>{packageData.stock !== 0 ? packageData.stock : "품절"}</a></li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
            {/*<div class="pro-details-meta">*/}
            {/*<span>카테고리 :</span>*/}
            {/*<ul>*/}
            {/*    <li><a href="/shop-grid-standard">{packageData.category}</a></li>*/}
            {/*</ul>*/}
            {/*</div>*/}
            {/*<div class="pro-details-meta">*/}
            {/*    <span>ISBN :</span>*/}
            {/*    <ul>*/}
            {/*        <li><a href="/shop-grid-standard">{packageData.patalogId}</a></li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </>
    );
}