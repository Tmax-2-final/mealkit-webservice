import React, { useEffect, useState } from 'react';
import CartListView from '../../ui/CartListView';
import axios from "axios";
import { useHistory, Link } from 'react-router-dom';

export default function CartTable() {

    const [cartDatas, setCartDatas] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const history = useHistory();

    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');

    useEffect(() => {
            async function fetchData() {
            
            if(token === 'undefined' || !token) {
                window.location.href = "/login";
            }
            
            // 장바구니 조회 호출
            const result = await axios.get(`/user-service/${userId}/carts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((data) => {
                    console.log(data.data);
                    setCartDatas(data.data);
                    defultTotalPrice(data.data);
                    //console.log(3);
            })
            .catch((err) => {
                console.log(err);
                if (err) {
                    alert('장바구니를 조회하는데 실패했습니다.');
                }
                
            })
        }
        fetchData();
    }, []);

    const defultTotalPrice = (data) => {
        //console.log(1);
        
        let total = 0
        Object.entries(data).forEach(([key, value]) => {
            total += (value.unitPrice * value.qty)
        })
        setTotalPrice(total);
        //console.log(totalPrice);
        return total;
    }

    // 장바구니 전체 삭제 호출
    const handleDeleteAll = () => {
        axios.delete(`/user-service/${userId}/carts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                axios.get(`/user-service/${userId}/carts`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(data => {
                        console.log(data);
                        setCartDatas(data.data);
                        setTotalPrice(0);
                        alert("전체 삭제 되었습니다");
                    })
            })
    }

    const handleCheck = (e) => {
        e.preventDefault();
        console.log(cartDatas);
        console.log(totalPrice);
        if(!cartDatas || totalPrice === 0){
            alert("장바구니에 상품이 없습니다!")
        }
        else {
            if(window.confirm("해당 장바구니 내역으로 주문하시겠습니까?")) {
                history.push({
                    pathname: '/payment',
                    state: {
                        data: cartDatas,
                        totalPriceData: totalPrice
                    }
                })
            }
        }
    }

    return (
        <div className="cart-main-area pt-90 pb-100">
            <div className="container">
                <h3 className="cart-page-title">장바구니</h3>
                
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content table-responsive cart-table-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>이미지</th>
                                        <th>상품명</th>
                                        <th>단가</th>
                                        <th>수량</th>
                                        <th>가격</th>
                                        <th>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartDatas.map(item => (
                                            <CartListView
                                                key={item.cartId}
                                                data={item}
                                                setCartDatas={setCartDatas}
                                                totalPrice={totalPrice}
                                                setTotalPrice={setTotalPrice}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="cart-shiping-update-wrapper">
                            <div className="cart-shiping-update">
                                <Link to="/productlist">쇼핑 계속하기</Link>
                            </div>
                            <div className="cart-clear">
                                <button onClick={() => handleDeleteAll()}>장바구니 비우기</button>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="grand-totall">
                            <div className="title-wrap">
                                <h4 className="cart-bottom-title section-bg-gary-cart">결제 금액</h4>
                            </div>

                            <h5>주문금액
                                <span>{totalPrice} 원</span>
                            </h5>
                            <h5>할인금액
                                <span>- 2000 원</span>
                            </h5>
                            <h5>배송비
                                <span>+ 3000 원</span>
                            </h5>
                            <h4 class="grand-totall-title">총 결제 금액
                                <span>{totalPrice + 1000} 원</span>
                            </h4>

                            <Link onClick={handleCheck}>주문하기</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}