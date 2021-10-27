import React, { useEffect, useRef, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

function RegisterDetail2(props) {

    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    useEffect(() => {
        setGradeText(props.chkedGradeData.name);
    }, [props.chkedGradeData]);

    const [gradeText, setGradeText] = useState('');
    const [state, setState] = useState({
        chk1: false,
        chk2: false,
        chk3: false,
        chk4: false,
        chk5: false,
    });
    

    const { chk1, chk2, chk3, chk4, chk5 } = state;
    const error = [chk1, chk2, chk3, chk4, chk5].filter((v) => v).length !== 5;

    const [cardNumber, setCardNumber] = useState("")
    const [chkCardNumber, setChkCardNumber] = useState(false);

    const [expiration, setExpiration] = useState("")
    const [chkExpiration, setChkExpiration] = useState(false);

    const [password, setPassword] = useState("")
    const [chkPassword, setChkPassword] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState("")
    const [chkDateOfBirth, setChkDateOfBirth] = useState(false);

    const cardNumberRef = useRef();
    const expirationRef = useRef();
    const passwordRef = useRef();
    const dateOfBirthRef = useRef();
    const chkAgreeRef = useRef();

    const chkAgreeChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.checked,
        });
    };

    const allChkAgreeChangeHandler = (e) => {
        
        if(e.target.checked){
            setState({
                chk1: true,chk2: true,chk3: true,chk4: true,chk5: true,
            });
        }
        else {
            setState({
                chk1: false,chk2: false,chk3: false,chk4: false, chk5: false,
            });
        }
    };

    const subscriptionClickHandler = (e) => {
        e.preventDefault();

        // 유효성 검사 (Validation Check)
        if(cardNumber === "" || chkCardNumber){  
            cardNumberRef.current.focus();
            cardNumberRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            
            alert("카드번호를 입력해주세요.");
            
            return;
        }

        if(expiration === "" || chkExpiration){  
            expirationRef.current.focus();
            expirationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            
            alert("유효기간을 입력해주세요.");
            
            return;
        }

        if(password === "" || chkPassword){  
            passwordRef.current.focus();
            passwordRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            
            alert("비밀번호를 입력해주세요.");

            return;
        }

        if(dateOfBirth === "" || chkDateOfBirth){  
            dateOfBirthRef.current.focus();
            dateOfBirthRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            
            alert("생년월일을 입력해주세요.");
            
            return;
        }

        if(error){
            chkAgreeRef.current.focus();
            chkAgreeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

            alert("모든 약관에 동의해주세요.");
        }
        else {
            if (window.confirm(`밀키트 정기구독을 시작하시겠습니까?`)) {
                
                const body = {
                    subGradeId: props.chkedGradeData.subGradeId,
                    userId: userId,
                }
                
                const headers = {
                    Authorization: `Bearer ${token}`
                }

                console.log("====== 구독 등록 API BODY ======");
                console.log(body);
                console.log("====== 구독 등록 API BODY ======");

                axios.post(`/subscription-service/subscription` ,body,{
                    headers: headers
                })
                .then(res => {
                    console.log(res)
                    if (res.status === 201) {
                        alert("구독이 완료되었습니다.");

                        props.history.push({
                            pathname: '/',
                            state: {
                            }
                        })

                    } else {
                        alert(`구독 응답상태코드 에러 (응답 상태코드 : ${res.status})`)
                    }
                })
                .catch(error => {
                    alert(`구독 등록에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
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
    }

    // 카드번호 텍스트필드 입력 이벤트핸들러
    const cardNumberChangeHandler = (e) => {
        e.preventDefault();
        // 숫자외에 입력된 문자를 전부 공백처리
        setCardNumber(e.target.value.replace(/[^0-9]/g, ''));
        
    }

    // 카드번호 텍스트필드 포커스아웃 이벤트핸들러
    const chkCardNumberBulrHandler = (e) => {
        e.preventDefault();

        const inputText = e.target.value;
        inputText.length < 16 ?  setChkCardNumber(true) : setChkCardNumber(false)
    }
        

    // 유효기간 텍스트필드 onChange 이벤트핸들러
    const expirationDateChangeHandler = (e) => {
        e.preventDefault();

        //숫자외에 입력된 문자를 전부 공백처리
        var inputText = e.target.value.replace(/[^0-9]/g, '');

        // 입력된 글자수가 3자리 이상인 경우 유효달 유효연도 사이에 '/' 문자 추가
        if(inputText.length >= 3){
            setExpiration(inputText.substr(0,2) + '/' + inputText.substr(2, inputText.length -1));
        } else {
            setExpiration(inputText);
        }
    }

    // 유효기간 텍스트필드 포커스아웃 이벤트핸들러
    const chkExpirationDateBulrHandler = (e) => {
        e.preventDefault();

        const inputText = e.target.value;
        inputText.length < 5 ?  setChkExpiration(true) : setChkExpiration(false)
    }

    // 비밀번호 텍스트필드 입력 이벤트핸들러
    const passwordChangeHandler = (e) => {
        e.preventDefault();
        // 숫자외에 입력된 문자를 전부 공백처리
        setPassword(e.target.value.replace(/[^0-9]/g, ''));
        
    }

    // 비밀번호 텍스트필드 포커스아웃 이벤트핸들러
    const chkPasswordBulrHandler = (e) => {
        e.preventDefault();

        const inputText = e.target.value;
        inputText.length < 2 ?  setChkPassword(true) : setChkPassword(false)
    }

    // 생년월일 텍스트필드 입력 이벤트핸들러
    const dateOfBirthChangeHandler = (e) => {
        e.preventDefault();
        // 숫자외에 입력된 문자를 전부 공백처리
        setDateOfBirth(e.target.value.replace(/[^0-9]/g, ''));
        
    }

    // 생년월일 텍스트필드 포커스아웃 이벤트핸들러
    const chkDateOfBirthBulrHandler = (e) => {
        e.preventDefault();

        const inputText = e.target.value;
        inputText.length < 8 ?  setChkDateOfBirth(true) : setChkDateOfBirth(false)
    }

    

    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiFilledInput-root': {
                border: '1px solid #e2e2e1',
                overflow: 'hidden',
                borderRadius: 4,
                backgroundColor: '#fff',
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
        }
    }));

    const classes = useStyles();

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
                <div className="col-lg-6 offset-lg-3 mb-40">
                    <TextField
                        fullWidth
                        className={classes.root}
                        label="카드번호 ('-' 제외 16자리)"
                        value={cardNumber}
                        id="reddit-input1"
                        variant="filled"
                        style={{ marginTop: 11 }}
                        inputRef={cardNumberRef}
                        
                        inputProps={{ maxLength: 16}}
                        InputProps={{ disableUnderline: true }}
                        
                        error={chkCardNumber}
                        helperText={chkCardNumber && "카드번호 16자리를 입력해주세요."}

                        onChange={cardNumberChangeHandler}
                        onBlur={chkCardNumberBulrHandler}
                    />
                    <TextField
                        fullWidth
                        className={classes.root}
                        label="유효기간 (MM/YY)"
                        value={expiration}
                        id="reddit-input2"
                        variant="filled"
                        style={{ marginTop: 11 }}
                        inputRef={expirationRef}
                        
                        inputProps={{ maxLength: 5 }}
                        InputProps={{ disableUnderline: true }}
                        
                        error={chkExpiration}
                        helperText={chkExpiration && "유효기간을 MM/YY 형식으로 입력해주세요. (EX. 03/22)"}

                        onChange={expirationDateChangeHandler}
                        onBlur={chkExpirationDateBulrHandler}
                    />
                    <TextField
                        fullWidth
                        className={classes.root}
                        label="비밀번호 앞 2자리"
                        value={password}
                        id="reddit-input"
                        variant="filled"
                        type="password"
                        style={{ marginTop: 11 }}
                        inputRef={passwordRef}
                        
                        inputProps={{ maxLength: 2}}
                        InputProps={{ disableUnderline: true }}

                        error={chkPassword}
                        helperText={chkPassword && "비밀번호 앞 2자리를 입력해주세요."}

                        onChange={passwordChangeHandler}
                        onBlur={chkPasswordBulrHandler}
                    />
                    <TextField
                        fullWidth
                        className={classes.root}
                        label="생년월일 (YYYYMMDD)"
                        value={dateOfBirth}
                        id="reddit-input"
                        variant="filled"
                        style={{ marginTop: 11 }}
                        inputRef={dateOfBirthRef}
                        
                        inputProps={{ maxLength: 8}}
                        InputProps={{ disableUnderline: true }}

                        error={chkDateOfBirth}
                        helperText={chkDateOfBirth && "생년월일을 8자리를 입력해주세요."}

                        onChange={dateOfBirthChangeHandler}
                        onBlur={chkDateOfBirthBulrHandler}
                    />
                </div>
                <div className="col-lg-6 offset-lg-3">
                    <Card 
                        sx={{ maxWidth: "100%" , backgroundColor: "#1976d2" }
                    }>
                        <CardHeader
                            avatar=" "
                            action={
                                <Link 
                                    to="/subscription/grade"    
                                    style={{color:"white", fontSize:"1rem"}}
                                >
                                    변경
                                </Link>
                            }
                            title={
                                <span style={{fontWeight: 'bold', fontSize: '1rem', color:"white"}}>월 {numberToCommasNumber(props.chkedGradeData.monthlyFee)}</span> 
                            }
                            subheader={
                                
                                <span style={{fontWeight: 'bold', fontSize: '0.8rem', color:"white"}}>{gradeText} 등급</span> 
                            }
                        />
                    </Card>
                    <FormControl
                        required
                        error={error}
                        component="fieldset"
                        sx={{ mt: 5 }}
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
                                    <Checkbox onChange={allChkAgreeChangeHandler} inputRef={chkAgreeRef} />
                                } 
                                label="19세 이상이며, 아래의 약관에 모두 동의합니다." />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk1} onChange={chkAgreeChangeHandler} name="chk1"/>
                                } 
                                label="MailKit 이용 약관 및 개인정보 처리방침에 동의합니다." />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk2} onChange={chkAgreeChangeHandler} name="chk2"/>
                                } 
                                label="본인의 개인 정보를 제 3자에 제공하는 데에 동의합니다." />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk3} onChange={chkAgreeChangeHandler} name="chk3"/>
                                } 
                                label="본인의 개인 정보를 결제 서비스업체에 제공하는 데에 동의합니다." />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk4} onChange={chkAgreeChangeHandler} name="chk4"/>
                                } 
                                label={
                                    <span>구독을 해지하지 않으면 자동으로 구독을 계속 유지하며, 구독 요금이 등록한 결제수단으로 매월 청구됩니다. 구독은 마이페이지에서 언제든지 해지 가능합니다.</span>
                                    
                                }
                                />
                            <FormControlLabel 
                                control={
                                    <Checkbox checked={chk5} onChange={chkAgreeChangeHandler} name="chk5"/>
                                } 
                                label="구독 해지 시점에 배송이 시작된 경우 전액 환불이 불가능합니다." />
                        </FormGroup>
                    </FormControl>
                </div>
            </div>
            <div className="row mb-60" style={{position:'sticky', bottom:'0.5rem', height:'100px'}} >
                <div className="col-lg-6 offset-lg-3">
                    <div className="product-details-content">
                            <div className="pro-details-quality">
                            <div className="pro-details-cart btn-hover mx-auto w-100">
                                <Link onClick={subscriptionClickHandler}
                                className="text-center w-100">
                                    <span className="align-middle">구독 시작하기</span>
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
export default withRouter(RegisterDetail2);