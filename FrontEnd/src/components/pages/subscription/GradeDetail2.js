import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import GradeView2 from './GradeView2';


function GradeDetail2(props) {
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    const [chkedGrade, setChkedGrade] = useState(0);
    const [gradeData, setGradedata] = useState([]);

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        

        axios.get("/subscription-service/subscription/grade",{
            headers: headers
        })
        .then(res => {
            console.log(`====== ${props.location.pathname} DATA INFO ======`);
            
            console.log(res.data);
            
            setGradedata(res.data);

            // 첫번째 조회된 등급 기본값으로 선택
            setChkedGrade(res.data[0].subGradeId)

            console.log(`====== ${props.location.pathname} DATA INFO ======`);
        })
        .catch(error => {
            alert(`구독조회에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
            console.log(`====== ${props.location.pathname} ERROR INFO ======`);
            if (error.response) {
                console.log(error.response);
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.headers);

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
            console.log(`====== ${props.location.pathname} ERROR INFO ======`);
        })
    }, [])

    
    return (
        <>
        <div className="container mt-30">
            <div className="row mb-40">
                <h4>1/2단계</h4>
                <h3 className="font-weight-bold">원하는 구독을 선택해주세요.</h3>
            </div>
            <div className="row mb-30">
            {
                gradeData.map(item => 
                    (
                        
                        <GradeView2
                            key={item.subGradeId}
                            gradeData= {item}
                            chkedGrade = {chkedGrade}
                            setChkedGrade = {setChkedGrade}
                        />
                    )
                )
            }
            </div>
            {/* <div className="row mb-30">
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
            </div>  */}
        </div>
        </>
    );
}

// app.js 의 Router 태그에 설정안한 페이지도 props.history.push 기능을 사용하기 위해 withRouter 이용
export default withRouter(GradeDetail2);