import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../../../Modal';

export default function Brand(){
  
    const [modalOpen, setModalOpen ] = useState(false);
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const searchDeliveryByModalHandler = () => {
        openModal(true);
    }

    return(
        <Fragment>
        <Modal  open={ modalOpen } 
                    close={ closeModal } 
                    setModalOpen = {setModalOpen} 
                    setAddress = {setAddress} 
                    setPostcode = {setPostcode} 
            />
        <section id="brand">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5" style={{ padding:"20px", backgroundColor: "WhiteSmoke"}}>
                        <div className="row">
                            <div className="col-12 col-sm-4">
                                <img alt="" src="/assets/img/brand-logo/delivery-truck.png"></img>
                            </div>
                            <div className="col-12 col-sm-8">
                                <p className="brandTitle">우리집도 새벽 배송이 되나요?</p>
                                <p className="brandTxt">배송이 가능한지 알려드려요.</p>
                                <br/>
                                <span className="brandTxt"><Link onClick={searchDeliveryByModalHandler}><i className="fas fa-map-marker-alt"></i> 배송지 검색</Link></span>
                                <br />
                                {   
                                    address === "" ? <></> :
                                    address.split(" ")[0].includes("서울") ?
                                                <span style={{ color: "green" }}>새벽배송 가능한 지역입니다.</span>
                                        :
                                        address.split(" ")[0].includes("경기") ?
                                                    <span style={{ color: "green" }}>새벽배송 가능한 지역입니다.</span>
                                            :
                                            address.split(" ")[0].includes("인천") ?
                                                        <span style={{ color: "green" }}>새벽배송 가능한 지역입니다.</span>
                                                :
                                                        <span style={{ color: "red" }}>새벽배송 불가능한 지역입니다.</span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                    </div>

                    <div className="col-12 col-md-5" style={{ padding: "20px", backgroundColor: "WhiteSmoke" }}>
                        <div className="row">
                            <div className="col-12 col-sm-4">
                                <img alt="" src="/assets/img/brand-logo/lunch-box.png"></img>
                            </div>
                            <div className="col-12 col-sm-8">
                                <p className="brandTitle">처음오셨나요?</p>
                                <p className="brandTxt">밀키트 정기 구독에 대해 알려드릴게요.</p>
                                <br />
                                <span className="brandTxt"><Link to="/subscription/introduce"><i className="far fa-plus-square"></i> 보러가기</Link></span>
                            </div>
                        </div>
                    </div>
                </div> 
            </div> 
        </section>
        </Fragment>
    );
}