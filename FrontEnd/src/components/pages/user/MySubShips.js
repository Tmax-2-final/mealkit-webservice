import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';
import MyShipListView from './MyShipListView';
import Pagination from "../../elements/ui/Pagination"

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

    // 캘린더
    const [startDate, setStartDate] = useState(() => {
        let date = new Date();
        let weekago = new Date(date.setDate(date.getDate() + 2));
        weekago = weekago.setHours(0,0,0,0);
        return weekago;
    });
    const [endDate, setEndDate] = useState(() => {
        let date = new Date();
        let weekago = new Date(date.setDate(date.getDate() + 8));
        weekago = weekago.setHours(0,0,0,0);
        return weekago;
    });

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

        // axios.get(`/subscription-service/subscription/ships/${userId}`, {
        axios.get(`/subscription-service/ships/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page
            }
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
                            <br /><br /><br />
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
                            <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts}
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