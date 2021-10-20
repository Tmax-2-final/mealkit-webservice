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
        switch (props.grade) {
            case "1":
                setGradeText("베이직")
                break;
            case "2":
                setGradeText("스탠다드")
                break;
            case "3":
                setGradeText("프리미엄")
            break;
            default:
                setGradeText("베이직")
                break;
        }
    }, [props.grade]);

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

    

    return (
        <>
        <div className="container mt-40">
            <div className="row">
                <h4>2/2단계</h4>
                <h3 className="font-weight-bold">신용카드나 체크카드를 등록해주세요.</h3>
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
                                <span style={{fontWeight: 'bold', fontSize: '1rem'}}>월 84,000</span> 
                            }
                            subheader={
                                
                                <span style={{fontWeight: 'bold', fontSize: '0.8rem'}}>{gradeText} 멤버십</span> 
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
                                    <span>멤버십을 해지하지 않으면 자동으로 멤버십을 계속 유지하며, <br/>멤버십 요금이 등록한 결제수단으로 매월 청구됩니다. <br/>멤버십은 마이페이지에서 언제든지 해지 가능합니다.</span>
                                    
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
                                <Link onClick="subscriptionClickHandler"
                                className="text-center">
                                    <span className="align-middle">구독하기</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        
        </>
    );
}

// app.js 의 Router 태그에 설정안한 페이지도 props.history.push 기능을 사용하기 위해 withRouter 이용
export default withRouter(RegisterDetail);