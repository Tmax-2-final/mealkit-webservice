import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

export default function UserListView({ data, setUserDatas }) {


    let token = localStorage.getItem('token');

    const handleDelete = (userId) => {

        axios.delete(`/user-service/${userId}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if(res.status === 200) {
                    console.log(res);
                    alert("해당 회원이 삭제 되었습니다!");
                    axios.get(`/user-service/users`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .then(data => {
                            if(data.status === 200) {
                                console.log(data);
                                alert("페이지 리로딩 성공");
                                setUserDatas(data.data);
                                // window.location.href="/admin/users"
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

    const Posts = ({ posts, loading }) => {
        if (loading) {
            <h2>loading..</h2>
        } (
            <ul className="list">
                {posts.map((post) => (
                    <li key={post.id} className="list_itme">
                        {post.title}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <tr>
            <td className="product-thumbnail">
                <span>{data.email}</span>
               
            </td>
            <td className="product-name">
                <span>{data.name}</span>
            </td>
            <td className="product-createdat">
                <span>{new Date(Date.parse(data.createdAt)).toLocaleString().split("오")[0]}</span>
            </td>
            <td className="product-modifiedat">
                <span>{new Date(Date.parse(data.modifiedAt)).toLocaleString().split("오")[0]}</span>
            </td>

            <td className="product-remove"><button onClick={() => handleDelete(data.userId)}><i className="fa fa-times"></i></button></td>
        </tr>

    );
}