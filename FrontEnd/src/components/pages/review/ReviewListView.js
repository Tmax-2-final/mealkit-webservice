import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
// import Pagination from './Pagination';
import Rating from '../../elements/ui/Rating';


export default function ReviewListView({ data, setReviewDatas }) {
    console.log(data);

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');

    const handleDelete = (userId, reviewId) => {

        axios.delete(`/review-service/reviews/${userId}/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    alert("해당 리뷰가 삭제 되었습니다!");
                    axios.get(`/review-service/reviews/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then(data => {
                            if (data.status === 200) {
                                console.log(data);
                                alert("페이지 리로딩 성공");
                                setReviewDatas(data.data);
                                window.location.href ="/mypage/review/list"
                            }
                            else {
                                console.log(data);
                                alert("페이지 리로딩 실패");
                            }

                        })
                        .catch((err) => {
                            console.log(err);
                            alert("페이지 리로딩 실패");
                        })
                }
                else {
                    console.log(res);
                    alert("삭제 실패");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("삭제 실패");
            });
    }



    return (
        <tr>
            {/* <td className="product-thumbnail">
                <span>{data.reviewId}</span>
            </td> */}
            <td className="product-thumbnail" >
                <span><img className="img-fluid" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${data.image}`} alt="" /></span>
            </td>
            <td className="product-name">
                <span>{data.title}</span>
            </td>
            <td className="product-name">
                <span>{data.productId}</span>
            </td>
            <td className="product-name">
                <span>{data.content}</span>
            </td>
            {/* <td className="product-name">
                <span>{data.rating}</span>

            </td> */}
            <td className="product-rating" style={{fontSize:'0.8rem'}}>
                {data.rating && data.rating > 0 ? (
                    <Rating ratingValue={data.rating} />
                ) : (
                    ""
                )}
            </td>
            {/* <td className="product-name">
                <span>{data.userId}</span>
            </td> */}
            {/* <td className="product-createdat">
                <span>{new Date(Date.parse(data.createdAt)).toLocaleString()}</span>
            </td> */}
            <td className="product-remove"><button onClick={() => handleDelete(data.reviewId)}><i className="fa fa-times"></i></button></td>
        </tr>
    );
}