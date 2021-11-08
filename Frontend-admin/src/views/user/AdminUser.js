import React, { Fragment, lazy } from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './UserTable.js'
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CPagination, CPaginationItem } from '@coreui/react';
import { ClipLoader } from "react-spinners";

const AdminUser = (props) => {

  const [loading, setLoading] = useState(true);
  const [userDatas, setUserDatas] = useState([]);

  const [startDate, setStartDate] = useState(new Date("2021/01/01"));
  const [endDate, setEndDate] = useState(new Date());

  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] = useState(0);
  const [currentPages, setCurrentPages] = useState(1);
  const [whatPages, setWhatPages] = useState(0); // 0 전체 회원 페이지, 1 검색 회원 페이지

  useEffect(() => {

    let token = localStorage.getItem('token');
    const result = axios.get(`/user-service/users?page=`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            setUserDatas(res.data.content);
            setTotalPages(res.data.totalPages);
            setCurrentPages(res.data.number + 1);
            setWhatPages(0);
            setLoading(false)
          }
        })
  }, []);

  const searchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }


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

  const searchHandler = (pageNum, e) => {
    e.preventDefault();
    setLoading(true)

    let token = localStorage.getItem('token');

    let body = {
      startDate: startDate,
      endDate: endDate,
      searchData: search
    }

    console.log(body);

    axios.post(`/user-service/users/date?page=${pageNum}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          setUserDatas(res.data.content);
          setTotalPages(res.data.totalPages);
          setCurrentPages(res.data.number + 1);
          setWhatPages(1);
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
        alert('오류가 발생했습니다');
      })
  }

  const pageHandler = (pageNum, pageFlag, e) => {
    e.preventDefault();
    console.log(pageNum)
    setLoading(true)
    setCurrentPages(pageNum)
    let token = localStorage.getItem('token')

    if(pageFlag === 0) {
      const reuslt = axios.get(`/user-service/users?page=`+pageNum, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data)
        if(res.status === 200) {
          setUserDatas(res.data.content);
          setTotalPages(res.data.totalPages);
          setCurrentPages(res.data.number + 1);
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }else if(pageFlag === 1) {
      searchHandler(pageNum, e);
    }
  }

  return (

    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-2" >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="col-12 col-lg-1 mt-1" style={{ textAlign: "center" }}>
            <span style={{ fontSize: "20px" }}>~</span>
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
          <div className="col-12 col-lg-5">
            <div className="input-group">
              <input
                className="form-control"
                onChange={searchChange}
                type="text"
                placeholder="고객 이름 입력"
                value={search}
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
              <UserTable
                userDatas={userDatas}
                setUserDatas={setUserDatas}
                loading={loading}
              />
              <CPagination className="pb-40" aria-label="Page navigation example">
                {rendering()}
              </CPagination>
            </div>
            
          )
      }

      
    </Fragment>
  )
}

export default AdminUser
