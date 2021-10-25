import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { withRouter } from 'react-router';
import axios from 'axios';

function EditGradeView2(props) {
    const [subGradeId, setSubGradeId] = useState(props.gradeData.subGradeId);
    const [monthlyFee, setMonthlyFee] = useState(props.gradeData.monthlyFee); 
    const [weeklyDeliveryQty, setWeeklyDeliveryQty] = useState(props.gradeData.weeklyDeliveryQty);
    const [name, setName] = useState(props.gradeData.name);

    const [gradeData, setGradeData] = useState(props.gradeData);
    const [userSubData, setUserSubdate] = useState(props.userSubData);

    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {

        if(userSubData.subGradeId === subGradeId){
            setIsDisabled(true);
        }
    }, []);

    // 구독신청 버튼클릭 이벤트 핸들러
    const gradeClickHandler = (e) => {
        // 기본 이벤트 중지
        e.preventDefault();

        

        if (window.confirm(`구독등급을 "${name}" 등급으로 변경하시겠습니까? \r\n(현재 구독등급 : ${props.userSubData.subscriptionGradeDto.name})`)) {
            setIsDisabled(true);
            
            let body = {
                subGradeId: subGradeId,
                userId: "jiwoong2",
            }

            axios.put(`/subscription-service/subscription`, body)
                .then(res => {
                    console.log(res);
                    if (res.status === 201) {
                        alert("구독변경이 완료되었습니다.");
                        
                        props.history.push({
                            pathname: '/',
                            state: {
                                //chkedGradeData : props.gradeData
                            }
                        })
                    }
                    else {

                    }
                })
                .catch(err => {
                });
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
                        <Button sx={{px:"0.6rem", py:"0.4rem"}} size="large" variant="contained"  >
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