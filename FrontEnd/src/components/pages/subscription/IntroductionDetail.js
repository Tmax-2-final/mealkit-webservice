import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../../../utilities/Loading';

function IntroductionDetail(props) {
    
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const subscriptionHandler = (e) => {
        // Link 태그의 기본 이벤트 중지
        e.preventDefault();

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

    return (
        
        <div className="container mt-40">
            <div className="row">
                <div className="col-12 text-center">
                    <img src="/assets/img/subscription/introduction/01.jpg" width="75%" height="auto" alt="구독혜택설명" />
                </div>
            </div>  
            <div className="row">
                <div className="col-12 text-center">
                    <img src="/assets/img/subscription/introduction/01.jpg" width="75%" height="auto" alt="구독혜택설명" />
                </div>
            </div>  
            <div className="row mb-40" style={{position:'sticky', bottom:'0px', height:'100px'}}>
                <div className="col-12 h-100">
                    <div className="product-details-content h-100">
                            <div className="pro-details-quality mt-0 h-100">
                            <div className="pro-details-cart btn-hover mx-auto w-75 h-100">
                                <Link onClick={subscriptionHandler}
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