import React, { Fragment, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlertTable from "../alert/AlertTable";
import axios from 'axios';
import * as moment from 'moment';

const Alert = (props) => {

    const [loading, setLoading] = useState(true);
    const [alertDatas, setAlertDatas] = useState([]);

    const [startDate, setStartDate] = useState(new Date("2021/01/01"));
    const [endDate, setEndDate] = useState(new Date());

    const [searchType, setSearchType] = useState("all");
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {

        let token = localStorage.getItem('token');
        const result = axios.get(`/alert-service/alerts`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            if(res.status === 200) {
                setAlertDatas(res.data.content);
                setLoading(false);
            }
        })
    }, []);

    const searchTypeChange = (e) => {
        e.preventDefault();
        setSearchType(e.target.value);
    }

    const searchValueChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    const typeHandler = (type, e) => {
        e.preventDefault();

        console.log(type);

        let token = localStorage.getItem('token');

        const start = moment(startDate, 'YYYY-MM-DD').format().split('T')[0];
        const end = moment(endDate, 'YYYY-MM-DD').format().split('T')[0];

        console.log(start)
        console.log(end)

        axios.get(`/alert-service/alerts/${type}?startDate=${start}&endDate=${end}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                if(res.status === 200) {
                    setAlertDatas(res.data.content);
                }

            })
            .catch((err) => {
                console.log(err);
                alert('오류가 발생했습니다');
            })
    }

    const searchHandler = (e) => {
        e.preventDefault();
    }

    return(
        <Fragment>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 col-lg-2" >
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>
                    <div className="col-12 col-lg-1">
                        <span>~</span>
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
                    <div className="col-12 col-lg-4">
                        <div className="input-group">
                            <input
                                className="form-control"
                                onChange={searchValueChange}
                                type="text"
                                placeholder="입력"
                                value={searchValue}
                            />
                            <button type="button" className="btn btn-primary" onClick={searchHandler}>
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-3 col-sm-6">
                        <div className="card mb-4" onClick={(e) => typeHandler('202', e)}>
                            <div className="card-body d-flex justify-content-between align-items-start">
                                <div>
                                    <h4>구독결제</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-sm-6">
                        <div className="card mb-4" onClick={(e) => typeHandler('203', e)}>
                            <div className="card-body d-flex justify-content-between align-items-start">
                                <div>
                                    <h4>구독확정</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-sm-6">
                        <div className="card mb-4" onClick={(e) => typeHandler('301', e)}>
                            <div className="card-body d-flex justify-content-between align-items-start">
                                <div>
                                    <h4>배송시작</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-sm-6">
                        <div className="card mb-4" onClick={(e) => typeHandler('302', e)}>
                            <div className="card-body d-flex justify-content-between align-items-start">
                                <div>
                                    <h4>배송완료</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AlertTable
                alertDatas={alertDatas}
                setAlertDatas={setAlertDatas}
                loading={loading}
            />

        </Fragment>
    );

}

export default Alert