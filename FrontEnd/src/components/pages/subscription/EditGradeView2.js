import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { withRouter } from 'react-router';
import axios from 'axios';

function EditGradeView2(props) {
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    const [subGradeId, setSubGradeId] = useState(props.gradeData.subGradeId);
    const [monthlyFee, setMonthlyFee] = useState(props.gradeData.monthlyFee); 
    const [weeklyDeliveryQty, setWeeklyDeliveryQty] = useState(props.gradeData.weeklyDeliveryQty);
    const [name, setName] = useState(props.gradeData.name);

    const [gradeData, setGradeData] = useState(props.gradeData);
    const [userSubData, setUserSubdate] = useState(props.userSubData);

    const [isDisabled, setIsDisabled] = useState(false);

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {

        if(userSubData.subGradeId === subGradeId){
            setIsDisabled(true);
        }
    }, []);

    // 구독신청 버튼클릭 이벤트 핸들러
    const gradeClickHandler = (e) => {
        // 기본 이벤트 중지
        e.preventDefault();

        

        if (window.confirm(`구독등급을 "${name}" 등급으로 변경하시겠습니까? \r\n(현재 구독등급 : ${props.userSubData.subscriptionGradeDto.name})\r\n다음 결제일부터 변경된 구독으로 시작됩니다.`)) {
            setIsDisabled(true);
            
            let body = {
                subGradeId: subGradeId,
                userId: userId,
            }

            axios.put(`/subscription-service/subscription`, body, {
                headers : headers
            })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    alert("구독변경이 완료되었습니다.");
                    
                    props.history.push({
                        pathname: '/',
                        state: {
                            //chkedGradeData : props.gradeData
                        }
                    })
                }
                else {
                    alert(`응답상태코드 Error (응답상태코드 : ${res.status}`);
                }
            })
            .catch(error => {
                alert(`구독변경에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
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
        }
    }

    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        number = Math.round(number);
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="col-lg-4">
            <Card sx=
                {{ 
                    maxWidth: 345, mb:"4rem", 
                    boxShadow: `0 0 10px rgba(0,0,0,0.15), 0 0 10px rgba(0,0,0,0.15)`,
                    borderRadius: "1.6rem"
                }}>
                <CardActionArea onClick={gradeClickHandler} disabled={isDisabled} sx={{backgroundColor:isDisabled ? "#e0e0e0" : "fff"}}>
                    <CardContent>
                        <Typography 
                            sx={{fontWeight:"bold", pt:"4rem", pb:"1.2rem"}} 
                            gutterBottom 
                            variant="h4" 
                            component="div" 
                            align="center"
                        >
                        {name}
                        </Typography>
                        <Typography 
                            gutterBottom
                            variant="body2" 
                            color="text.secondary"
                            align="center"
                        >
                        매주 <strong>{weeklyDeliveryQty}</strong> 개의 밀키트 배송
                        </Typography>
                        <Typography 
                            gutterBottom
                            variant="body2" 
                            color="text.secondary"
                            align="center"
                        >
                        한달간 총 <strong>{weeklyDeliveryQty * 4}</strong> 개의 밀키트 배송
                        </Typography>
                        <Typography 
                            gutterBottom
                            variant="body2" 
                            color="text.secondary"
                            align="center"
                        >
                        <strong>{numberToCommasNumber(monthlyFee / (weeklyDeliveryQty * 4))}</strong> 원 / 밀키트 1 개
                        </Typography>
                        <Typography 
                            gutterBottom
                            variant="body2" 
                            color="text.secondary"
                            align="center"
                        >
                        배송비 무료
                        </Typography>
                    </CardContent>
                    <CardContent sx={{textAlign:"center", pb:"2rem"}}>
                        <Button sx={{
                            px:"0.6rem", 
                            py:"0.4rem", 
                            backgroundColor: userSubData.subGradeId === subGradeId ? "rgba(0,0,0,0.3)" : ""
                        }} 
                            size="large" variant="contained"  >
                        <Typography 
                            sx = {{pr:"2rem", mb:0}}
                            gutterBottom 
                            component="div" 
                            variant="body1"
                        >
                        월 구독료
                        </Typography>
                        <Typography 
                            sx = {{mb:0}}
                            gutterBottom 
                            component="div"
                            variant="body1" 
                        >
                        <strong>{numberToCommasNumber(monthlyFee)}</strong> 원
                        </Typography>
                        </Button>
                    </CardContent>
                    <CardContent sx={{textAlign:"center", pb:"2rem" , fontSize:"1.4rem",  color: subGradeId === userSubData.subGradeId ? "#ba3838" : "#fff"}}>
                        <strong>구독중</strong>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default withRouter(EditGradeView2);