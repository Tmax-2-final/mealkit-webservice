import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import AdminSideBar from '../../elements/ui/AdminSidebar';
import { Link } from "react-router-dom";
import UserTable from '../../elements/widgets/usertable/UserTable';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "../../../../src/assets/css/react-datepicker.css";
import Pagination from '../../elements/ui/Pagination';








function AdminUser(props) {

    const [startDate, setStartDate] = useState(new Date("2021/01/01"));
    const [endDate, setEndDate] = useState(new Date());


    const [userDatas, setUserDatas] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = userDatas.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [sortEmailFlag, setSortEmailFlag] = useState(0);
    const [sortNameFlag, setSortNameFlag] = useState(0);
    const [sortTimeFlag, setSortTimeFlag] = useState(0);

    let token = localStorage.getItem('token');

    const searchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    useEffect(() => {

        if(localStorage.getItem('role') !== "ROLE_ADMIN") {
            alert("접근 권한이 없습니다!")
            window.location.href = "/"
        }

        const fetchPosts = async () => {
            setLoading(true);
        }
        axios.get(`/user-service/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                console.log(data);
                setUserDatas(data.data);
                setLoading(false);
            });
        fetchPosts();
    }, []);

    const searchHandler = (e) => {
        e.preventDefault();
        let body = {
            startDate: startDate,
            endDate: endDate,
            searchData: search
        }

        console.log(body);

        axios.post(`/user-service/users/date`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res);
                alert('검색을 시작합니다');
                setUserDatas(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert('오류가 발생했습니다');
            })

    }

    const onEmailSortHandler = () => {
        if (sortEmailFlag === 0) {
            setSortEmailFlag(1);
            setUserDatas(userDatas.sort((a, b) => {
                return a.email < b.email ? -1 : a.email > b.email ? 1 : 0;
            })
            )

        }
        else {
            setSortEmailFlag(0)
            setUserDatas(userDatas.sort((a, b) => {
                return a.email > b.email ? -1 : a.email < b.email ? 1 : 0;
            }))
        }
    }

    const onNameSortHandler = () => {
        if (sortNameFlag === 0) {
            setSortNameFlag(1);
            setUserDatas(userDatas.sort((a, b) => {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            })
            )

        }
        else {
            setSortNameFlag(0)
            setUserDatas(userDatas.sort((a, b) => {
                return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
            }))
        }
    }

    const onTimeSortHandler = () => {
        if (sortTimeFlag === 0) {
            setSortTimeFlag(1);
            setUserDatas(userDatas.sort((a, b) => {
                return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
            })
            )

        }
        else {
            setSortTimeFlag(0)
            setUserDatas(userDatas.sort((a, b) => {
                return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
            }))
        }
    }

    return (

        <Fragment>

            <Header />
            <Bread
                productId={`test`}
                productName={`admin`}
                productUrl={`test3`}
            />
            <section id="adminuser">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <AdminSideBar />
                        </div>
                        <div className="col-10">
                            {/* <Title title="My Account" /> */}


                            <SubTitle title="회원 관리" />
                            <hr></hr>
                            <div className="row">
                                <>
                                    <div className="col-3">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                        />
                                    </div>
                                    <div className="col-1 my-auto">
                                        <span>~</span>
                                    </div>
                                    <div className="col-3">
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                        />
                                    </div>
                                </>
                                <div className="col-4" >
                                    <div className="pro-sidebar-search">
                                        <form className="pro-sidebar-search-form">
                                            <input
                                                onChange={searchChange}
                                                type="text"
                                                placeholder="사용자명 입력"
                                                value={search}
                                            />
                                            <button onClick={searchHandler}>
                                                <i className="las la-search" />
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="container">
                                <ul style={{ listStyle: "none", textAlign: "right" , marginTop: "10px", marginBottom: "-50px"}}>
                                    <li style={{ display: "inline", marginRight: "10px" }}> <Link onClick={onEmailSortHandler}>이메일</Link></li>
                                    <li style={{ display: "inline", marginRight: "10px" }}> | </li>
                                    <li style={{ display: "inline", marginRight: "10px" }}> <Link onClick={onNameSortHandler}>이름</Link></li>
                                    <li style={{ display: "inline", marginRight: "10px" }}> | </li>
                                    <li style={{ display: "inline", marginRight: "10px" }}> <Link onClick={onTimeSortHandler}>날짜</Link></li>
                                </ul>
                                <UserTable
                                    userDatas={currentPosts} 
                                    setUserDatas={setUserDatas}
                                    loading={loading}/>
                                <Pagination postsPerPage={postsPerPage} totalPosts={userDatas.length}
                                    paginate={paginate} />
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br /><br />
            </section>
            {/*<ProductBottom/>*/}
            <Footer />
        </Fragment >
    );
}

export default AdminUser;