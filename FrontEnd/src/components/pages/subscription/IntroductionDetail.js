import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../../../utilities/Loading';
import axios from "axios";

function IntroductionDetail(props) {
    
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    const subscriptionHandler = (e) => {
        e.preventDefault();

        if(!userId){
            alert("로그인 후 구독해주세요.");
            props.history.push({
                pathname: '/login',
                state: {
                }
            })

            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`
        }

        const apiName = "회원 구독여부 조회";

        axios.get(`/subscription-service/subscription/exist/${userId}`, {
            headers : headers
        })
        .then(res => {
            console.log(`====== ${apiName} DATA INFO ======`);
            console.log(res.data); 
            console.log(`==================================`);

            // 구독여부 체크
            // 0: 구독안함, 1: 구독함
            const existSubscription = res.data;
            if(existSubscription === 1){
                const apiName2 = "회원 구독정보 조회";

                axios.get(`/subscription-service/subscription/${userId}`, {
                    headers : headers
                })
                .then(res2 => {
                    console.log(`====== ${apiName2} DATA INFO ======`);
                    console.log(res2.data); 
                    console.log(`==================================`);
                    
                    const cancelStatus = '3';

                    // 구독 취소 상태가 아니면
                    if(res2.data.status !== cancelStatus){
                        alert("이미 구독중입니다. \r\n구독 변경을 원하시면 마이페이지에서 구독 변경을 진행해주세요.");
                        return;
                    }
                    else {
                        alert(`${userId}님 다시 구독신청 해주셔서 감사합니다. \r\n구독내용이 새롭게 바뀐부분이 있는지 꼭 확인하시고 진행해주세요.`);
                        // 버튼 로딩 생성 및 클릭 방지
                        setLoading(true);
                        setIsActive(true);
        
                        // 페이지 전환이 빠른 편이라 임의적으로 딜레이를 설정
                        // 1초 후 페이지 이동
                        setTimeout(() => {
                            props.history.push({
                                pathname: '/subscription/grade',
                                state: {
                                }
                            })
                        }, 1000) 
                    }
                })
                .catch(error => {
            
                    alert(`${apiName2} 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                    
                    console.log(`====== ${apiName2} 실패 data ======`);
                    console.log(error.response);
                    console.log(`==================================`);
                })
            }
            else {
                // 버튼 로딩 생성 및 클릭 방지
                setLoading(true);
                setIsActive(true);

                // 페이지 전환이 빠른 편이라 임의적으로 딜레이를 설정
                // 1초 후 페이지 이동
                setTimeout(() => {
                    props.history.push({
                        pathname: '/subscription/grade',
                        state: {
                        }
                    })
                }, 1000) 
            }
        })
        .catch(error => {
            
            alert(`${apiName} 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
            
            console.log(`====== ${apiName} 실패 data ======`);
            console.log(error.response);
            console.log(`====== ${apiName} 실패 data ======`);
        })
    }

    return (
        
        <div className="container mt-40">
            <div className="row">
                <div className="col-12 text-center">
                    <img src="/assets/img/subscription/introduction/main-subscribe.jpeg" width="75%" height="auto" alt="구독혜택설명" />
                </div>
            </div>  
  
            <div className="row mb-40" style={{position:'sticky', bottom:'0px', height:'100px'}}>
                <div className="col-12 h-100">
                    <div className="product-details-content h-100">
                            <div className="pro-details-quality mt-0 h-100">
                            <div className="pro-details-cart btn-hover mx-auto w-75 h-100">
                                <Link to="/#" onClick={subscriptionHandler}
                                className={"w-100 h-100 display-6 text-center " + (isActive ? "disabled-link" : "")}>
                                    <span className="align-middle">{
                                        loading ? 
                                        <Loading
                                            height = "50"
                                            width = "50"
                                            timeout = "2000"
                                        /> 
                                        : "구독하기"}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}

// app.js 의 Router 태그에 설정안한 페이지도 props.history.push 기능을 사용하기 위해 withRouter 이용
export default withRouter(IntroductionDetail);