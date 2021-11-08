import React, { Fragment, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlertTable from "../alert/AlertTable";
import axios from 'axios';
import * as moment from 'moment';
import { CPagination, CPaginationItem } from '@coreui/react';
import { ClipLoader } from "react-spinners";

const Alert = (props) => {

    const [loading, setLoading] = useState(true);
    const [alertDatas, setAlertDatas] = useState([]);

    const [startDate, setStartDate] = useState(new Date("2021/01/01"));
    const [endDate, setEndDate] = useState(new Date());

    const [searchType, setSearchType] = useState("all");
    const [searchValue, setSearchValue] = useState("");

    const [codeType, setCodeType] = useState('0');

    const [totalPages, setTotalPages] = useState(0);
    const [currentPages, setCurrentPages] = useState(1);
    const [whatPages, setWhatPages] = useState(0); // 0: 전체 조회 1: 타입별 조회 2: 검색 조회

    const totalFindUrl = `/alert-service/alerts?page=`;

    useEffect(() => {

        let token = localStorage.getItem('token');
        const result = axios.get(totalFindUrl,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            if(res.status === 200) {
                setAlertDatas(res.data.content);
                setTotalPages(res.data.totalPages);
                setCurrentPages(res.data.number + 1);
                setWhatPages(0);
                setLoading(false);
            }
        })
    }, []);

    const rendering = () => {
        const result = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPages) {
                result.push(
                    <CPaginationItem
                        active
                        onClick={(e) => { pageHandler(i, whatPages, e) }}
                    >{i}</CPaginationItem>
                )
            }
            else {
                result.push(
                    <CPaginationItem
                        onClick={(e) => { pageHandler(i, whatPages, e) }}
                    >{i}</CPaginationItem>
                )
            }

        }
        return result;
    }

    const searchTypeChange = (e) => {
        e.preventDefault();
        setSearchType(e.target.value);
    }

    const searchValueChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    const typeHandler = (type, pageNum, e) => {
        e.preventDefault();
        setLoading(true);
        
        console.log(type);

        let token = localStorage.getItem('token');

        const start = moment(startDate, 'YYYY-MM-DD').format().split('T')[0];
        const end = moment(endDate, 'YYYY-MM-DD').format().split('T')[0];

        console.log(start)
        console.log(end)

        axios.get(`/alert-service/alerts/${type}?page=${pageNum}&startDate=${start}&endDate=${end}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                if(res.status === 200) {
                    setAlertDatas(res.data.content);
                    setTotalPages(res.data.totalPages);
                    setCurrentPages(res.data.number + 1);
                    setWhatPages(1);
                    setCodeType(type);
                    setLoading(false);
                }
                else {
                    alert('오류가 발생했습니다.');
                }

            })
            .catch((err) => {
                console.log(err);
                alert('오류가 발생했습니다');
            })
    }

    const searchHandler = (pageNum, e) => {
        e.preventDefault();
        console.log(pageNum);
        setLoading(true);

        let token = localStorage.getItem('token');

        const start = moment(startDate, 'YYYY-MM-DD').format().split('T')[0];
        const end = moment(endDate, 'YYYY-MM-DD').format().split('T')[0];

        console.log(start)
        console.log(end)

        console.log(searchType)
        console.log(searchValue)

        const result = axios.get(`/alert-service/alerts/search?` +
            `page=${pageNum}&searchType=${searchType}&searchValue=${searchValue}` +
            `&startDate=${start}&endDate=${end}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    setAlertDatas(res.data.content);
                    setTotalPages(res.data.totalPages);
                    setCurrentPages(res.data.number + 1);
                    setWhatPages(2);
                    setLoading(false);
                }
                else {
                    alert('오류가 발생했습니다.');
                }
            })
            .catch((err) => {
                console.log(err)
                alert('오류가 발생했습니다');
            })

    }

    const pageHandler = (pageNum, pageFlag, e) => {
        e.preventDefault();
        console.log(pageFlag);
        setLoading(true);
        setCurrentPages(pageNum);
        let token = localStorage.getItem('token');
        // 전체 알림 내역 조회
        if(pageFlag === 0) {
            const result = axios.get(totalFindUrl+pageNum, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.status === 200) {
                        setAlertDatas(res.data.content);
                        setTotalPages(res.data.totalPages);
                        setCurrentPages(res.data.number + 1);
                        setLoading(false);
                    }
                })
        }
        // 코드타입 별 알림 내역 조회
        else if(pageFlag === 1) {
            typeHandler(codeType, pageNum, e);
        }
        // 키워드 검색 별 알림 내역 조회
        else if(pageFlag === 2) {
            searchHandler(pageNum, e);
        }
    }

    return(
        <Fragment>
            <div className="container">
                {/* 타입 별 리스트 조회 */}
                <div className="row mb-4">
                    <div className="col-12 col-lg-3 col-sm-6">
                        <div className="alert-card card mb-2" onClick={(e) => typeHandler('202', 1, e)}
                            >
                            <div className="card-body d-flex justify-content-between align-items-start">
                                <div>
                                    <h4>구독결제</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-sm-6">
                        <div className="alert-card card mb-2" onClick={(e) => typeHandler('203', 1, e)}>
                            <div className="card-body d-flex justify-content-between align-items-start">
                                <div>
                                    <h4>구독확정</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-sm-6">
                        <div className="alert-card card mb-2" onClick={(e) => typeHandler('301', 1, e)}>
                            <div className="card-body d-flex justify-content-between align-items-start">
                                <div>
                                    <h4>배송시작</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-sm-6">
                        <div className="alert-card card mb-2" onClick={(e) => typeHandler('302', 1, e)}>
                            <div className="card-body d-flex justify-content-between align-items-start">
                                <div>
                                    <h4>배송완료</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-2" >
                        <DatePicker
                            style={{textAlign:"center"}}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>
                    <div className="col-12 col-lg-1 mt-1" style={{textAlign:"center"}}>
                        <span style={{fontSize: "20px"}}>~</span>
                    </div>
                    <div className="col-12 col-lg-2">
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </div>
                    <div className="col-12 col-lg-2">
                        <select className="form-select" style={{ marginBottom: "20px", border: "1px solid LightGray" }}
                            name="searchType"
                            type="radio"
                            value={searchType}
                            onChange={searchTypeChange}
                        >
                            <option value="all">전체</option>
                            <option value="userId">아이디</option>
                            <option value="email">이메일</option>
                            <option value="title">제목</option>
                        </select>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="input-group">
                            <input
                                className="form-control"
                                onChange={searchValueChange}
                                type="text"
                                placeholder="입력"
                                value={searchValue}
                            />
                            <button type="button" className="btn btn-primary" onClick={(e) => searchHandler(1, e)}>
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                loading ?
                    (
                        <div className="kako-login-loading-box" style={{ textAlign: "center", paddingTop: "250px" }}>
                            <ClipLoader
                                color="gray"
                                loading={loading}
                                size="50px" />
                        </div>
                    )
                    :
                    (
                        <div>
                            <AlertTable
                                alertDatas={alertDatas}
                                setAlertDatas={setAlertDatas}
                                loading={loading}
                            />
                            <CPagination className="pb-40" aria-label="Page navigation example">
                                {rendering()}
                            </CPagination>
                        </div>
                    )
            }


        </Fragment>
    );

}

export default Alert