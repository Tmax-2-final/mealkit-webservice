import { CCard, CCardGroup, CCardTitle } from "@coreui/react";
import { CChart, CChartBar } from "@coreui/react-chartjs";
import React, { Fragment, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [totalMoney, setTotalMony] = useState(0); // 총 매출 액
    const [newOrder, setNewOrder] = useState(0); // 한달간 구독 주문 건수
    const [totalOrder, setTotalOrder] = useState(0); // 전체 구독 주문 건수
    const [subConfirm, setSubConfirm] = useState(0); // 구독 확정 후 배송 전 상태
    const [delivery, setDelivery] = useState(0); // 전체 배송 완료된 건수

    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        setTotalMony(21700000);
        setNewOrder(Math.floor(Math.random() * 100) + 1)
        setTotalOrder(Math.floor(Math.random() * 100) + 1)
        setSubConfirm(Math.floor(Math.random() * 100) + 1)
        setDelivery(Math.floor(Math.random() * 100) + 1)
        let timer = setTimeout(() => {
            setLoading(false)
            //setLoading(!loading)
        }, 1000);
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
                                                            data: [100, 210],
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
                                            <h3 className="card-title">신규 주문</h3>
                                            <h6 className="card-subtitle mb-50 text-medium-emphasis">최근 한달 간 주문한 건이에요.</h6>
                                            <p className="card-text" style={{ textAlign: "right" }}>
                                                <span style={{ color: "black", fontSize: "x-large" }}>{newOrder}</span> 건
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card" style={{ borderRadius: "10px", boxShadow: "3px 3px 3px LightGrey" }}>
                                        <div className="card-body">
                                            <h3 className="card-title">전체 주문</h3>
                                            <h6 className="card-subtitle mb-50 text-medium-emphasis">전체 주문 건이에요.</h6>
                                            <p className="card-text" style={{ textAlign: "right" }}>
                                                <span style={{ color: "black", fontSize: "x-large" }}>{totalOrder}</span> 건
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card" style={{ marginBottom: "20px", borderRadius: "10px", boxShadow: "3px 3px 3px LightGrey" }}>
                                        <div className="card-body">
                                            <h3 className="card-title">배송 대기</h3>
                                            <h6 className="card-subtitle mb-50 text-medium-emphasis">결제를 완료했으니 배송을 시작해주세요.</h6>
                                            <p className="card-text" style={{ textAlign: "right" }}>
                                                <span style={{ color: "black", fontSize: "x-large" }}>{subConfirm}</span> 건
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card" style={{ borderRadius: "10px", boxShadow: "3px 3px 3px LightGrey" }}>
                                        <div className="card-body">
                                            <h3 className="card-title">배송 완료</h3>
                                            <h6 className="card-subtitle mb-50 text-medium-emphasis">배송이 끝난 건이에요.</h6>
                                            <p className="card-text" style={{ textAlign: "right" }}>
                                                <span style={{ color: "black", fontSize: "x-large" }}>{delivery}</span> 건
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