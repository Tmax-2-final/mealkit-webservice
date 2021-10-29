import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import EditGradeView2 from './EditGradeView2';


function EditGradeDetail2(props) {

    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    const [gradeData, setGradedata] = useState([]);
    const [userSubData, setUserSubData] = useState([]);

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
            axios.get(`/subscription-service/subscription/${userId}`, {
                headers : headers
            })
            .then(res2 => {
                console.log(`====== 특정회원 구독 조회 DATA INFO ======`);
                
                console.log(res2.data); 

                setUserSubData(res2.data);

                console.log(`====== 특정회원 구독 조회 DATA INFO ======`);

                axios.get("/subscription-service/subscription/grade")
                .then(res => {
                    console.log(`====== 구독등급 전체조회 DATA INFO ======`);
                    
                    console.log(res.data);

                    setGradedata(res.data);
                    
                    console.log(`====== 구독등급 전체조회 DATA INFO ======`);  
                })
                .catch(error => {
                    alert(`구독조회에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                    
                    console.log("====== 구독등급 조회 실패 data ======");
                    console.log(error.response);
                    console.log("====== 구독등급 조회 실패 data ======");
                })
            .catch(error => {
                alert(`특정에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                
                console.log("====== 특정회원 구독조회 실패 data ======");
                console.log(error.response);
                console.log("====== 특정회원 구독조회 실패 data ======");
            })
        })
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