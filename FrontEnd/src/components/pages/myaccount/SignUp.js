import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router";

export default function SignUp() {

    const history = useHistory();

    const [usersDatas, setUsersDatas] = useState([]);

    const [values, setValues] = useState({
        userId: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        name: '',
    })

    const [guideTxts, setGuideTxts] = useState({
        userGuide : '최대 20자 까지 가능합니다.',
        emailGuide : '이메일 형식에 맞게 작성해 주세요.',
        pwdGuide : '숫자와 문자를 조합해서 최소 8글자는 입력해 주세요.',
        confirmPwdGuide : '한번더 입력해 주세요.',
        nameGuide : '',
        phoneGuide : '. 을 입력하지 말아 주세요.'
    });

    const [error, setError] = useState({
        userIdError: '',
        emailError: '',
        pwdError: '',
        confirmPwd: '',
        nameError: '',
        phoneError: ''
      })



  const isUserId = userId => {
    const userIdRegex = /^[a-z0-9_!@$%^&*-+=?"]{1,20}$/
    return userIdRegex.test(userId);
  }

  const isEmail = email => {
  const emailRegex = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()¥[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; 

    return emailRegex.test(email);
  };

  const isPwd = pass => {
    const pwdRegex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).*$/;

    return pwdRegex.test(pass);
  }
  
  const isPhone = phone => {
    const phoneRegex = /^[0-9\b -]{0,13}$/;
    return phoneRegex.test(phone)
  }

  const confirmPassword = (pass, confirmPass) => {
    return pass === confirmPass
  }



      const onTextCheck = () => {
        let userIdError = "";
        let emailError = "";
        let pwdError = "";
        let confirmPwd = "";
        let nameError = "";
        let phoneError = "";
        
    
        if (!isUserId(values.userId)) userIdError = "아이디 형식을 확인 해 주세요.( 한글 불가 )";
        if (!isEmail(values.email)) emailError = "email 형식이 아닙니다.";
        if (!isPwd(values.password)) pwdError = "비밀번호 조건을 만족 할 수 없습니다.";
        if (!confirmPassword(values.password, values.confirmPassword)) confirmPwd = "비밀번호가 일치하지 않습니다.";
        if (values.userId === values.password) pwdError = "아이디를 비밀번호로 사용 할 수 없습니다."; 
        if (!isPhone(values.phone)) phoneError = "휴대폰 형식이 아닙니다.";

        if (values.name.length === 0) nameError = "이름을 입력해주세요.";
    
        //console.log(userIdError, emailError, pwdError, confirmPwd, nameError, phoneError, userTypesError, useConfirmError)
        setError({
          userIdError, emailError, pwdError, confirmPwd, nameError, phoneError
        })
    
        if (userIdError || emailError || pwdError || confirmPwd || nameError || phoneError ) return false;
        return true;
      }

    let process = require('../../../myProcess.json');

    useEffect(()=>{
        fetch(`http://${process.IP}:${process.PORT}/users`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setUsersDatas(data);
            console.log(data);
        });
    },[process.IP, process.PORT]);

    const handleChangeForm = (e) => {
        setValues({ 
            ...values, 
            [e.target.name]: e.target.value 
        });
    }

    const handlePutUserLists = (e) => {
        //alert(usersDatas.length);
        //console.log(values);
        e.preventDefault();

        const valid = onTextCheck();

        if (!valid) console.error("retry");

        else {
        
            fetch(`http://${process.IP}:${process.PORT}/users`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id : usersDatas.length + 1,
                    userId: values.userId,
                    password: values.password,
                    name: values.name,
                    email: values.email,
                    phone: values.phone
                }),
            }).
            then(
                alert("success"),
                history.push('/')
                //window.location.href = '/'

            )
            }
    }

    return(

        <div className="card-body">
            <div className="myaccount-info-wrapper">
            <form  onSubmit={handlePutUserLists}>
                <div className="account-info-wrapper">
                    <h4>회원가입</h4>
                    <h5>SignUp</h5>
                </div>
                <div className="row">
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>Id</label>
                            <input 
                                type="text"
                                name="userId"
                                value={values.userId}
                                onChange={handleChangeForm}
                                // placeholder="ID를 입력해 주세요."
                            />
                        </div>
                    </div>
                    {
                        error.userIdError 
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.userIdError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.userGuide}</div>
                    }

                    
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>Password</label>
                            <input 
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                    {
                        error.pwdError 
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.pwdError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.pwdGuide}</div>
                    }

                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>Confirm Pass</label>
                            <input 
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>

                    {
                        error.confirmPwd
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.confirmPwd}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.confirmPwdGuide}</div>
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>Email</label>
                            <input 
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                    {
                        error.emailError
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.emailError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.emailGuide}</div>
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>Name</label>
                            <input 
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                    {
                        error.nameError 
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.nameError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.nameGuide}</div>
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>Phone</label>
                            <input 
                                type="tel"
                                name="phone"
                                value={values.phone}
                                onChange={handleChangeForm}
                            />
                        </div>
                    </div>
                    {
                        error.phoneError
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.phoneError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.phoneGuide}</div>
                    }
                    
                </div>
                
                <div className="billing-back-btn">
                    <div className="billing-btn">
                        <button type="submit">등록</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );

}