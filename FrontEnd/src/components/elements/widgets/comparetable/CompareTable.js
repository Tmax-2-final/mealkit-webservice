import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Rating from '../../ui/Rating';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function CompareTable(props) {
    const [myPackageDatas, setMyPackageDatas] = useState([]); // 유저별 마이패키지 정보
    const [columNumber, setColumNumber] = useState(3);
    const [patalogData, setPatalogData] = useState();
    const [pkgMgtData, setPkgMgtData] = useState([]);

    const [mySubscribeYn, setMySubscribeYn] = useState(0); // 구독여부 0:안함 1:함
    const [mySubGrade, setMySubGrade] = useState(0); // 구독 등급
    const [mySubMax, setMySubMax] = useState(0); // 구독 담는 패키지 최대 개수

    const [loading, setLoading] = useState(true);

    const history = useHistory();
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        axios.get(`/user-service/users/${userId}`, { headers: headers })
            .then((res) => {
                console.log("회원정보",res.data)
                if(res.status === 200) {
                    // 구독 여부 정보 저장
                    setMySubscribeYn(res.data.subscribeYn);
                    if (res.data.subscribeYn === 1) {
                        axios.get(`/subscription-service/subscription/${userId}`, { headers: headers })
                            .then((res) => {
                                if (res.status === 200) {
                                    console.log("회원구독정보",res.data)
                                    if (res.data && res.data.status) {
                                        // 구독 등급 정보 및 패키지 최대 개수 저장
                                        setMySubGrade(getSubscribeGrade(res.data.subGradeId))
                                    }
                                }
                            })
                    }
                }
            })
        axios.get(`/catalog-service/${userId}/mypackage`, {headers: headers})
            .then((res) => {
                console.log(res.data);
                setMyPackageDatas(res.data);
                setLoading(false);
            })
        
    }, []);

    const getSubscribeGrade = (subGradeId) => {
        switch (subGradeId) {
            case 1:
                setMySubMax(3);
                return "베이직";
            case 2:
                setMySubMax(5);
                return "스탠다드";
            case 3:
                setMySubMax(7);
                return "프리미엄";
            default:
                return "구독안함";
        }
    }

    const handleDelete = (id, e) => {
        e.preventDefault();
        console.log(id);

        axios.delete(`/catalog-service/${userId}/mypackage/${id}`, {
            headers: headers
        })
            .then(res => {
                alert("삭제 되었습니다.")
                axios.get(`/catalog-service/${userId}/mypackage`, {
                    headers: headers
                })
                    .then(data => {
                        console.log(data.data);
                        setMyPackageDatas(data.data);
                        // setCatalogDatas(data.data);
                    })
            })

    }

    const handleAllDelete = (e) => {
        e.preventDefault();
        axios.delete(`/catalog-service/${userId}/mypackage`)
            .then(res => {
                alert("삭제 되었습니다.")
                // axios.get(`catalog-service/mypackage`)
                //     .then(data =>{
                //         console.log(data.data);
                //         setMyPackageDatas(data.data);
                //     })
                window.location.href = '/mypkg'
            })
    }

    const comparelist01 = myPackageDatas.map((item, index) => (

        <div className={`col-xl-${columNumber} col-md-6 col-lg-${columNumber} col-sm-6`} key={item.catalogEntity.catalogId}>
            <div className="product-wrap mb-25">
                <div className="product-img">
                    <Link to={`/packagedetail/${item.catalogEntity.catalogId}`}>
                        <img className="img-fluid" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.catalogEntity.image1}`} alt="" />
                        <img className="hover-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.catalogEntity.image1}`} alt="" />
                    </Link>
                </div>
                <div className="compare-remove">
                    <button onClick={(e) => handleDelete(item.myPkgId, e)}><i className="las la-trash"></i></button>
                </div>
                <div className="product-content text-center">
                    <h3><Link to={`/packagedetail/${item.catalogEntity.catalogId}`}>{item.catalogEntity.name}</Link></h3>
                </div>
            </div>
        </div>

    )).slice(0, 30);

    const confirmSubPkgHandler = (e) => {
        e.preventDefault();
        // 유효성 검사 1: 구독 여부
        if(mySubscribeYn === 0) {
            alert("서비스 이용을 위해 구독하기를 먼저 진행해주세요.")
            window.location.href ="/subscription/introduce"
            return;
        }
        // 유효성 검사 2: 패키지 담은 상품 개수 비교
        if (mySubMax < myPackageDatas.length) {
            alert(`최대로 담을 수 있는 개수는 ${mySubMax}개 입니다. 상품을 비워주세요!`)
            return;
        }
        else if (mySubMax > myPackageDatas.length) {
            alert(`${mySubMax - myPackageDatas.length}개 더 담아주세요.`)
            return;
        }

        if(window.confirm("패키지 확정하시겠습니까?")) {
            history.push({
                pathname: "/subscription/confirmusubpkg",
                state: {
                    myPkgData: myPackageDatas,
                    pkgId: 1,
                    pkgName: "테스트 패키지 이름"
                }
            })
        }
    }

    return (
        <div className="compare-main-area pt-80 pb-100">
            <div className="container">
                <div className="row">
                    <div className="mypkg-title-header pb-20">
                        <h3 style={{ marginBottom: "-5px"}}>마이패키지</h3>
                        <span style={{color: "grey"}}>회원님의 구독 상품을 꾸리고 확정 버튼을 눌러주세요.</span>
                    </div>

                    <div className="mypkg-title-body">
                        {
                            mySubscribeYn === 0 ?
                                (
                                    <div>
                                        <h5>
                                            <span style={{ color: "green" }}>{userId}</span>
                                            회원님, 서비스 이용을 위해 <Link to="/subscription/introduce" style={{textDecoration: "underLine", fontWeight: "bold"}}>구독하기</Link>를 먼저 진행해주세요.
                                        </h5>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <h5>
                                            <span style={{ color: "green" }}>{userId}</span>
                                            회원님은 <span style={{fontWeight: "bold"}}>{mySubGrade}</span> 등급으로 구독 중입니다.
                                            </h5>
                                        <h5><b>현재 패키지에 담은 상품의 수 : </b>{myPackageDatas.length}개</h5>
                                        <h5><b>패키지에 최대로 담을 수 있는 상품의 수 : </b><span> {mySubMax} 개</span></h5>
                                    </div>
                                )
                        }
                    </div>
                </div>
                {
                    loading === false ?
                        (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cart-shiping-update-wrapper">
                                        <div className="cart-shiping-update">
                                            <a href="/productlist">상품 찾기</a>
                                        </div>
                                        <div className="cart-shiping-update">
                                            <a href="/packagelist">패키지 찾기</a>
                                        </div>
                                    </div>
                                    <div className="compare-page-content">
                                        <div className="compare-table table-responsive">
                                            <table className="table table-bordered mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th className="title-column">담은 상품 보기</th>
                                                        <div className="row grid three-column">
                                                            {comparelist01}
                                                        </div>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="cart-shiping-update-wrapper">
                                                <div className="cart-clear">
                                                    <button onClick={handleAllDelete}>패키지 비우기</button>
                                                </div>
                                                <div className="cart-shiping-update">
                                                    <Link to="#" style={{ backgroundColor: "grey", color: "white" }} onClick={confirmSubPkgHandler}>패키지 확정</Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="loading-box" style={{ textAlign: "center", paddingTop: "250px" }}>
                                <ClipLoader
                                    color="gray"
                                    loading={loading}
                                    size="50px" />
                            </div>
                        )
                }

            </div>
        </div>
    );
}
