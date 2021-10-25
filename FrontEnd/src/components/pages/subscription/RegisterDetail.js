import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios';

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
    MenuProps:{
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 10.5 + ITEM_PADDING_TOP,
            },
        },
    }
};

const monthList = [
    {value: '',label: '',},{value: '1',label: '1월',},{value: '2',label: '2월',},
    {value: '3',label: '3월',},{value: '4',label: '4월',},{value: '5',label: '5월',},
    {value: '6',label: '6월',},{value: '7',label: '7월',},{value: '8',label: '8월',},
    {value: '9',label: '9월',},{value: '10',label: '10월',},{value: '11',label: '11월',},
    {value: '12',label: '12월',},
  ];

  const dayList = [
    {value: '',label: '',},{value: '1',label: '1일',},{value: '2',label: '2일',},
    {value: '3',label: '3일',},{value: '4',label: '4일',},{value: '5',label: '5일',},
    {value: '6',label: '6일',},{value: '7',label: '7일',},{value: '8',label: '8일',},
    {value: '9',label: '9일',},{value: '10',label: '10일',},{value: '11',label: '11일',},
    {value: '12',label: '12일',},{value: '13',label: '13일',},{value: '14',label: '14일',},
    {value: '15',label: '15일',},{value: '16',label: '16일',},{value: '17',label: '17일',},
    {value: '18',label: '18일',},{value: '19',label: '19일',},{value: '20',label: '20일',},
    {value: '21',label: '21일',},{value: '22',label: '22일',},{value: '23',label: '23일',},
    {value: '24',label: '24일',},{value: '25',label: '25일',},{value: '26',label: '26일',},
    {value: '27',label: '27일',},{value: '28',label: '28일',},{value: '29',label: '29일',},
    {value: '30',label: '30일',},{value: '31',label: '31일',},
  ];

