import React, { Fragment, useState, useEffect } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import ProductTop from '../../elements/widgets/product/productTop/ProductTop';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import DaumPost from '../../DaumPost';
import { Modal } from '../../Modal';
import SideBar from '../../elements/widgets/productlist/SideBar';
import axios from 'axios';
import { Router } from 'react-router';
import { Link } from 'react-router-dom';

function Payment(props) {
    // 상품, 총 결제 금액 props 데이터
    const data = props.location.state.data;
    const totalPriceData = props.location.state.totalPriceData;

    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');

    const [ orderMgtData, setOrderMgtData ] = useState(data);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ address, setAddress] = useState('');
    const [ postcode, setPostcode ] = useState('');
    const [ addressDetail, setAddressDetail ] = useState('');
    const [ totalPrice, setTotalPrice] = useState(totalPriceData);
    const [ payment, setPayment] = useState(1)

    const [ email, setEmail] = useState('')
    const [ name, setName] = useState('')

    useEffect(() => {
        axios.get(`/user-service/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("주문자 정보");
                console.log(response);
                setEmail(response.data.email);
                setName(response.data.name);
            })
            .catch(err => {
                alert("주문자 정보 에러");
                console.log(err.response);
            })
    }, []);

    const handlePutCartList = () => {
        openModal(true);
    }

    const handleKeyDown = e => {
        const { name, value } = e.target;
        setAddressDetail(value);
    }

    const handleChangePayment = e => {
        console.log(data);
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
                orderData.totalPrice=totalPrice;
                orderData.payment=payment;
    
                let payload = JSON.stringify({
                    order_mgt: orderMgtData,
                    orders: orderData
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

    const orderList = orderMgtData.map(item => {
        return(
                    <tbody>
                        <tr>
                            <td className="product-thumbnail">
                                <img className="img-fluid" src={`https://bookstore-image.s3.us-east-2.amazonaws.com/${item.image}`} alt=""/>
                            </td>
                            <td className="product-name text-center">
                                <span className="text-center">{item.name}</span>
                            </td>
                            <td className="product-price-cart">
                                <span className="amount">{item.unitPrice} 원</span>
                            </td>
                            <td className="product-quantity">
                                <div className="cart-plus-minus">
                                <span className="amount">{item.qty}</span>
                                </div>
                            </td>
                            <td className="product-subtotal"><span>{item.unitPrice * item.qty} 원</span></td>
                        </tr>
                    </tbody>
        );
    })

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
                productName = "주문서"
                productUrl = ""
            />
            <section id="payment">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Title title = "주문서"/>
                        <SubTitle title = "주문상품"/>
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
                            {orderList}
                            </table>
                        </div>
                        <br/><br/><br/>
                        <SubTitle title = "주문자 정보"/>
                        <hr></hr>
                        <div className="product-details-content">
                            <div class="pro-details-meta">
                                <span>주문자&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
                        </div>
                        <br/><br/><br/>
                        <SubTitle title = "배송 정보"/>
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
                                <button type="button" class="btn btn-info m-btn--air" onClick={()=> handlePutCartList()}>우편번호 찾기</button>
                            </div>
                            <div class="col-md-4 offset-md-1">
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
                            <div class="col-md-4 offset-md-1">
                                <input
                                type="text"
                                class="form-control m-input m--margin-top-10"
                                name="detailAddress"
                                placeholder="상세 주소"
                                onChange={handleKeyDown}
                                required
                                />
                            </div>
                            <div class="col-md-8"></div>
                        </div>
                        <br/><br/><br/>
                        <div class="row">
                            <div class="col-md-6">
                                <SubTitle title = "결제 수단"/>
                                <hr></hr>
                                <select onChange={handleChangePayment}>
                                    <option value="1">카드결제</option>
                                    <option value="2">카카오페이결제</option>
                                    <option value="3">네이버페이결제</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <div class="grand-totall">
                                    <div class="title-wrap">
                                        <h2 class="cart-bottom-title section-bg-gary-cart">결제 금액</h2>
                                    </div>
                                        <h5>주문금액
                                        <span>+ {totalPrice}</span>
                                        </h5>
                                        <h5>할인금액
                                        <span>- 2000 원</span>
                                        </h5>
                                        <h5>배송비
                                        <span>+ 3000 원</span>
                                        </h5>
                                        <h4 class="grand-totall-title">총 결제 금액
                                        <span>{totalPrice+1000} 원</span>
                                        </h4>
                                        <Link onClick={handleOrder}>결제하기</Link>
                                </div>
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

export default Payment;