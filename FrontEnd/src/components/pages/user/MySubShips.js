import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';
import MyShipListView from './MyShipListView';
import Pagination from "../../elements/ui/Pagination"
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from "date-fns/locale/ko"; // the locale you want
import * as moment from 'moment';

function MySubShips(props) {
    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');

    const [loading, setLoading] = useState(true);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ address, setAddress] = useState('');
    const [ postcode, setPostcode ] = useState('');
    const [ addressDetail, setAddressDetail ] = useState('');
    const [ fullAddress, setFullAddress ] = useState('');
    const [subShipData, setSubShipData] = useState([]);
    const [selStatus, setSelStatus] = useState('all');

    // 캘린더
    const [startDate, setStartDate] = useState(() => {
        let date = new Date();
        let weekago = new Date(date.setDate(date.getDate() - 30));
        //weekago = weekago.setHours(0,0,0,0);
        return weekago;
    });
    const [endDate, setEndDate] = useState(() => {
        let date = new Date();
        let weekago = new Date(date.setDate(date.getDate() + 30));
        //weekago = weekago.setHours(0,0,0,0);
        return weekago;
    });

    registerLocale("ko", ko);

    const [selDate, setSelDate] = useState(null);

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 1;
    };


    // 페이징
    const [ currentPage, setCurrentPage ] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(0);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        getShips(pageNumber);
    }

    const getShips = (page) => {
        const apiName = "구독배송 조회";

        const start = moment(startDate, 'YYYY-MM-DD').format().split('T')[0];
        const end = moment(endDate, 'YYYY-MM-DD').format().split('T')[0];

        const params = {
            page: page,
            startDate: start,
            endDate: end,
        }

        console.log(`=== ${apiName} PARAMS ===`);
        console.log(params);
        console.log('=======================');

        // axios.get(`/subscription-service/subscription/ships/${userId}`, {
        axios.get(`/subscription-service/ships/${userId}/${selStatus}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: params
        })
            .then(res => {
                console.log(`=== ${apiName} DATA ===`);
                console.log(res.data.content);
                console.log('=======================');

                setSubShipData(res.data.content);
                setTotalPosts(res.data.totalElements);
                setPostsPerPage(res.data.size);
                setLoading(false);

            })
            .catch(error => {
                alert(`${apiName}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                console.log(error.response);
            })
    }

    useEffect(() => {
        if (!userId || userId === 'undefined') {
            window.location.href = "/login";
        }
        if (!token || token === 'undefined') {
            window.location.href = "/login";
        }

        getShips(1);

        
    }, []);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const changeDueDateHandler = () => {
        openModal(true);
    }

    const handleKeyDown = e => {
        const { name, value } = e.target;
        setAddressDetail(value);
    }

    const seacrhPostHandler = e => {
        openModal(true);
    }

    const statusChangeHandler = e => {
        setSelStatus(e.target.value);
    }

    const searchHandler = e => {
        getShips(1);
    }

    return (
        <Fragment>
            <Header />
            <Bread
                productName={`배송 조회`}
            />
            <section id="mypage">
                    <div className="row">
                    <div className="col-2 offset-1">
                        <SideBar />
                    </div>
                        <div className={`col-8 ml-40`}>
                            <span style={{fontSize:"30px"}}><strong>배송 조회</strong></span>
                            <br /><br />
                            <div className="row mt-12 mb-4">
                                <>
                                    {/* <div className="col-1 my-auto">
                                        <span>배송일</span>
                                    </div> */}
                                    <div className="col-2 my-auto">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            locale="ko"
                                            dateFormat="yyyy.MM.dd(eee)"
                                        />
                                    </div>
                                    <div className="col-1 my-auto text-center">
                                        <span>~</span>
                                    </div>
                                    <div className="col-2 my-auto">
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            locale="ko"
                                            dateFormat="yyyy.MM.dd(eee)"
                                        />
                                    </div>
                                </>
                                <div className="col-2 my-auto ml-20">
                                <select class="form-select" aria-label="Default select example" onChange={statusChangeHandler}>
                                    <option selected value="all">전체상태</option>
                                    <option value="1">상품준비중</option>
                                    <option value="3">배송중</option>
                                    <option value="5">배송완료</option>
                                </select>
                                </div>
                                <div className="col-2 my-auto">
                                <button class="btn btn-primary" onClick={searchHandler}>조회<i className="las la-search ml-2" /></button>
                                    {/* <div className="pro-sidebar-search">
                                        <form className="pro-sidebar-search-form" 
                                            //onSubmit={handleSubmit}
                                        >
                                            <input
                                                //onChange={searchChange}
                                                type="text"
                                                placeholder="검색할 주문번호"
                                                //value={search}
                                            />
                                            <button 
                                                //onClick={searchHandler}
                                            >
                                                <i className="las la-search" />
                                            </button>
                                        </form>
                                    </div> */}
                                </div>
                            </div>
                            {
                                loading === false ?
                                subShipData.map((item, index) => (
                                    <MyShipListView
                                        key={item.id}
                                        shipData={item}
                                    />
                                ))
                                :
                                ""
                            }
                        </div>
                    </div>
                    <div className="row">
                        {
                            loading === false ?
                            <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} currentPage={currentPage}
                            paginate={paginate} />
                            :
                            ""
                        }
                        
                    </div>
            </section>
            <Footer />
            
        </Fragment>
    );              
}

export default MySubShips;