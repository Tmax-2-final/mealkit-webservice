import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

export default function CartListView({ data, setCartDatas, totalPrice, setTotalPrice }) {

    const [count, setCount] = useState(data.qty);

    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');

    const handleCountAdd = () => {
        setCount(count + 1);
        data.qty += 1;
        setTotalPrice(totalPrice + data.unitPrice);
    }

    const handleCountDec = () => {
        if(count > 1) {
            setCount(count - 1);
            data.qty -= 1;
            setTotalPrice(totalPrice - data.unitPrice);
        }
        else {
            alert("최소 수량은 1개 입니다.")
        }
        
    }
    const handleDelete = (cartId) => {

        axios.delete(`/user-service/carts/${cartId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(
                alert("해당 상품이 삭제 되었습니다!"),
                axios.get(`/user-service/${userId}/carts`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(data => {
                        console.log(data);
                        setCartDatas(data.data);
                        window.location.href="/cart";
                    })
            )
    }

    const countHandler = (e) => {
        e.preventDefult();
        setCount(e.target.value);
    }

    return (
        <tr>
            <td className="product-thumbnail">
                <Link to={`/productdetail/${data.productId}`}><img className="img-fluid" src={`https://bookstore-image.s3.us-east-2.amazonaws.com/${data.image}`} alt="" /></Link>
            </td>
            <td className="product-name">
                <Link to={`/productdetail/${data.productId}`}>{data.name}</Link>
            </td>
            <td className="product-price-cart">
                <span className="amount">{data.unitPrice} 원</span>
            </td>
            <td className="product-quantity">
                <div className="cart-plus-minus">
                    <button className="dec qtybutton" onClick={() => handleCountDec()}>-</button>
                    <input className="cart-plus-minus-box" type="text" readonly="" value={count} onChange={countHandler} />
                    <button className="inc qtybutton" onClick={() => handleCountAdd()}>+</button>
                </div>
            </td>
            <td className="product-subtotal">{(data.unitPrice * count)} 원</td>
            <td className="product-remove"><button onClick={() => handleDelete(data.cartId)}><i className="fa fa-times"></i></button></td>
        </tr>

    );
}