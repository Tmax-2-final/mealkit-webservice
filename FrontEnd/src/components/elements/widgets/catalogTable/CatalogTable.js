import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router";
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function CatalogTable({item}) {
    console.log("==재고 체크==")
    console.log(item);
    console.log(item.stock);

    const history = useHistory();

    const [count, setCount] = useState(item.stock);
    console.log(count);

    let process = require('../../../../myProcess.json');

    useEffect(() => {
        setCount(item.stock);
    }, [item])

    const handleCountAdd = () => {
        setCount(count + 1);
    }

    const handleCountDec = () => {
        count > 1 ? setCount(count - 1) : alert("최소 수량은 1개 입니다.")
    }

    const handleDelete = (id) => {
        
        axios.delete(`/catalog-service/catalogs/${id}`)
            .then(res => {
                alert("삭제 되었습니다.")
                axios.get(`/catalog-service/catalogs`)
                    .then(data => {
                        console.log(data);
                        // setCatalogDatas(data.data);
                    })
            })

    }

    const handleUpdate = (change) => {
        console.log(change);

        let body = {
            productId: item.productId,
            stock: count


        }

        axios.put(`/catalog-service/catalogs/${item.productId}/${count}`)
            .then(res => {
                console.log(res)
                if(res.status === 200) {
                    alert("상품 수정이 완료 되었습니다.");
                    // window.location.href = "/admin/catalogs"
                } else {
                    alert("다시 입력해주세요.");
                }
            })
            .catch(err => {
                alert("다시 다시 입력해주세요.");
            })

    }

    return(
        <tr key={item.productId}>
            <td className="product-thumbnail"><Link to={`/productdetail/${item.productId}`}><img className="img-fluid" src={`https://bookstore-image.s3.us-east-2.amazonaws.com/${item.image}`} alt="/" /></Link></td>
            <td className="product-name text-center"><Link to={`/productdetail/${item.productId}`}>{item.name}</Link></td>
            <td className="product-wishlist-cart product-quantity ">
                
                <div className="cart-plus-minus">
                    <button className="dec qtybutton" onClick={() => handleCountDec()}>-</button>
                    <input className="cart-plus-minus-box" type="text" readOnly="" value={count} />
                    <button className="inc qtybutton" onClick={() => handleCountAdd()}>+</button>
                </div>
                <button onClick={ ()=> handleUpdate(count)}>Change</button>
            </td>
            <td className="product-price-cart"><span className="amount">{item.unitPrice}원</span></td>
            <td className="product-wishlist-cart"><Link to={`/admin/catalogs/${item.productId}`}>Click</Link></td>
            <td className="product-remove"><button onClick={()=>handleDelete(item.productId)}><i className="fa fa-times"></i></button></td>
        </tr>
    );
}