function RegisterDetail(props) {
    useEffect(() => {
        setGradeText(props.chkedGradeData.name);
    }, [props.chkedGradeData]);

    const [gradeText, setGradeText] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [state, setState] = useState({
        chk1: false,
        chk2: false,
        chk3: false,
        chk4: false,
        chk5: false,
    });

    const { chk1, chk2, chk3, chk4, chk5 } = state;
    const error = [chk1, chk2, chk3, chk4, chk5].filter((v) => v).length !== 5;

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.checked,
        });
    };

    const handleChange2 = (e) => {
        
        if(e.target.checked){
            setState({
                chk1: true,
                chk2: true,
                chk3: true,
                chk4: true,
                chk5: true,
            });
        }
        else {
            setState({
                chk1: false,
                chk2: false,
                chk3: false,
                chk4: false,
                chk5: false,
            });
        }
    };

    const birthDayChangeHandler = (e) => {
        setBirthDay(e.target.value);
    };

    const birthMonthChangeHandler = (e) => {
        setBirthMonth(e.target.value);
    };

    const RedditTextField = styled((props) => (
        <TextField InputProps={{ disableUnderline: true }} {...props} />
    ))(({ theme }) => ({
            '& .MuiFilledInput-root': {
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            '&:hover': {
                backgroundColor: 'transparent',
            },
            '&.Mui-focused': {
                backgroundColor: 'transparent',
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
                borderColor: theme.palette.primary.main,
            },
        },
    }));

    const subscriptionClickHandler = (e) => {
        e.preventDefault();

        if(error){
            alert("모든 약관에 동의를 해야 구독이 가능합니다.");
        }
        else {
            if (window.confirm(`구독하시겠습니까?`)) {
                const subscriptionData = new Object();
                subscriptionData.subGradeId=props.chkedGradeData.subGradeId;
                subscriptionData.userId="jiwoong";
                subscriptionData.nextPaymentDate="2021-10-21";
    
                let payload = JSON.stringify({
                    // order_mgt: orderMgtData,
                    // orders: orderData
                });

                props.history.push({
                    pathname: '/',
                    state: {
                    }
                })
            }
        }

        
    }

    const testHandler = () => {
        var IMP = window.IMP;
        IMP.init('imp19758798');
        var money = 3000;
        console.log(money);

        IMP.request_pay({
            pg: 'kakao',
            merchant_uid: 'merchant_' + new Date().getTime(),

            name: '주문명 : 주문명 설정',
            amount: money,
            buyer_email: 'iamport@siot.do',
            buyer_name: '구매자이름',
            buyer_tel: '010-1234-5678',
            buyer_addr: '인천광역시 부평구',
            buyer_postcode: '123-456'
        }, function (rsp) {
            console.log(rsp);
            if (rsp.success) {
                var msg = '결제가 완료되었습니다.';
                msg += '고유ID : ' + rsp.imp_uid;
                msg += '상점 거래ID : ' + rsp.merchant_uid;
                msg += '결제 금액 : ' + rsp.paid_amount;
                msg += '카드 승인번호 : ' + rsp.apply_num;
                // $.ajax({
                //     type: "GET", 
                //     url: "/user/mypage/charge/point", //충전 금액값을 보낼 url 설정
                //     data: {
                //         "amount" : money
                //     },
                // });
            } else {
                var msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
            }
            alert(msg);
            document.location.href="/user/mypage/home"; //alert창 확인 후 이동할 url 설정
        });
    }

    const requestPay = () => {
        var IMP = window.IMP;
        IMP.init('imp197587982');

        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay({ // param
            pg: 'kakao',
            merchant_uid: 'merchant_' + new Date().getTime(),

            name: '밀키트 정기구독',
            amount: 3000,
            buyer_email: 'iamport@siot.do',
            buyer_name: '구매자이름',
            buyer_tel: '010-1234-5678',
            buyer_addr: '인천광역시 부평구',
            buyer_postcode: '123-456'
        }, rsp => { // callback
            if (rsp.success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
                // axios로 HTTP 요청
                axios({
                    url: "/subscription/introduce", // 예: https://www.myservice.com/payments/complete
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    data: {
                        imp_uid: rsp.imp_uid,
                        merchant_uid: rsp.merchant_uid
                    }
                }).then((data) => {
                  // 서버 결제 API 성공시 로직
                })
            } else {
                alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
            }
        });
    }

    const requestPay2 = () => {
        var IMP = window.IMP;
        IMP.init('imp19758798');

        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay({ // param
            pg: 'kakao',
            merchant_uid: 'merchant_' + new Date().getTime(),

            name : '최초인증결제',
            amount : 1004, // 빌링키 발급과 함께 1,004원 결제승인을 시도합니다.
            customer_uid : 'imp19758798', // 필수 입력
            buyer_email : 'iamport@siot.do',
            buyer_name : '아임포트',
            buyer_tel : '02-1234-1234'
        }, rsp => { // callback
            if ( rsp.success ) {
                alert('빌링키 발급 성공');
            } else {
                alert('빌링키 발급 실패');
            }
        });
    }

    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
        <div className="container mt-40">
            <div className="row">
                <h4>2/2단계</h4>
                <h3 className="font-weight-bold">결제 정보를 입력해주세요.</h3>
                <br>
                </br>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <RedditTextField
                        fullWidth
                        label="카드번호"
                        id="reddit-input"
                        variant="filled"
                        style={{ marginTop: 11 }}
                    />
                    <RedditTextField
                        fullWidth
                        label="만료일(월/연도:05/17)"
                        id="reddit-input"
                        variant="filled"
                        style={{ marginTop: 11 }}
                    />
                    <RedditTextField
                        fullWidth
                        label="이름"
                        id="reddit-input"
                        variant="filled"
                        style={{ marginTop: 11 }}
                    />
                    <RedditTextField
                        fullWidth
                        label="생년"
                        id="reddit-input"
                        variant="filled"
                        style={{ marginTop: 11 }}
                    />
                    <RedditTextField
                        fullWidth
                        id="reddit-select-month"
                        select
                        label="생월"
                        value={birthDay}
                        onChange={birthDayChangeHandler}
                        helperText="test"
                        variant="filled"
                        style={{ marginTop: 11 }}
                        >
                        {monthList.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </RedditTextField>
                    <RedditTextField
                        fullWidth
                        id="reddit-select-day"
                        select
                        label="생일"
                        value={birthMonth}
                        onChange={birthMonthChangeHandler}
                        helperText="test"
                        variant="filled"
                        style={{ marginTop: 11 }}
                        SelectProps={MenuProps}
                    >
                        {dayList.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </RedditTextField>  
                </div>
                <div className="col-lg-6">
                    <Card 
                        sx={{ maxWidth: "100%" , backgroundColor: "#cddc39" }
                    }>
                        <CardHeader
                            avatar=" "
                            action={
                                <Link 
                                    to="/subscription/grade"    
                                    style={{color:"#0071eb"}}
                                >
                                    변경
                                </Link>
                            }
                            title={
                                <span style={{fontWeight: 'bold', fontSize: '1rem'}}>월 {numberToCommasNumber(props.chkedGradeData.monthlyFee)}</span> 
                            }
                            subheader={
                                
                                <span style={{fontWeight: 'bold', fontSize: '0.8rem'}}>{gradeText} 등급</span> 
                            }
                        />
                    </Card>
                    <FormControl
                        required
                        error={error}
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                    >
                        {error ? (
                            <FormLabel component="legend">모든 약관에 동의하셔야 합니다.</FormLabel>
                        ) : (
                            ""
                        )}

                        <FormGroup>
                            <FormControlLabel 
                                control={
                                    <Checkbox onChange={handleChange2} />
                                } 
                                label="19세 이상이며, 아래의 약관에 모두 동의합니다." />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk1} onChange={handleChange} name="chk1"/>
                                } 
                                label="MailKit 이용 약관 및 개인정보 처리방침에 동의합니다." />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk2} onChange={handleChange} name="chk2"/>
                                } 
                                label="본인의 개인 정보를 제 3자에 제공하는 데에 동의합니다." />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk3} onChange={handleChange} name="chk3"/>
                                } 
                                label="본인의 개인 정보를 결제 서비스업체에 제공하는 데에 동의합니다." />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk4} onChange={handleChange} name="chk4"/>
                                } 
                                label={
                                    <span>구독을 해지하지 않으면 자동으로 구독을 계속 유지하며, 구독 요금이 등록한 결제수단으로 매월 청구됩니다. 구독은 마이페이지에서 언제든지 해지 가능합니다.</span>
                                    
                                }
                                />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk5} onChange={handleChange} name="chk5"/>
                                } 
                                label="구독 해지 시점에 배송이 시작된 경우 전액 환불이 불가능합니다." />
                        </FormGroup>
                    </FormControl>
                </div>
            </div>
            <div className="row mb-40" >
                <div className="col-12">
                    <div className="product-details-content">
                            <div className="pro-details-quality">
                            <div className="pro-details-cart btn-hover mx-auto">
                                <Link onClick={subscriptionClickHandler}
                                className="text-center">
                                    <span className="align-middle">구독하기</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div class="card-body bg-white mt-0 shadow">
            <button onClick={requestPay2}>결제하기</button>             
        </div>
        </>
    );
}

// app.js 의 Router 태그에 설정안한 페이지도 props.history.push 기능을 사용하기 위해 withRouter 이용
export default withRouter(RegisterDetail);