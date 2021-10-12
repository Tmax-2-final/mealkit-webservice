import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import AdminSideBar from '../../elements/ui/AdminSidebar';

import DatePicker from "react-datepicker";
import Cataloglist from "../cataloglist/Cataloglist";




export default function AdminCatalog(props) {
    console.log(props);
    const [startDate, setStartDate] = useState(new Date("2021/09/01"));
    const [endDate, setEndDate] = useState(new Date("2021/09/10"));

    const [inputData, setInputData] = useState([]);
    const [ search, setSearch] = useState(null);
    //const [ firstStock, setFirstStock ] = useState("0");
    //const [ lastStock, setLastStock] = useState("전체");
    


    useEffect(() => {

        if (localStorage.getItem('role') !== "ROLE_ADMIN") {
            alert("접근 권한이 없습니다!")
            window.location.href = "/"
        }

        setInputData(inputData);
        console.log("테스트");
        console.log(inputData);
    }, [inputData])

    const searchChange = (e) => {
        e.preventDefault();
        setInputData(e.target.value);
        setSearch(inputData);
        console.log(inputData);
        // let lowerInputData = inputData.toLowerCase();
        
    }


    const searchHandler = (e) => {
        e.preventDefault();

        // setInputData(e.target.value);
        setSearch(e.target.value);

    }


        return (

            <Fragment>

                <Header/>
                <Bread
                    productId={`test`}
                    productName={`admin`}
                    productUrl={`test3`}
                />
                <section id="adminuser">
                    <div className="container">

                        <div className="row">
                            <div className="col-2">
                                <AdminSideBar/>
                            </div>
                            <div className="col-10">
                                {/* <Title title="My Account" /> */}

                                <SubTitle title="상품 관리"/>
                                <hr></hr>
                                <div className="row">
                                    <>
                                        {/* <div className="col-3">
                                            <select onClick={firstStockHandler}>
                                                <option value="0" >0개</option>
                                                <option value="25" >25개 이상</option>
                                                <option value="50" >50개 이상</option>
                                                <option value="75" >75개 이상</option>
                                                <option value="100" >100개 이상</option>
                                            </select>
                                        </div>
                                        <div className="col-1">
                                            <span>:</span>


                                        </div>
                                        <div className="col-3">

                                            <select onClick={lastStockHandler}>
                                                <option value="25" >25개 이하</option>
                                                <option value="50" >50개 이하</option>
                                                <option value="75" >75개 이하</option>
                                                <option value="100" >100개 이하</option>
                                                <option value="전체" >전제</option>

                                            </select>
                                        </div> */}
                                    </>
                                    <div className="col-4">
                                        <div className="pro-sidebar-search">
                                            <form className="pro-sidebar-search-form">
                                                <input
                                                    onChange={searchChange}
                                                    type="text"
                                                    placeholder="Search here .."
                                                    value={inputData}
                                                />
                                                <button>
                                                    <i className="las la-search"/>
                                                </button>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <Cataloglist
                                    search = {search}
                                    setSearch = {setSearch}
                                    //firstStock = {firstStock}
                                    //lastStock = {lastStock}

                                />

                            </div>
                        </div>
                    </div>
                    <br/><br/><br/>
                </section>
                {/*<ProductBottom/>*/}
                <Footer/>
            </Fragment>
        );

}
