import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';
import MyOrderListView from './MyOrderListView';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from "date-fns/locale/ko"; // the locale you want
import DaumPost from '../../DaumPost';
import { Modal } from '../../Modal';
import MyShipListView from './MyShipListView';

function MySubShips(props) {

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ address, setAddress] = useState('');
    const [ postcode, setPostcode ] = useState('');
    const [ addressDetail, setAddressDetail ] = useState('');
    const [ fullAddress, setFullAddress ] = useState('');
    const [subShipData, setSubShipData] = useState([]);
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

    useEffect(() => {
        let userId = localStorage.getItem('userid');
        let token = localStorage.getItem('token');

        if (!userId || userId === 'undefined') {
            window.location.href = "/login";
        }
        if (!token || token === 'undefined') {
            window.location.href = "/login";
        }

        const apiName = "구독배송 조회";

        axios.get(`/subscription-service/subscription/ships/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(`=== ${apiName} DATA ===`);
                console.log(res.data);
                console.log('=======================');

                setSubShipData(res.data);
            })
            .catch(error => {
                alert(`${apiName}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                console.log(error.response);
            })
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
                productName={`구독배송 조회`}
            />
            <section id="mypage">
                    <div className="row">
                    <div className="col-2 offset-1">
                        <SideBar />
                    </div>
                        <div className="col-8 ml-40">
                            <span style={{fontSize:"30px"}}><strong>구독배송 조회</strong></span>
                            <br /><br />
                            <div className="table-content table-responsive cart-table-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="1%">배송번호</th>
                                            <th width="1%">패키지번호</th>
                                            <th width="46%">배송지</th>
                                            <th width="1%">배송구분</th>
                                            <th width="1%">배송상태</th>
                                            <th width="1%">배송예정일</th>
                                            <th width="8%"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            subShipData.map((item, index) => (
                                                <MyShipListView
                                                    key={item.id}
                                                    shipData={item}
                                                />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <br /><br />
                        </div>
                        
                    </div>
            </section>
            <Footer />
            
        </Fragment>
    );              
}

export default MySubShips;