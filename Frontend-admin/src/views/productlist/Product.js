import React, { Fragment, useEffect, useState } from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import * as moment from 'moment';
import { CPagination, CPaginationItem } from '@coreui/react';
import { ClipLoader } from "react-spinners";
import ProductTable from './ProductTable';
import ko from "date-fns/locale/ko"; // the locale you want

const Product = (props) => {
    const [loading, setLoading] = useState(true);
    const [catalogDatas, setCatalogDatas] = useState([]);
    const [startDate, setStartDate] = useState(new Date("2021/01/01"));
    const [endDate, setEndDate] = useState(new Date());


    const [search, setSearch] = useState("");

    const [searchType, setSearchType] = useState("all");
    const [searchValue, setSearchValue] = useState("");

    const [codeType, setCodeType] = useState('0');

    const [totalPages, setTotalPages] = useState(0);
    const [currentPages, setCurrentPages] = useState(1);
    const [whatPages, setWhatPages] = useState(0); // 0: 전체 조회 1: 타입별 조회 2: 검색 조회

    const totalFindUrl = `/subscription-service/subscription?page=`;

    // datepicker 한국어 설정
    registerLocale("ko", ko);

    useEffect(() => {
        const fetchPosts = async() => {
          setLoading(true);
        }

        let token = localStorage.getItem('token');
        const result = axios.get(`/catalog-service/catalogs?page=`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            if(res.status === 200) {
                setCatalogDatas(res.data);
                setTotalPages(res.data.totalPages);
                setCurrentPages(res.data.number + 1);
                setWhatPages(0);
                setLoading(false);
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
        console.log(pageNum);
        setLoading(true);

      let token = localStorage.getItem('token');

      let body = {
        searchData: search
      }


      axios.post(`/catalog-service/catalogs/search?page=${pageNum}`, body, {
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


    let body = {
      searchData: search
    }

    console.log(body);

    axios.post(`/catalog-service/catalogs/search?page=${pageNum}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          setCatalogDatas(res.data.content);
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
      const reuslt = axios.get(`/catalog-service/catalogs?page=`+pageNum, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data)
          if(res.status === 200) {
            setCatalogDatas(res.data.content);
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

    return(
        <Fragment>
            <div className="container">
                {/* 타입 별 리스트 조회 */}
                <div className="row">
                    <div className="col-12 col-lg-2" >
                        <DatePicker
                            style={{textAlign:"center"}}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            locale="ko"
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
                            locale="ko"
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
                            <ProductTable
                                catalogDatas={catalogDatas}
                                setCatalogDatas={setCatalogDatas}
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

export default Product;
