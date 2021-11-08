import { CCard, CCardGroup, CCardTitle } from "@coreui/react";
import { CChart, CChartBar } from "@coreui/react-chartjs";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [prevMonthMoney, setPrevMonthMoney] = useState(10); // 이전 달 매출 액
    const [currentMonthMoney, setCurrentMonthMoney] = useState(20); // 현재 달 매출 액
    const [totalMoney, setTotalMony] = useState(200); // 총 매출 액
    const [newSubscribe, setNewSubscribe] = useState(0); // 한달간 구독 주문 건수
    const [totalSubscribe, setTotalSubscribe] = useState(0); // 전체 구독 주문 건수
    const [newUser, setNewUser] = useState(0); // 구독 확정 후 배송 전 상태
    const [totalUser, setTotalUser] = useState(0); // 전체 배송 완료된 건수

    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        async function loadData() {
            const token = localStorage.getItem('token')
            // 1. 매출액 

            // 2. 구독 건수(신규, 전체)

            // 3. 유저 수(신규, 전체)
            const resultByUser = await axios.get(`/user-service/users/count`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.status === 200) {
                        setNewUser(res.data.newUser);
                        setTotalUser(res.data.totalUser);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            setLoading(false)
        }
        loadData();
        
    }, [])

    return (
        <Fragment>
            {
                loading === false
                    ?
                    (
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card" style={{borderRadius: "10px", boxShadow: "3px 3px 3px LightGrey"}}>
                                        <div className="card-body">
                                            <h3 className="card-title">매출 현황</h3>
                                            <h6 className="card-subtitle mb-5 text-medium-emphasis"> </h6>

                                            <CChart
                                                type="bar"
                                                data={{
                                                    labels: ['이전 달', '현재 달'],
                                                    datasets: [
                                                        {
                                                            label: '영업 이익(만원)',
                                                            backgroundColor: '#f87979',
                                                            data: [{prevMonthMoney}, {currentMonthMoney}],
                                                        },
                                                    ],
                                                }}
                                                labels="months"
                                            />
                                            <p className="card-text" style={{ textAlign: "center" }}>
                                                현재까지 총 매출은 <span style={{ color: "black", fontSize: "x-large" }}>{numberToCommasNumber(totalMoney)}</span>원 입니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card" style={{ marginBottom: "20px", borderRadius: "10px", boxShadow: "3px 3px 3px LightGrey" }}>
                                        <div className="card-body">
                                            <h3 className="card-title">신규 구독</h3>
                                            <h6 className="card-subtitle mb-50 text-medium-emphasis">오늘 하루 구독한 건이에요.</h6>
                                            <p className="card-text" style={{ textAlign: "right" }}>
                                                <span style={{ color: "black", fontSize: "x-large" }}>{newSubscribe}</span> 건
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card" style={{ borderRadius: "10px", boxShadow: "3px 3px 3px LightGrey" }}>
                                        <div className="card-body">
                                            <h3 className="card-title">전체 구독</h3>
                                            <h6 className="card-subtitle mb-50 text-medium-emphasis">전체 구독 건이에요.</h6>
                                            <p className="card-text" style={{ textAlign: "right" }}>
                                                <span style={{ color: "black", fontSize: "x-large" }}>{totalSubscribe}</span> 건
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card" style={{ marginBottom: "20px", borderRadius: "10px", boxShadow: "3px 3px 3px LightGrey" }}>
                                        <div className="card-body">
                                            <h3 className="card-title">신규 고객</h3>
                                            <h6 className="card-subtitle mb-50 text-medium-emphasis">오늘 하루 가입한 고객수에요.</h6>
                                            <p className="card-text" style={{ textAlign: "right" }}>
                                                <span style={{ color: "black", fontSize: "x-large" }}>{newUser}</span> 건
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card" style={{ borderRadius: "10px", boxShadow: "3px 3px 3px LightGrey" }}>
                                        <div className="card-body">
                                            <h3 className="card-title">전체 고객</h3>
                                            <h6 className="card-subtitle mb-50 text-medium-emphasis">전체 고객수에요.</h6>
                                            <p className="card-text" style={{ textAlign: "right" }}>
                                                <span style={{ color: "black", fontSize: "x-large" }}>{totalUser}</span> 건
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="loading-box" style={{ textAlign: "center", paddingTop: "250px" }}>
                            <ClipLoader
                                color="gray"
                                loading={loading}
                                size="50" />
                        </div>
                    )
            }
        </Fragment>
    );
}
export default Home