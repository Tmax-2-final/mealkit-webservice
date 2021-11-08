import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import CancelDetail from './CancelDetail';
import axios from 'axios';

function Cancel(props) {
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    const [subscriptionData, setSubscriptionData] = useState({});

    const headers = {
        Authorization: `Bearer ${token}`
    }

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

                    return;
                }
                else {
                    axios.get(`/subscription-service/subscription/${userId}`, {
                        headers : headers
                    })
                    .then(res => {
                        console.log(`====== 특정회원 구독 조회 DATA INFO ======`);
                        console.log(res.data); 
                        console.log(`========================================`);

                        setSubscriptionData(res.data);
        
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
                        }
                    })
                    .catch(error => {
                        alert(`${apiName}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                        console.log(`====== ${apiName} ERROR INFO ======`);
                        console.log(error.response);
                    })
                }
            })
    }, [])

    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "구독 취소"
                productUrl = "/subscription/cancel"
            />
            <CancelDetail
                subscriptionData = {subscriptionData}
            />
            <Footer/>
        </Fragment>
    );
}

export default Cancel;