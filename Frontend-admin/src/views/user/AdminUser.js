import React, { Fragment, lazy } from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './UserTable.js'
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CPagination, CPaginationItem } from '@coreui/react';

const AdminUser = (props) => {

  const [loading, setLoading] = useState(true);
  const [userDatas, setUserDatas] = useState([]);

  const [startDate, setStartDate] = useState(new Date("2021/01/01"));
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState("");

  useEffect(() => {

    let token = localStorage.getItem('token');
    const result = axios.get(`/user-service/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            setUserDatas(res.data);
            setLoading(false)
          }
        })
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();

    let token = localStorage.getItem('token');

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

  const searchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
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
          <div className="col-12 col-lg-4" >
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
      </div>
      <UserTable
        userDatas={userDatas}
        setUserDatas={setUserDatas}
        loading={loading}
      />
      
    </Fragment>
  )
}

export default AdminUser
