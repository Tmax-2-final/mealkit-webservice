import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../../../utilities/Loading';
import axios from "axios";
import GradeView from './GradeView';
import MonthlyFeeView from './MonthlyFeeView';
import WeeklyDeliveryQtyView from './WeeklyDeliveryQtyView';
import PricePerProduct from './PricePerProduct';
import styled from 'styled-components';

function GradeDetail(props) {

    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const [chkedGrade, setChkedGrade] = useState(0);
    const [chkedGradeData, setChkedGradeData] = useState();

    const [gradeData, setGradedata] = useState([]);

    const [errorCode, setErrorCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        axios.get("/subscription-service/subscription/grade")
            .then(res => {
                console.log(res.data);
                setGradedata(res.data);

                // 첫번째 조회된 등급 기본값으로 선택
                setChkedGrade(res.data[0].subGradeId)

                // 정상적으로 API 통신이 되면 에러 정보 초기화
                setErrorCode("")
                setErrorMsg("")   
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    console.log(error.response);
                    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                    console.log(error.response.data);
                    console.log(error.response.headers);

                    setErrorCode(error.response.status)
                    setErrorMsg(error.response.statusText)   
                }
                else if (error.request) {
                    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                    // Node.js의 http.ClientRequest 인스턴스입니다.
                    console.log(error.request);
                }
                else {
                    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                    console.log('Error', error.message);
                }
                    console.log(error.config);
            })
    }, [])


    // 구독신청 버튼클릭 이벤트 핸들러
    const gradeClickHandler = (e) => {
        // Link 태그의 기본 이벤트 중지
        e.preventDefault();

        // 버튼 로딩 생성 및 클릭 방지
        setLoading(true);
        setIsActive(true);

        // 페이지 전환이 빠른 편이라 임의적으로 딜레이를 설정
        // 1초 후 페이지 이동
        setTimeout(() => {
            props.history.push({
                pathname: '/subscription/register',
                state: {
                    chkedGradeData : chkedGradeData
                }
            })
        }, 1000) 
    }

    const GradeDetailView = styled.div`
        @media screen and (min-width: 768px) { 
            .mobile { 
                display: none;
            } 
        }

        @media screen and (max-width: 768px) { 
            .desktop { 
                display: none;
            } 
        }
    `

    
    return (
        <>
        <GradeDetailView className="container mt-30">
            <div className="row mb-40">
                <h4>1/2단계</h4>
                <h3 className="font-weight-bold">원하는 구독 등급을 선택해주세요.</h3>
            </div>
            <table className="table">
                {
                errorCode !== "" ? 
                (
                    <tbody>
                        <tr>
                            <th className="text-center">구독등급 조회에 실패했습니다. 관리자에게 문의해주세요. ({errorCode} : {errorMsg} )</th>
                        </tr>
                    </tbody>
                )
                : 
                (
                    <tbody>
                        <tr>
                            <th className="desktop" scope="col"></th>
                            {
                                gradeData.map(item => 
                                    (
                                        
                                        <GradeView
                                            key={item.subGradeId}
                                            gradeData= {item}
                                            chkedGrade = {chkedGrade}
                                            setChkedGrade = {setChkedGrade}
                                            setChkedGradeData = {setChkedGradeData}
                                        />
                                    )
                                )
                            }
                        </tr>
                        <tr>
                            <th className="text-center mobile" scope="row" colspan="3">월 요금</th>
                        </tr>
                        <tr>
                            <th className="desktop" scope="row">월 요금</th>
                            {
                                gradeData.map(item => 
                                    (
                                        <MonthlyFeeView
                                            key={item.subGradeId}
                                            monthlyFee = {item.monthlyFee}
                                        />
                                    )
                                )
                            }
                        </tr>
                        <tr>
                            <th className="text-center mobile" scope="row" colspan="4">매주 배송 상품 수</th>
                        </tr>
                        <tr>
                            <th className="desktop" scope="row">매주 배송 상품 수</th>
                            {
                                gradeData.map(item => 
                                    (
                                        <WeeklyDeliveryQtyView
                                            key={item.subGradeId}
                                            weeklyDeliveryQty = {item.weeklyDeliveryQty}
                                        />
                                    )
                                )
                            }
                        </tr>
                        <tr>
                            <th className="text-center mobile" scope="row" colspan="4">상품 가격</th>
                        </tr>
                        <tr>
                            <th className="desktop" scope="row">상품 가격</th>
                            {
                                gradeData.map(item => 
                                    (
                                        <PricePerProduct
                                            key={item.subGradeId}
                                            monthlyFee = {item.monthlyFee}
                                            weeklyDeliveryQty = {item.weeklyDeliveryQty}
                                        />
                                    )
                                )
                            }
                        </tr>
                    </tbody>
                )
                } 
                
                
            </table> 
            <div className="row mb-30">
                <div className="col-12 h-100">
                    <div className="product-details-content">
                            <div className="pro-details-quality">
                            <div className="pro-details-cart btn-hover mx-auto">
                                <Link to='/#' onClick={gradeClickHandler}
                                    className={"text-center " + (isActive || errorCode !== "" ? "disabled-link" : "")} 
                                    style={{width:"8rem", height:"4rem"}}>
                                    <span className="align-middle">{
                                        loading ?
                                        <Loading
                                            height = "25"
                                            width = "25"
                                            timeout = "2000"
                                        /> 
                                        : "다음"}
                                        
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </GradeDetailView>
        </>
    );
}

// app.js 의 Router 태그에 설정안한 페이지도 props.history.push 기능을 사용하기 위해 withRouter 이용
export default withRouter(GradeDetail);