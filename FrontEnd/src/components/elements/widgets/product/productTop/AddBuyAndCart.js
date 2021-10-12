import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function AddBuyAndCart({props, productData}) {
    const [count, setCount] = useState(1);
    const [isDisply, setIsDisplay] = useState("");
    const [stockTextColor, setStockTextColor] = useState("#676767");
    const [buyBtnColor, setBuyBtnColor] = useState("#343538");

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');
    

    useEffect(()=>{
        if(productData.stock === 0) {
            setIsDisplay("none");
            setStockTextColor("red");
            setBuyBtnColor("red")
        } else {
            setIsDisplay("block");
            setStockTextColor("#676767");
            setBuyBtnColor("#343538")
        }
    },[productData]
    );

    const addQty = (e) => {
        if(!token){
            alert("구매하기는 로그인 한 후 진행 해주세요.");
            e.preventDefault();
            props.history.push("/login");
            return;
        }

        if(productData.stock === 0){
            alert("현재 상품은 품절중인 상품입니다.");
            e.preventDefault();
            return;
        }

        // if(count > productData.stock){
        //     alert(`재고가 부족합니다.`);
        //     e.preventDefault();
        //     return;
        // }

        productData.qty = count;
        
    };

    const handleCountAdd = (e) => {
        setCount(count+1);
    }

    const handleCountDec = () => {
        count > 1 ? setCount(count-1) : alert("최소 수량은 1개 입니다.")
    }

    const handlePutCartList = () => {
        if(!token){
            alert("장바구니 담기는 로그인 한 후 진행 해주세요.");
            props.history.push("/login");
        }
        else {
            let body = {
                productId: productData.productId,
                name: productData.name,
                image: productData.image,
                unitPrice: productData.unitPrice,
                qty: count
            }
    
            axios.post(`/user-service/${userId}/carts`, body, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    if(res.status === 201){
                        alert("장바구니에 새로운 상품이 담겼습니다.");
                    }
                    else if(res.status === 200){
                        alert("장바구니에 동일한 상품이 있어 수량을 변경했습니다.");
                    }
                    else {
                        console.log(res);
                        alert("오류 발생. 장바구니에 상품이 담기지 않았습니다.")
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    alert("오류 발생. 장바구니에 상품이 담기지 않았습니다.")
                });
        }        
    }

    const handleCount = (e) => {
        setCount(e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'));
    }


    return(
        <>
            <div className="pro-details-quality">
                <div className="cart-plus-minus">
                    <button className="dec qtybutton" onClick={()=>handleCountDec()}>-</button>
                    <input className="cart-plus-minus-box" type="text" value={count} onChange={handleCount}  maxlength="3"/>
                    
                    <button className="inc qtybutton" onClick={()=>handleCountAdd()}>+</button>
                </div>
                <div className="pro-details-cart btn-hover" style={{display:isDisply}}>
                    <button onClick={()=> handlePutCartList()}>장바구니 담기</button>
                </div>
                
                <div className="pro-details-cart btn-hover ml-30"> 
                    <Link to={{
                                pathname: "/payment",
                                state: {
                                    data:[productData],
                                    totalPriceData:count*productData.unitPrice
                                },
                    }} 
                    onClick={addQty}
                    style={{backgroundColor:buyBtnColor}}>
                        {productData.stock !== 0 ? "구매하기" : "품절"}
                    </Link>
                </div>                
            </div>
            <div class="pro-details-meta">
                <span>재고 :</span>
                <ul>
                    <li><a href="/shop-grid-standard" style={{color:stockTextColor}}>{productData.stock !== 0 ? productData.stock : "품절"}</a></li>
                </ul>
            </div>
            <div class="pro-details-meta">
            <span>카테고리 :</span>
            <ul>
                <li><a href="/shop-grid-standard">{productData.category}</a></li>
            </ul>
            </div>
            <div class="pro-details-meta">
                <span>ISBN :</span>
                <ul>
                    <li><a href="/shop-grid-standard">{productData.productId}</a></li>
                </ul>
            </div>
        </>
    );
}