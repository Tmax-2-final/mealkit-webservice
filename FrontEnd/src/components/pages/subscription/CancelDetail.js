//import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useRef } from 'react';
import axios from 'axios';
import reactDom from 'react-dom';
import { withRouter } from 'react-router';

function CancelDetail(props) {

    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    const textareaRef = useRef();

	//textarea 바이트 수 체크하는 함수
    const checkByte = (e) => {
    const maxByte = 200; //최대 100바이트
    const text = e.target.value; //입력한 문자
    const textLen = text.length; //입력한 문자수
    
    // let totalByte=0;
    // for(let i=0; i<textLen; i++){
    //     const each_char = textLen.charAt(i);
    //     const uni_char = escape(each_char) //유니코드 형식으로 변환
    //     if(uni_char.length>4){
    //         // 한글 : 2Byte
    //         totalByte += 2;
    //     }else{
    //         // 영문,숫자,특수문자 : 1Byte
    //         totalByte += 1;
    //     }
    // }
    
    if(textLen>maxByte){
        alert(`최대 ${maxByte}자까지만 입력가능합니다.`);
            //document.getElementById("nowByte").innerText = textLen;
            //document.getElementById("nowByte").style.color = "red";
            e.target.value =  e.target.value.substring(0, maxByte);
            document.getElementById("nowByte").innerText = 200;
        }else{
            document.getElementById("nowByte").innerText = textLen;
            document.getElementById("nowByte").style.color = "green";
        }
    }

    const cancelOnclickHandler = () => {
        if (window.confirm(`밀키트 정기구독을 취소하시겠습니까?`)) {
            const body = {
                cancelContent: textareaRef.current.value,
                userId: userId,
            }
            
            const headers = {
                Authorization: `Bearer ${token}`
            }

            console.log("====== 구독 취소 API BODY ======");
            console.log(body);
            console.log("====== 구독 취소 API BODY ======");

            axios.delete(`/subscription-service/subscription`, {
                data : body,
                headers: headers
            })
            .then(res => {
                console.log(res);
                if(res.status === 200){
                    alert("구독 취소가 완료되었습니다.")

                    props.history.push({
                        pathname: '/',
                        state: {
                        }
                    })
                } else {
                    alert(`구독취소 응답상태코드 에러 (응답 상태코드 : ${res.status})`)
                }
            })
            .catch(error => {
                alert(`구독 취소에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
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


    return (
        <>
        <div className="container mt-30">
            <div className="row">
                <div className="col-lg-8 offset-lg-2 mb-1">
                    <h3 className="font-weight-bold mb-30">구독취소 하시려는 이유를 알려주실 수 있나요 ?</h3>
                    <textarea 
                        style={{backgroundColor:"#fff" , resize:"none"}}
                        rows="5" 
                        onKeyUp={checkByte}
                        ref={textareaRef}
                    >
                        
                    </textarea>
                </div>
            </div>
            <div className="row mb-30">
            <div className="col-lg-8 offset-lg-2 text-right">
                    <sup style={{fontSize:"0.8rem"}}>(<span id="nowByte">0</span>/200자)</sup>
            </div>
            </div>
            <div className="row mb-30">
                <div className="col-lg-8 offset-lg-2 text-center">
                    <Button onClick={cancelOnclickHandler}
                        variant="contained"
                        size="large"
                    >
                        구독취소
                    </Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default withRouter(CancelDetail);