import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { withRouter } from 'react-router';
import Loading from '../../../utilities/Loading';

function GradeView2(props) {
    const [subGradeId, setSubGradeId] = useState(props.gradeData.subGradeId);
    const [monthlyFee, setMonthlyFee] = useState(props.gradeData.monthlyFee);
    const [weeklyDeliveryQty, setWeeklyDeliveryQty] = useState(props.gradeData.weeklyDeliveryQty);
    const [name, setName] = useState(props.gradeData.name);

    const [isDisabled, setIsDisabled] = useState(false);

    // 구독신청 버튼클릭 이벤트 핸들러
    const gradeClickHandler = (e) => {
        // 기본 이벤트 중지
        e.preventDefault();

        setIsDisabled(true);

        // 페이지 전환이 빠른 편이라 임의적으로 딜레이를 설정
        // 1초 후 페이지 이동
        setTimeout(() => {
            props.history.push({
                pathname: '/subscription/register',
                state: {
                    chkedGradeData : props.gradeData
                }
            })
        }, 0) 
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
                <CardActionArea onClick={gradeClickHandler} disabled={isDisabled}>
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
                    <CardContent sx={{textAlign:"center", pb:"5rem"}}>
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
                </CardActionArea>
            </Card>
        </div>
    );
}

export default withRouter(GradeView2);