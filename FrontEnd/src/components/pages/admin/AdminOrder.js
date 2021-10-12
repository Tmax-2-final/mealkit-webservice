import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import AdminSideBar from '../../elements/ui/AdminSidebar';
import DatePicker from "react-datepicker";
import PaymentTable from '../payment/PaymentTable';
import axios from 'axios';
import Pagination from '../../elements/ui/Pagination';

function AdminOrder(props) {
    const [startDate, setStartDate] = useState(() => {
        // 일주일전을 검색 기본 시작일자, 시분초를 시작으로 설정 (검색)
        let date = new Date();
        let weekago = new Date(date.setDate(date.getDate() -7));
        weekago = weekago.setHours(0,0,0,0);
        return weekago;
    });
    const [endDate, setEndDate] = useState(() => {
        let date = new Date();
        // 시분초를 끝으로 설정 (검색)
        let today = new Date(date.setDate(date.getDate())); 
        today = today.setHours(23,59,59,999);
        return today;
    });
    const [search, setSearch] = useState("");
    const [orderData, setOrderData] = useState([]);

    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');

    // 페이징 처리
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = orderData.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {

        if (localStorage.getItem('role') !== "ROLE_ADMIN") {
            alert("접근 권한이 없습니다!")
            window.location.href = "/"
        }
        
        console.log("날짜 ==");
        console.log(startDate);
        console.log(endDate);

        let body = {
            startDate: startDate,
            endDate: endDate,
            searchData: search
        }

        // 주문 조회
        // axios.get(`/order-service/orders`, {
        axios.post(`/order-service/orders/date`, body, {    
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(data => {;
            console.log(data.data);
            setOrderData(data.data);
        })
        .catch((err) => {
            console.log(err);

            if (err.response.status === 400){
                    alert("주문하려는 상품 재고가 부족합니다.2");
                }
                else if (err.response.status === 500){
                    alert("시스템 에러[500]\r\n[관리자에게 문의바랍니다]2");
                }
                else if (err.response.status === 503){
                    alert("서비스 연결 에러[503]\r\n[관리자에게 문의바랍니다]2");
                }
        })
    }, [startDate, endDate]);

    const searchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const searchHandler = () => {

        let body = {
            startDate: startDate,
            endDate: endDate,
            searchData: search
        }

        // 날짜별 주문 조회
        axios.post(`/order-service/orders/date`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res);
                setOrderData(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert('오류가 발생했습니다');
            })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
                            <SubTitle title="주문 관리" />
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
                                        <form className="pro-sidebar-search-form" onSubmit={handleSubmit}>
                                            <input
                                                onChange={searchChange}
                                                type="text"
                                                placeholder="검색할 주문번호"
                                                value={search}
                                            />
                                            <button onClick={searchHandler}>
                                                <i className="las la-search" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <PaymentTable 
                                orderData={currentPosts} 
                            />
                            <Pagination postsPerPage={postsPerPage} totalPosts={orderData.length}
                                    paginate={paginate} />
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

export default AdminOrder;