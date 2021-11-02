import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import EditGradeView2 from './EditGradeView2';


function EditGradeDetail2(props) {

    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const [gradeData, setGradedata] = useState([]);
    const [userSubData, setUserSubData] = useState([]);

    useEffect(() => {
        if(!userId){
            alert("로그인 후 진행해주세요.");
            props.history.push({
                pathname: '/login',
                state: {
                }
            })
    
            return;
        }
        else {
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
                
                if(existSubscription === 0){
                    alert("회원 구독 정보가 없습니다. 구독 신청을 해주세요.");
                    props.history.push({
                        pathname: '/subscription/introduce',
                        state: {
                            //chkedGradeData : props.gradeData
                        }
                    })
    
                }
                else {
                    const apiName = "특정회원 구독 조회";
    
                    axios.get(`/subscription-service/subscription/${userId}`, {
                        headers : headers
                    })
                    .then(res => {
                        console.log(`====== ${apiName} DATA INFO ======`);
                        console.log(res.data); 
                        setUserSubData(res.data);
                        console.log(`========================================`);
        
                        const cancelStatus = '3';
        
                        // 구독 취소상태인 경우 구독 신청 페이지로 이동
                        if(res.data.status === cancelStatus){
                            alert("구독 취소 상태입니다. 구독을 진행해주세요.");
                            props.history.push({
                                pathname: '/subscription/introduce',
                                state: {
                                    //chkedGradeData : props.gradeData
                                }
                            })
                            return;
                        } else {
                            const apiName = "구독등급 전체조회";
    
                            axios.get("/subscription-service/subscription/grade")
                            .then(res => {
                                console.log(`====== ${apiName} DATA INFO ======`);
                                console.log(res.data);
                                setGradedata(res.data);
                                console.log(`=================================`);  
                            })
                            .catch(error => {
                                alert(`${apiName}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                                
                                console.log(`====== ${apiName} 실패 data ======`);
                                console.log(error.response);
                                console.log(`=================================`);
                            })
                        }
                    })  
                }
            })
            .catch(error => {
            
                alert(`${apiName} 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                
                console.log(`====== ${apiName} 실패 data ======`);
                console.log(error.response);
                console.log(`====== ${apiName} 실패 data ======`);
            })
        }
    }, [])
    
    return (
        <>
        <div className="container mt-30">
            <div className="row mb-40">
                <h3 className="font-weight-bold">변경할 구독을 선택해주세요.</h3>
            </div>
            <div className="row mb-30">
            {
                gradeData.map(item => 
                    (
                        
                        <EditGradeView2
                            key={item.subGradeId}
                            gradeData= {item}
                            userSubData = {userSubData}
                        />
                    )
                )
            }
            </div>
        </div>
        </>
    );
}

// app.js 의 Router 태그에 설정안한 페이지도 props.history.push 기능을 사용하기 위해 withRouter 이용
export default withRouter(EditGradeDetail2);