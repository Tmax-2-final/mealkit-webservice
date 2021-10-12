import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import CatalogTable from '../../elements/widgets/catalogTable/CatalogTable';
import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Pagination from "../../elements/ui/Pagination";

export default function Cataloglist({ search, stockSearch, setSearch, setStockSearch }) {

    const [catalogDatas, setCatalogDatas] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
        }
        axios.get(`/catalog-service/catalogs`)
            .then(res => {
                setCatalogDatas(res.data);
                setSearch(null);
                // setStockSearch("100");
                setLoading(false);
            });
        fetchPosts()
    }, []);

    const searchData = search !== null ? catalogDatas.filter(item => 
        (item.name.toLowerCase().includes(search)) || (item.category.includes(search)) ) : catalogDatas;


    return (
        <Fragment>
            <div className="cart-main-area pt-90 pb-100">
                <div className="container">
                    <h3 className="cart-page-title">상품 정보 관리</h3>
                    <div className="row">
                        <div className="col-12">
                            <div className="table-content table-responsive cart-table-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th><b>이미지</b></th>
                                            <th><b>상품명</b></th>
                                            <th>재고</th>
                                            <th>가격</th>
                                            <th>수정</th>
                                            <th>삭제</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            searchData.map(item => (
                                                <CatalogTable
                                                    item={item}
                                                    indexOfFirstPost={indexOfFirstPost}
                                                    indexOfLastPost={indexOfLastPost}
                                                />
                                            )).slice(indexOfFirstPost, indexOfLastPost)
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart-shiping-update-wrapper">
                                <div className="cart-clear">
                                    <a href="/admin/catalog-register">상품 등록</a>
                                </div>
                                <div className="cart-clear">
                                    <a href="/admin/catalog-register">상품 수정</a>

                                </div>
                            </div>
                            <Pagination postsPerPage={postsPerPage} totalPosts={searchData.length}
                                paginate={paginate} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}