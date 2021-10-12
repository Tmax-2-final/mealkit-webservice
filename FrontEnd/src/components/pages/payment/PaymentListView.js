import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

export default function PaymentListView({data }) {

    console.log(data);

    const [status, setStatus] = useState("1");

    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');

    const handleCancel = () => {
        if (window.confirm(`주문번호 [${data.orderId}] 주문건을 정말로 취소하시겠습니까?`)) {
            let body = {
                orderId: data.orderId,
                status: "5"
            };
    
            axios.put(`/order-service/${userId}/orders`, body)
            .then((res) => {
                console.log(res)
                if (res.status === 201) {
                    alert("주문이 취소되었습니다.")
                    window.location.href="/admin/orders";
                }   
                else {
                    alert("주문 취소 실패");
                }
            })
            .catch(err => {
                alert("에러 : 주문 취소 실패");
            })
          }
    }

    const handleChangeStatus = () => {
        if(data.status === status){
            alert("같은 주문상태로 변경할 수 없습니다.");
        }
        else {
            if (window.confirm(`주문번호 [${data.orderId}] 해당 주문건의 주문상태를 정말로 변경하시겠습니까?`)) {
                let body = {
                    orderId: data.orderId,
                    status: status
                };
        
                axios.put(`/order-service/${userId}/orders`, body)
                .then((res) => {
                    console.log(res)
                    if (res.status === 201) {
                        alert("주문 상태가 변경되었습니다.")
                        window.location.href="/admin/orders";
                    }   
                    else {
                        alert("주문 상태 변경 실패");
                    }
                })
                .catch(err => {
                    alert("에러 : 주문 상태 변경 실패");
                })
            }
        }
    }

    const handleChgSelect = e => {
        const { name, value } = e.target;
        setStatus(value);
    }

    return (
        <tr>
            <td className="product-name">
                {new Date(Date.parse(data.createdAt)).toLocaleString().split("오")[0]}
            </td>
            <td className="product-name">
                {data.orderId}
            </td>
            <td className="product-name">
                {data.user.email}
            </td>
            <td className="product-price-cart">
                <span className="amount">{data.totalPrice} 원</span>
            </td>
            <td className="product-wishlist-cart product-quantity">
                <div className="cart-plus-minus">
                    {
                        (function(){
                            if(data.status === "1") return (<div>결제완료</div>)
                            if(data.status === "2") return (<div>배송준비중</div>)
                            if(data.status === "3") return (<div>배송중</div>)
                            if(data.status === "4") return (<div>배송완료</div>)
                            if(data.status === "5") return (<div>주문취소</div>)
                        })()
                    }
                    
                </div>
                <select onChange={handleChgSelect}>
                    <option value="1">결제완료</option>
                    <option value="2">배송준비중</option>
                    <option value="3">배송중</option>
                    <option value="4">배송완료</option>
                </select>
                <button onClick={handleChangeStatus}>변경</button>
            </td>
            <td className="product-remove"><button onClick={() => handleCancel(data.cartId)}><i className="fa fa-times"></i></button></td>
        </tr>
    )
}