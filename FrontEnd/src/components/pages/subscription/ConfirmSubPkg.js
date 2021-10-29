import React, { Fragment, useState, useEffect } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import { Modal } from '../../Modal';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from "date-fns/locale/ko"; // the locale you want
import Button from '@mui/material/Button';

function ConfirmSubPkg(props) {
    // 상품, 총 결제 금액 props 데이터
    //const data = props.location.state.data;

    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');

    //const [ orderMgtData, setOrderMgtData ] = useState(data);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ address, setAddress] = useState('');
    const [ postcode, setPostcode ] = useState('');
    const [ addressDetail, setAddressDetail ] = useState('');
    const [ payment, setPayment] = useState(1)

    const [ email, setEmail] = useState('')
    const [ name, setName] = useState('')

    
    const [startDate, setStartDate] = useState(() => {
        // 일주일전을 검색 기본 시작일자, 시분초를 시작으로 설정 (검색)
        let date = new Date();
        let weekago = new Date(date.setDate(date.getDate() + 2));
        weekago = weekago.setHours(0,0,0,0);
        return weekago;
    });
    const [endDate, setEndDate] = useState(() => {
        let date = new Date();
        let weekago = new Date(date.setDate(date.getDate() + 8));
        weekago = weekago.setHours(0,0,0,0);
        return weekago;
    });
    
    const [selDate, setSelDate] = useState(null);

    registerLocale("ko", ko);

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 1;
      };

    const ExampleCustomInput = ({ value, onClick }) => (
        <button className="example-custom-input" onClick={onClick}>
        {value}
        </button>
    );

    useEffect(() => {
        // axios.get(`/user-service/users/${userId}`, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        //     .then(response => {
        //         console.log("주문자 정보");
        //         console.log(response);
        //         setEmail(response.data.email);
        //         setName(response.data.name);
        //     })
        //     .catch(err => {
        //         alert("주문자 정보 에러");
        //         console.log(err.response);
        //     })
    }, []);

    const handlePutCartList = () => {
        openModal(true);
    }

    const handleKeyDown = e => {
        const { name, value } = e.target;
        setAddressDetail(value);
    }

    const handleChangePayment = e => {
        const { name, value } = e.target;
        setPayment(value);
    }


    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const axiosConfig = {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }

    const handleOrder = (e) => {
        e.preventDefault();

        if(postcode === "" || address === "" || addressDetail === ""){
            alert("배송 정보를 입력해주세요!");
        }
        else {
            if (window.confirm(`해당 주문내역으로 결제 하시겠습니까?`)) {
                const orderData = new Object();
                orderData.postcode=postcode;
                orderData.address=address;
                orderData.addressDetail=addressDetail;
                orderData.payment=payment;
    
                let payload = JSON.stringify({
                    // order_mgt: orderMgtData,
                    // orders: orderData
                });
    
                // console.log("===페이로드===");
                // console.log(payload);

                axios.post(`/order-service/${userId}/orders`, payload, axiosConfig)
                .then(function (response) {
                    
                        console.log("========응답 데이터=======");
                        console.log(response.data)
                    if(response.status === 201){
                        // 페이먼트 이후 장바구니 비우기
                        axios.delete(`/user-service/${userId}/carts`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .then((data) => {
                            console.log(data);
                            // 페이지 이동하기
                            if(data.status === 200) {
                                props.history.push({
                                    pathname: '/paymentcomplete',
                                    state: {
                                        name: name
                                    }
                                })
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("장바구니가 정상적으로 비워지지 않았습니다")
                        })
                        
                    }
                    else if (response.status === 400){
                        alert("주문하려는 상품 재고가 부족합니다.1");
                    }
                    
                    else if (response.status === 500){
                        alert("시스템 에러[500]\r\n[관리자에게 문의바랍니다]1");
                    }
                    else if (response.status === 503){
                        alert("서비스 연결 에러[503]\r\n[관리자에게 문의바랍니다]2");
                    }
                    
                })
                .catch((err)=>{
                    console.log(err.response.data);
                    if (err.response.status === 400){
                        alert("주문하려는 상품 재고가 부족합니다.2");
                    }
                    else if (err.response.status === 500){
                        alert("시스템 에러[500]\r\n[관리자에게 문의바랍니다]2");
                    }
                    else if (err.response.status === 503){
                        alert("서비스 연결 에러[503]\r\n[관리자에게 문의바랍니다]2");
                    }
                })
            }
        }
    }

    // const orderList = orderMgtData.map(item => {
    //     return(
    //                 <tbody>
    //                     <tr>
    //                         <td className="product-thumbnail">
    //                             <img className="img-fluid" src={`https://bookstore-image.s3.us-east-2.amazonaws.com/${item.image}`} alt=""/>
    //                         </td>
    //                         <td className="product-name text-center">
    //                             <span className="text-center">{item.name}</span>
    //                         </td>
    //                         <td className="product-price-cart">
    //                             <span className="amount">{item.unitPrice} 원</span>
    //                         </td>
    //                         <td className="product-quantity">
    //                             <div className="cart-plus-minus">
    //                             <span className="amount">{item.qty}</span>
    //                             </div>
    //                         </td>
    //                         <td className="product-subtotal"><span>{item.unitPrice * item.qty} 원</span></td>
    //                     </tr>
    //                 </tbody>
    //     );
    // })

    return (
        <Fragment>
            <Modal  open={ modalOpen } 
                    close={ closeModal } 
                    setModalOpen = {setModalOpen} 
                    setAddress = {setAddress} 
                    setPostcode = {setPostcode} 
            />
            <Header/>
            <Bread
                productId = ""
                productName = "배송지 입력 및 배송날짜 선택"
                productUrl = ""
            />
            <section id="payment">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Title title = "구독패키지 확정내역"/>
                        <SubTitle title = "패키지 상품 내역"/>
                        <hr></hr>
                        <div className="table-content table-responsive cart-table-content">
                            
                            <table>
                                <thead>
                                    <tr>
                                        <th>이미지</th>
                                        <th>상품명</th>
                                        <th>단가</th>
                                        <th>수량</th>
                                        <th>총 가격</th>
                                    </tr>
                                </thead>
                            {/* {orderList} */}
                            </table>
                        </div>
                        <br/><br/><br/>
                        <SubTitle title = "구독자 정보"/>
                        <hr></hr>
                        <div className="product-details-content">
                            <div class="pro-details-meta">
                                <span>구독자&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <ul>
                                    <li>{name}</li>
                                </ul>
                            </div>
                            <div class="pro-details-meta">
                                <span>휴대폰&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <ul>
                                    <li>01012341234</li>
                                </ul>
                            </div>
                            <div class="pro-details-meta">
                                <span>이메일&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <ul>
                                    <li>{email}</li>
                                </ul>
                            </div>
                            <div class="pro-details-meta">
                                <span>구독등급&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <ul>
                                    <li>{name}</li>
                                </ul>
                            </div>
                        </div>
                        <br/><br/><br/>
                        <SubTitle title = "배송지 정보"/>
                        <hr></hr>
                        <div class="form-group m-form__group row">
                            <label class="col-md-1 col-form-label">
                                주&nbsp;&nbsp;소&nbsp;&nbsp;<span class="m--font-orange vertical-middle"></span>
                            </label>
                            <div class="col-md-2">
                                <input 
                                    type="text" 
                                    class="form-control m-input" 
                                    name="postcode" 
                                    id="postcode" 
                                    placeholder="우편번호" 
                                    readOnly 
                                    value = {postcode}
                                />
                            </div>
                            <br/><br/>
                            <div class="col-md-9 postcode-btn">
                                <button type="button" class="btn btn-info m-btn--air mr-30" onClick={()=> handlePutCartList()}>우편번호 찾기</button>
                                {/* <button type="button" class="btn btn-info m-btn--air" onClick={()=> handlePutCartList()}>배송지 목록</button> */}
                            </div>
                            <div class="col-md-5 offset-md-1">
                                <input
                                type="text"
                                class="form-control m-input m--margin-top-10"
                                name="address"
                                id="address"
                                placeholder="도로명 주소"
                                value={address}
                                readOnly
                                />
                            </div>
                            <br/><br/>
                            <div class="col-md-8"></div>
                            <div class="col-md-5 offset-md-1">
                                <input
                                type="text"
                                class="form-control m-input m--margin-top-10"
                                name="detailAddress"
                                placeholder="상세 주소"
                                onChange={handleKeyDown}
                                required
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-1 my-auto">배송구분</div>
                            <div className="col-md-5">
                                {address.split(" ")[0] === '서울' 
                                || address.split(" ")[0] === '경기'
                                || address.split(" ")[0] === '인천'
                                ? "새벅배송" : "일반배송"}
                            </div>
                            <div className="col-md-5">
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-1 my-auto">배송날짜</div>
                            <div className="col-md-5">
                            <DatePicker
                                selected={selDate}
                                onChange={(date) => setSelDate(date)}
                                minDate={startDate}
                                maxDate={endDate}
                                locale="ko"
                                placeholderText="배송받을 날짜를 선택"
                                dateFormat="yyyy.MM.dd(eee)"
                                filterDate={isWeekday}
                            />
                            </div>
                            <div className="col-md-5">
                            </div>
                        </div>
                        <br/><br/><br/>
                        <div className="row mb-30">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <Button 
                                variant="contained"
                                size="large"
                            >
                                구독패키지 확정하기
                            </Button>
                        </div>
                    </div>
                    </div> 
                </div>
            </div>
        </section> 
            <Footer/>
        </Fragment>
    );
}

export default ConfirmSubPkg;