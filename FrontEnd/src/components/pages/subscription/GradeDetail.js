import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../../../utilities/Loading';
import styled from 'styled-components';

function GradeDetail(props) {

    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);

    // 구독신청 버튼클릭 이벤트 핸들러
    const gradeHandler = (e) => {
        // Link 태그의 기본 이벤트 중지
        e.preventDefault();

        // 버튼 로딩 생성 및 클릭 방지
        setLoading(true);
        setIsActive(true);

        // 페이지 전환이 빠른 편이라 임의적으로 딜레이를 설정
        // 1초 후 페이지 이동
        setTimeout(() => {
            props.history.push({
                pathname: '/subscription/register',
                state: {
                }
            })
        }, 1000) 
    }

    // styled-components 라이브러리를 활용해서 css가 적용된 컴포넌트 생성
    const RadioButton = styled.input`
        &[type=radio]{
            width: 0;
            height: 0;
            position: absolute;
            left: -9999px;
        }
        
        &[type=radio] + label{
            margin: 0;
            padding: 3em 2.5em;
            box-sizing: border-box;
            position: relative;
            display: inline-block;
            border: solid 1px #DDD;
            background-color: #249220;
            opacity: 0.6;
            line-height: 140%;
            text-align: center;
            box-shadow: 0 0 0 rgba(255, 255, 255, 0);
            transition: border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out;
            cursor: pointer;
        }
        
        &[type=radio]:checked + label{
            background-color: #249220;
            opacity: 1;
            color: #FFF;
            box-shadow: 0 0 10px rgba(69, 192, 89, 0.5);
            border-color: #4B9DEA;
            z-index: 1;
        }
    `

    return (
        <>
        <div className="container mt-30">
            <div className="row">
                <h4>1/2단계</h4>
                <h3 className="font-weight-bold">원하는 멤버십을 선택하세요.</h3>
                <br>
                </br>
            </div>
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row"></th>
                        <td>
                            <RadioButton type="radio" id="option1" name="grade" value="basic"/>
                            <label for="option1">베이직</label>
                        </td>
                        <td>
                            <RadioButton type="radio" id="option2" name="grade" value="standard"/>
                            <label for="option2">스탠다드</label>
                        </td>
                        <td>
                            <RadioButton type="radio" id="option3" name="grade" value="premium"/>
                            <label for="option3">프리미엄</label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">월 요금</th>
                        <td>84,000</td>
                        <td>130,000</td>
                        <td>168,000</td>
                    </tr>
                    <tr>
                        <th scope="row">구독상품 배송 개수</th>
                        <td>매주 3개 상품 배송 (총 12개)</td>
                        <td>매주 5개 상품 배송 (총 20개)</td>
                        <td>매주 7개 상품 배송 (총 28개)</td>
                    </tr>
                    <tr>
                        <th scope="row">1 개 상품당 가격</th>
                        <td>7,000 원 / 1 개</td>
                        <td>6,500 원 / 1 개</td>
                        <td>6,000 원 / 1 개</td>
                    </tr>
                </tbody>
            </table> 
            <div className="row mb-30">
                <div className="col-12 h-100">
                    <div className="product-details-content">
                            <div className="pro-details-quality">
                            <div className="pro-details-cart btn-hover mx-auto">
                                <Link onClick={gradeHandler}
                                    className={"text-center " + (isActive ? "disabled-link" : "")} 
                                    style={{width:"8rem", height:"4rem"}}>
                                    <span className="align-middle">{
                                        loading ?
                                        <Loading
                                            height = "25"
                                            width = "25"
                                            timeout = "2000"
                                        /> 
                                        : "다음"}
                                        
                                    </span>
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
export default withRouter(GradeDetail);