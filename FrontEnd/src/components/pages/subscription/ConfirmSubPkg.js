import React, { Fragment, useState, useEffect } from 'react';
import Bread from '../../elements/ui/Bread';
import Title2 from '../../elements/ui/Title2';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import { Modal } from '../../Modal';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from "date-fns/locale/ko"; // the locale you want
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function ConfirmSubPkg(props) {
    const {myPkgData} = props.location.state;

    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('010-0000-0000');
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ address, setAddress] = useState('');
    const [ postcode, setPostcode ] = useState('');
    const [ addressDetail, setAddressDetail ] = useState('');
    const [ fullAddress, setFullAddress ] = useState('');
    const [ payment, setPayment] = useState(1)
    const [subGradeText, setSubGradeText] = useState('');
    const [monthlyFee, setMonthlyFee] = useState(0);
    const [shipType, setShipType] = useState(0);

    const [patalogData ,setPatalogData] = useState([]);
    const [pkgMgtData ,setPkgMgtData] = useState([]);

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        if(address.split(" ")[0] === '서울' || address.split(" ")[0] === '경기'|| address.split(" ")[0] === '인천'){
            setShipType('1');
        }
        else {
            setShipType('2');
        }
    }, [address])

    useEffect(() => {
        const apiName = "회원상세정보 조회";

        axios.get(`/user-service/users/${userId}`, {
            headers : headers
        })
        .then(res => {
            console.log(`=== ${apiName} 데이터 ===`);
            console.log(res.data);
            console.log("=========================");

            setEmail(res.data.email);
            setName(res.data.name);
        })
        .catch(error => {
            alert(`${apiName}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
            
            console.log(`====== ${apiName} 실패 data ======`);
            console.log(error.response);
            console.log(`==================================`);
        })

        const apiName2 = "특정회원 구독 조회";

        axios.get(`/subscription-service/subscription/${userId}`, {
            headers : headers
        })
        .then(res => {
            console.log(`=== ${apiName2} 데이터 ===`);
            console.log(res.data);
            console.log("=========================");

            // 구독중 (패키지확정전)
            const subscribingAndBeforeConfirmedPkgStatus = '1';
            // 구독중 (패키지확정후)
            const subscribingAndAfterConfirmedPkgStatus = '2';
            // 구독취소
            const cancelStatus = '3';

            if(res.data.status === cancelStatus)
            {
                alert("구독패키지 확정전인 회원만 가능합니다.\r\n(현재구독상태 : 구독취소)");

                props.history.push({
                    pathname: "/",
                    state: {

                    }
                })

                return;
            }

            if(res.data.status === subscribingAndAfterConfirmedPkgStatus)
            {
                alert("구독패키지 확정전인 회원만 가능합니다.\r\n(현재구독상태 : 구독중(패키지확정 완료))");

                props.history.push({
                    pathname: "/",
                    state: {

                    }
                })

                return;
            }

            setSubGradeText(res.data.subscriptionGradeDto.name);
            setMonthlyFee(res.data.subscriptionGradeDto.monthlyFee);
            
        })
        .catch(error => {
            alert(`${apiName2}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
            
            console.log(`====== ${apiName2} 실패 data ======`);
            console.log(error.response);
            console.log(`==================================`);
        })
    }, []);

    
    const [startDate, setStartDate] = useState(() => {
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
    const [selDate2, setSelDate2] = useState(null);
    const [selDate3, setSelDate3] = useState(null);
    const [selDate4, setSelDate4] = useState(null);

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

    const seacrhPostHandler = () => {
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

    console.log(myPkgData);

    const myPkgList = myPkgData.map((item) => {
        if(item.catalogEntity != null) item = item.catalogEntity;

        return(
            <tr key={item.myPkgId}>
                <td style={{width:"15%"}}>
                    <img className="img-fluid" width="100px" height="auto" 
                        src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image1}`} alt=""
                    />
                </td>
                <td className="text-center align-middle" style={{fontSize:"1.2rem"}}>{item.name}</td>
                <td className="text-center align-middle" style={{fontSize:"1.2rem"}}>{item.category}</td>
                <td className="text-center align-middle" style={{fontSize:"1.2rem"}}>1개</td>
            </tr>
        );
    })

    function dateFormat(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        second = second >= 10 ? second : '0' + second;

        return date.getFullYear() + '-' + month + '-' + day;

        //return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    const secondWeek = (date) => {
        var d = new Date(date);
        var dayOfMonth = d.getDate();
        d.setDate(dayOfMonth + 7);
        return d;
    }

    const thirdWeek = (date) => {
        var d = new Date(date);
        var dayOfMonth = d.getDate();
        d.setDate(dayOfMonth + 14);
        return d;
    }

    const fourthWeek = (date) => {
        var d = new Date(date);
        var dayOfMonth = d.getDate();
        d.setDate(dayOfMonth + 21);
        return d;
    }

    const registerPkg = () => {
        let body = {
            name: userId +"님의 패키지",
            category: "유저 패키지",
            rating: "5",
            image: myPkgData[0].catalogEntity != null ? myPkgData[0].catalogEntity.image1 : myPkgData[0].image1
        }

        console.log(body);

        axios.post(`/catalog-service/${userId}/patalogs`, body,{
            headers: headers
        } )
            .then(res => {
                console.log(res)
                if (res.status == 201) {
                    //alert("상품 등록이 완료 되었습니다.");
                    console.log(res.data);
                    axios.get(`/catalog-service/${userId}/firstpatalogs`, {
                        headers : headers
                    } )
                    .then(res => {
                        setPatalogData(res.data);
                        console.log(res.data);

                        registerShip(res.data);

                        let jsonArray = new Array();
                        myPkgData.map( item=> {
                            let jsonObj = new Object();
                            jsonObj.catalogId =  item.catalogEntity != null ? item.catalogEntity.catalogId : item.catalogId
                            jsonObj.patalogId = res.data.patalogId;
                            jsonObj = JSON.stringify(jsonObj);
                            jsonArray.push(JSON.parse(jsonObj));
                        })
                        setPkgMgtData(jsonArray);
                        console.log(jsonArray);
                        console.log(pkgMgtData);
                        axios.post(`/catalog-service/${userId}/pkgmgt`, jsonArray, {
                            headers : headers
                        })
                            .then(res => {
                                console.log(res)
                                if(res.status == 201){
                                    console.log(res.data);
                                }
                                else{
                                    console.log(res);
                                    alert("오류 발생")
                                }
                            })
                    })
                }
                else if(res.status === 200) {
                    alert("장바구니에 동일한 상품이 있어 수량을 변경했습니다.");

                }
                else {
                    console.log(res);
                    alert("오류 발생. 장바구니에 상품이 담기지 않았습니다.")
                }
            })
            .catch(err => {
                alert("다시 다시 입력해주세요.");
                console.log(body);
            });
    }
    
    const confirmSubpkg = (patalogData) => {
        const params = {
            userId : userId,
            pkgId : patalogData.patalogId
        }

        const apiName = "구독패키지 확정"

        console.log(`====== ${apiName} API PARAMS ======`);
        console.log(params);
        console.log("==================================");

        axios.put(`/subscription-service/subscription/confirmsubpkg`,null , {
            params : params
        })
        .then(res => {
            console.log(`====== ${apiName} 응답 데이터 ======`);
            console.log(res.data);
            console.log("===================================");
        })
        .catch(error => {
            alert(`${apiName}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
            console.log(error.response);
        })
    }

    const registerShip = (patalogData) => {
        const body = {
            userId : userId,
            pkgId: patalogData.patalogId,
            pkgName: patalogData.name,
            address: address,
            addressDetail: addressDetail,
            postcode: postcode,
            type: shipType,
            dueDate: selDate,
            price: monthlyFee / 4,
            requestCatalogList: myPkgData
        }

        const apiName2 = "구독배송 등록"

        console.log(`====== ${apiName2} API BODY ======`);
        console.log(body);
        console.log("=================================");

        axios.post(`/subscription-service/ships`, body)
        .then(res => {
            
            if(res.status === 201){
                console.log(`====== ${apiName2} 응답 데이터 ======`);
                console.log(res.data);
                console.log("===================================");
                
                confirmSubpkg(patalogData);

                props.history.push({
                    pathname: "/subscription/confirmSubPkgcomplete",
                    state: {

                    }
                })
            } else {
                alert(`${apiName2} 응답상태코드 에러 (응답 상태코드 : ${res.status})`)
            }
        })
        .catch(error => {
            alert(error.response.data);
            //alert(`${apiName2}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
            console.log(error.response);
        })
    }

    const cofirmSubPkgHandler = (e) => {
        e.preventDefault();

        if(postcode === "" || address === "" || addressDetail === ""){
            alert("배송 정보를 입력해주세요!");
            return;
        }
        
        if(selDate === null){
            alert("배송받을 날짜를 선택해주세요.");
            return;
        }

        if (window.confirm(`해당 패키지구성 및 배송지 정보로 구독패키지 확정 및 배송 시작을 하시겠습니까?`)) {
            // 패키지 등록
            registerPkg();
        }
    }

    return (
        <Fragment>
            <Modal  open={ modalOpen } 
                    close={ closeModal } 
                    setModalOpen = {setModalOpen} 
                    setAddress = {setAddress} 
                    setPostcode = {setPostcode} 
                    setFullAddress = {setFullAddress}
            />
            <Header/>
            <Bread
                productId = ""
                productName = "구독패키지 확정 및 배송시작"
                productUrl = ""
            />
            <section id="confirmSubPkg">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Title2 title = "구독패키지 확정내역"/>
                        <SubTitle title = "패키지 상품구성"/>
                        <hr></hr>
                        <table className="table table-borderless">
                            <tbody>
                                {myPkgList}
                            </tbody>
                        </table>
                        <hr/>
                        <br/><br/><br/>
                        <SubTitle title = "구독자 정보"/>
                        <hr></hr>
                        <div className="row">
                            <div className="col-1"><span style={{fontSize:"1rem", fontWeight:"bold"}}>이름</span></div>
                            <div className="col-9 mb-3"><span style={{fontSize:"1rem"}}>{name}</span> </div>
                        </div>
                        <div className="row">
                            <div className="col-1"><span style={{fontSize:"1rem", fontWeight:"bold"}}>휴대폰</span></div>
                            <div className="col-9 mb-3"><span style={{fontSize:"1rem"}}>{phoneNum}</span></div>
                        </div>
                        <div className="row">
                            <div className="col-1"><span style={{fontSize:"1rem", fontWeight:"bold"}}>이메일</span></div>
                            <div className="col-9 mb-3"><span style={{fontSize:"1rem"}}>{email}</span></div>
                        </div>
                        <div className="row">
                            <div className="col-1"><span style={{fontSize:"1rem", fontWeight:"bold"}}>구독등급</span></div>
                            <div className="col-9"><span style={{fontSize:"1rem"}}>{subGradeText}</span></div>
                        </div>
                        <br/><br/><br/>
                        <div className="row">
                            <div className="col-6">
                            <SubTitle title = "배송지 정보"/>
                            <hr></hr>
                                <div className="form-group m-form__group row">
                                    <label className="col-md-2 col-form-label">
                                        <span className="m--font-orange vertical-middle" style={{fontSize:"1rem", fontWeight:"bold"}}>주&nbsp;&nbsp;소&nbsp;&nbsp;</span>
                                    </label>
                                    <div className="col-md-4">
                                        <input 
                                            type="text" 
                                            className="form-control m-input" 
                                            name="postcode" 
                                            id="postcode" 
                                            placeholder="우편번호" 
                                            readOnly 
                                            value = {postcode}
                                        />
                                    </div>
                                    <br/><br/>
                                    <div className="col-md-6 postcode-btn">
                                        <button type="button" className="btn btn-info m-btn--air mr-30" onClick={seacrhPostHandler}>우편번호 찾기</button>
                                    </div>
                                    <div className="col-md-8 offset-md-2">
                                        <input
                                        type="text"
                                        className="form-control m-input m--margin-top-10"
                                        name="address"
                                        id="address"
                                        placeholder="도로명 주소"
                                        value={address}
                                        readOnly
                                        />
                                    </div>
                                    <br/><br/>
                                    <div className="col-md-8 offset-md-2">
                                        <input
                                        type="text"
                                        className="form-control m-input m--margin-top-10"
                                        name="detailAddress"
                                        placeholder="상세 주소"
                                        onChange={handleKeyDown}
                                        required
                                        />
                                    </div>
                                </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-2 my-auto" style={{fontSize:"1rem", fontWeight:"bold"}}>배송구분</div>
                                <div className="col-md-2 pr-0">
                                    {address.split(" ")[0] === '서울' 
                                    || address.split(" ")[0] === '경기'
                                    || address.split(" ")[0] === '인천'
                                    ? "새벽배송" : "일반배송"}
                                </div>
                                <div className="col-md-5 pl-0">
                                    <span className="ml-1" style={{fontSize:"1.4rem", color:"gray"}} title={`현재 서울,인천,경기만 새벽배송이 가능하며, 나머지 지역의 경우 일반택배로 배송됩니다.`}>
                                        <i className="far fa-question-circle"></i>
                                    </span>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-2 my-auto" style={{fontSize:"1rem", fontWeight:"bold"}}>배송날짜</div>
                                
                                <div className="col-md-4" style={{fontSize:"1rem"}}>
                                    <DatePicker
                                        selected={selDate}
                                        onChange={(date) => {
                                            setSelDate(date);
                                            setSelDate2(secondWeek(date));
                                            setSelDate3(thirdWeek(date));
                                            setSelDate4(fourthWeek(date));
                                        }}
                                        minDate={startDate}
                                        maxDate={endDate}
                                        locale="ko"
                                        placeholderText="배송받을 날짜를 선택"
                                        dateFormat="yyyy.MM.dd(eee)"
                                        filterDate={isWeekday}
                                    />
                                </div>
                                <div className="col-md-2 p-0 mt-2">
                                    <span className="" style={{fontSize:"1.4rem", color:"gray"}} title={`첫 배송일을 선택합니다. \r\n첫 배송일 기준 일주일마다 배송되며,\r\n배송일 변경은 각 배송건마다 마이페이지-구독배송관리 페이지에서 가능합니다.`}>
                                        <i className="far fa-question-circle"></i>
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                            <div className="col-md-6">
                                <SubTitle title = "주차별 배송예정일"/>
                                <hr></hr>
                                        {
                                            selDate === null ? 
                                            (<div style={{fontSize:"1.2rem", fontWeight:"bold"}}>배송날짜를 선택해주세요.</div>) 
                                            : 
                                            (
                                                <>
                                                    <div className="row">
                                                        <div className="col-4">
                                                        <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>1 주차 배송예정일 </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div style={{fontSize:"1.2rem"}}>{selDate && dateFormat(selDate)}</div>
                                                    </div> 
                                                    <div className="row mt-4">
                                                        <div className="col-4">
                                                            <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>2 주차 배송예정일 </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div style={{fontSize:"1.2rem"}}>{selDate && dateFormat(selDate2)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-4">
                                                        <div className="col-4">
                                                            <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>3 주차 배송예정일 </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div style={{fontSize:"1.2rem"}}>{selDate && dateFormat(selDate3)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-4">
                                                        <div className="col-4">
                                                            <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>4 주차 배송예정일 </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div style={{fontSize:"1.2rem"}}>{selDate && dateFormat(selDate4)}</div>
                                                        </div>
                                                    </div>
                                                    </div> 
                                                </>
                                            )
                                        }
                            </div>
                        </div>
                        <br/><br/><br/>
                        <div className="row mt-10 mb-30">
                            <div className="col-lg-8 offset-lg-2 text-center">
                                <Button 
                                    sx={{width:"20rem", height:"4rem"}}
                                    variant="contained"
                                    size="large"
                                    onClick={cofirmSubPkgHandler}
                                >
                                    구독패키지 확정 및 배송 시작
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
