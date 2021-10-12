import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Rating from '../../ui/Rating';

export default function ComareTable() {

    const [comapareDatas, setCompareDatas] = useState([]);

    let process = require('../../../../myProcess.json');

    useEffect(()=>{
        fetch(`http://${process.IP}:${process.PORT}/compare`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setCompareDatas(data);
        });
    },[process.IP, process.PORT]);

    const handleDelete = (id) => {
        
        fetch(`http://${process.IP}:${process.PORT}/compare/${id}`,{
            method: "DELETE"
        }).then(
            alert("삭제되었습니다."),
            fetch(`http://${process.IP}:${process.PORT}/compare`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCompareDatas(data);
                console.log(data);
            })
        )
    }



    const comparelist01 = comapareDatas.map(item => (
        <td className="product-image-title">
            <div className="compare-remove">
                <button onClick={()=>handleDelete(item.id)}><i className="las la-trash"></i></button>
            </div>
            <Link className="image" to={`/productdetail/${item.id}`}><img className="img-fluid" src={item.image[0]} alt=""/></Link>
            <div className="product-title">
                <Link className="image" to={`/productdetail/${item.id}`}>{item.name}</Link>
            </div>
            <div className="compare-btn">
                <Link className="image" to={`/productdetail/${item.id}`}>Select Option</Link>
            </div>
        </td>
    )).slice(0,3);

    const comparelist02 = comapareDatas.map(item => (
        <td className="product-price">
            <span className="amount old">{(item.price * ((100+item.discount)/100)).toFixed(2)}</span>
            <span className="amount">{item.price}</span>
        </td>
    )).slice(0,3);

    const comparelist03 = comapareDatas.map(item => (
        <td className="product-desc">
            <p>{item.shortDescription}</p>
        </td>
    )).slice(0,3);

    const comparelist04 = comapareDatas.map(item => (
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
                                            <th className="title-column">Product Info</th>
                                            {comparelist01}
                                        </tr>
                                        <tr>
                                            <th className="title-column">Price</th>
                                            {comparelist02}
                                        </tr>
                                        <tr>
                                            <th className="title-column">Description</th>
                                            {comparelist03}
                                        </tr>
                                        <tr>
                                            <th className="title-column">Rating</th>
                                            {comparelist04}
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}