import SubTitle from '../../ui/SubTitle';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from "date-fns/locale/ko"; // the locale you want
import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Modal } from '../../../Modal';
import axios from 'axios';

function ChangeAddressAndDueDate(props) {
    const params = props.match.params;

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ address, setAddress] = useState(params.address);
    const [ postcode, setPostcode ] = useState(params.postcode);
    const [ addressDetail, setAddressDetail ] = useState(params.addressDetail);
    const [ fullAddress, setFullAddress ] = useState('');
    const [shipType, setShipType] = useState('');
    const [subShipData, setSubShipData] = useState([]);
    const [startDate, setStartDate] = useState(() => {
        let date = new Date(params.dueDate);
        let weekago = new Date(date.setDate(date.getDate() - 2));
        weekago = weekago.setHours(0,0,0,0);
        return weekago;
    });
    const [endDate, setEndDate] = useState(() => {
        let date = new Date(params.dueDate);
        let weekago = new Date(date.setDate(date.getDate() + 2));
        weekago = weekago.setHours(0,0,0,0);
        return weekago;
    });
    
    const [selDate, setSelDate] = useState(new Date(params.dueDate));

    useEffect(() => {
        if(address.split(" ")[0] === '서울' || address.split(" ")[0] === '경기'|| address.split(" ")[0] === '인천'){
            setShipType('1');
        }
        else {
            setShipType('2');
        }
    }, [address])

    registerLocale("ko", ko);

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 1;
    };

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

    function getDateTime(){
        var date = selDate;
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
    
        return year + "-" + month + "-" + day;
    }

    const changeShipInfoHandler = e => {
        if(window.confirm(`배송번호 ${params.id}번의 배송정보를 변경하시겠습니까?`)){
            console.log(selDate);

            

            const params2 = {
                address : address,
                addressDetail : addressDetail,
                postcode : postcode,
                type: shipType,
                dueDate: getDateTime(selDate)
            }

            const apiName = "배송정보 변경"

            console.log(`====== ${apiName} API PARAMS ======`);
            console.log(params2);
            console.log("==================================");

            axios.put(`/subscription-service/subscription/ships/${params.id}`,null , {
                params : params2
            })
            .then(res => {
                if(res.status === 200){
                    console.log(`====== ${apiName} 응답 데이터 ======`);
                    console.log(res.data);
                    console.log("===================================");

                    alert("배송정보 변경 완료");
                    
                    // 배송정보 변경 완료 시 부모창 리로드
                    opener.parent.location.reload();
                    window.close();
                }
                
            })
            .catch(error => {
                alert(`${apiName}에 실패했습니다. 관리자에게 문의바랍니다.\r\n${error}`);
                console.log(error.response);
            })
        }
    }

    return (
        <>
        <Modal  
            open={ modalOpen } 
            close={ closeModal } 
            setModalOpen = {setModalOpen} 
            setAddress = {setAddress} 
            setPostcode = {setPostcode} 
            setFullAddress = {setFullAddress}
        />
        <div className="container mt-20">
            <div className="row">
                <div className="col-12">
                    <SubTitle title = {`배송정보변경 (배송번호 : ${params.id})`}/>
                    <hr></hr>
                        <div className="form-group m-form__group row">
                            <label className="col-3 col-form-label">
                                <span className="m--font-orange vertical-middle" style={{fontSize:"1rem", fontWeight:"bold"}}>주&nbsp;&nbsp;소&nbsp;&nbsp;</span>
                            </label>
                            <div className="col-3">
                                <input 
                                    type="text" 
                                    className="form-control m-input" 
                                    name="postcode" 
                                    id="postcode" 
                                    placeholder="우편번호" 
                                    readOnly 
                                    value = {postcode}
                                />
                            </div>
                            <br/><br/>
                            <div className="col-6 postcode-btn">
                                <button type="button" className="btn btn-info m-btn--air mr-30" onClick={seacrhPostHandler}>우편번호 찾기</button>
                            </div>
                            <div className="col-7 offset-3">
                                <input
                                type="text"
                                className="form-control m-input m--margin-top-10"
                                name="address"
                                id="address"
                                placeholder="도로명 주소"
                                value={address}
                                readOnly
                                />
                            </div>
                            <br/><br/>
                            <div className="col-7 offset-3">
                                <input
                                type="text"
                                className="form-control m-input m--margin-top-10"
                                name="detailAddress"
                                placeholder="상세 주소"
                                onChange={handleKeyDown}
                                value={addressDetail}
                                required
                                />
                            </div>
                        </div>
                    <br/>
                    <div className="row">
                        <div className="col-3 my-auto" style={{fontSize:"1rem", fontWeight:"bold"}}>배송구분</div>
                        <div className="col-2 pr-0">
                            {address.split(" ")[0] === '서울' 
                            || address.split(" ")[0] === '경기'
                            || address.split(" ")[0] === '인천'
                            ? "새벽배송" : "일반배송"}
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-3 my-auto" style={{fontSize:"1rem", fontWeight:"bold"}}>배송날짜</div>
                        
                        <div className="col-5" style={{fontSize:"1rem"}}>
                            <DatePicker
                                selected={selDate}
                                onChange={(date) => {
                                    setSelDate(date);
                                }}
                                minDate={startDate}
                                maxDate={endDate}
                                locale="ko"
                                placeholderText="배송받을 날짜를 선택"
                                dateFormat="yyyy.MM.dd(eee)"
                                filterDate={isWeekday}
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="row mt-30">
                <div className="col-lg-8 offset-lg-2 text-center">
                    <Button 
                        sx={{width:"12rem", height:"3rem"}}
                        variant="contained"
                        size="large"
                        onClick={changeShipInfoHandler}
                    >
                        배송정보 변경하기
                    </Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default ChangeAddressAndDueDate;