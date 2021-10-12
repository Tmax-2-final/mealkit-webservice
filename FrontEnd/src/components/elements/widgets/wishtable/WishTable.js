import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router";
import {Link} from 'react-router-dom';

export default function WishTable() {

    const history = useHistory();

    const [wishDatas, setWishDatas] = useState([]);

    let process = require('../../../../myProcess.json');

    useEffect(()=>{
        fetch(`http://${process.IP}:${process.PORT}/wish`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setWishDatas(data);
        });
    },[process.IP, process.PORT]);

    const handleDelete = (id) => {
        
        fetch(`http://${process.IP}:${process.PORT}/wish/${id}`,{
            method: "DELETE"
        }).then(
            alert("삭제되었습니다."),
            fetch(`http://${process.IP}:${process.PORT}/wish`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setWishDatas(data);
                console.log(data);
            })
        )
    }

    // const handleAllDelete = (e) => {
    //     alert(wishIdDatas);
    //     // fetch(`http://${process.IP}:${process.PORT}/wish/${wishIds}`,{
    //     //         method: "DELETE"
    //     // })
        
    //     wishIdDatas.map(item => (
    //         fetch(`http://${process.IP}:${process.PORT}/wish/${item}`,{
    //             method: "DELETE"
    //         })
    //     )).then(
    //         alert("all delete"),
    //         setWishDatas([]),
    //         history.push(`/`)

    //         // fetch(`http://${process.IP}:${process.PORT}/wish`)
    //         // .then(
    //         //     res => {
    //         //     return res&&res.json();
    //         // })
    //         // .then(data => {
    //         //     data ? setWishDatas(data) : alert("nodata");
    //         // })
    //     )

    // }

    const wishTableList = wishDatas.map((item, idx) => (
        
        <tr key={idx}>
            <td className="product-thumbnail"><Link to={`/productdetail/${item.id}`}><img className="img-fluid" src={item.image[0]} alt="/" /></Link></td>
            <td className="product-name text-center"><Link to={`/productdetail/${item.id}`}>{item.name}</Link></td>
            <td className="product-price-cart"><span className="amount old">{item.price}</span><span className="amount">{(item.price * ((100+item.discount)/100)).toFixed(2)}</span></td>
            <td className="product-wishlist-cart"><Link to={`/productdetail/${item.id}`}>Select option</Link></td>
            <td className="product-remove"><button onClick={()=>handleDelete(item.id)}><i className="fa fa-times"></i></button></td>
        </tr>

    )) 
    // : 
    //     <tr>
    //     <td className="product-thumbnail">a</td>
    //     <td className="product-name text-center">a</td>
    //     <td className="product-price-cart">a</td>
    //     <td className="product-wishlist-cart">a</td>
    //     <td className="product-remove">a</td>
    //     </tr>

    return(
        <div className="cart-main-area pt-90 pb-100">
            <div className="container">
                <h3 className="cart-page-title">Your wishlist items</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="table-content table-responsive cart-table-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Unit Price</th>
                                        <th>Add To Cart</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishTableList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="cart-shiping-update-wrapper">
                            <div className="cart-shiping-update">
                                <a href="/shop-grid-standard">Continue Shopping</a>
                            </div>
                            <div className="cart-clear">
                                 <button>Clear Wishlist</button> 
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}