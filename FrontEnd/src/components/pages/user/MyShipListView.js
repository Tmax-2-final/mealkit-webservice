import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router';
import axios from 'axios';

function MyShipListView(props) {
    const {shipData} = props;
    const [patalogData, setPatalogData] = useState([]);
    const [loading, setLoading] = useState(true);

    function popupWindow(url, windowName, win, w, h) {
        const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
        const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
        return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }

    const openShipInfoHandler = e => {
        popupWindow(`/subscription/ChangeAddressAndDueDate/${shipData.id}/${shipData.postcode}/${shipData.address}/${shipData.addressDetail}/${shipData.dueDate}`, '배송정보 변경', window, 600, 500);  

    }

    useEffect(() => {
        let userId = localStorage.getItem('userid');
        let token = localStorage.getItem('token');

        if (!userId || userId === 'undefined') {
            window.location.href = "/login";
        }
        if (!token || token === 'undefined') {
            window.location.href = "/login";
        }

        const apiName = "구독패키지 조회";

        axios.get(`/catalog-service/patalogs/${shipData.pkgId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(`=== ${apiName} DATA ===`);
                console.log(res.data);
                console.log('=======================');

                setPatalogData(res.data);
                setLoading(false);
            })
            .catch(error => {
                alert(`${apiName}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                console.log(error.response);
            })
    }, []);

    const subShipStatusText = (subShipStatus) => {
        switch (subShipStatus) {
            case "1":
                return <span>상품 준비중</span>
            case "2":
                return <span>배송중</span>
            case "3":
                return <span>배송완료</span>
            case "4":
                return <span>배송취소</span>
            case "5":
                return <span>구매확정</span>
            default:
                return <span>에러</span>
        }
    }

    const registerReviewHandler = e => {
        // 배송완료 상태만 리뷰 작성 가능
        if(shipData.status !== '5'){
            alert("배송 완료된 패키지에 대해서만 리뷰 작성이 가능합니다.");
            return;
        }

        props.history.push({
            pathname:"/review/register",
            state: {
                orderType: 1,
                pkgId: shipData.pkgId,
                productId: null,
                pkgName: shipData.name,
                productName: null,
            }
        })
    }

    const viewPkgDetailHandler = e => {
        // 상품 준비상태인 경우만 배송정보 변경 가능
        if(shipData.status !== '1'){
            alert("상품 준비중인 상태만 배송정보 변경이 가능합니다.");
            return;
        }
        
        props.history.push({
            pathname: "/mypage/mysubpkgdetail",
            state: {
                pkgId: shipData.pkgId,
                shipStatus: shipData.status
            }
        })
    }

    return (
        <>
            {loading ?
                <div></div>
                :
                <div class="card col-10 mb-30">
                    <div class="card-header row justify-content-between" style={{cursor:"pointer"}}
                        onClick={viewPkgDetailHandler}
                    >
                        {/* patalogData.pkgMgt && patalogData.pkgMgt.length */}
                        <div className="col-10" style={{fontWeight:"bold", fontSize:"1.4rem"}}>{`${shipData.pkgName} (${patalogData.pkgMgt && patalogData.pkgMgt[0].catalogEntity.name}${patalogData.pkgMgt.length > 1 ? " 외 " + patalogData.pkgMgt.length + "개의 상품)" : ")" }`}</div>
                        <div className="col-2 text-right"><i class="fas fa-chevron-right"></i></div>
                    </div>
                    <div class="card-body row justify-content-between">
                        <div className="col-1 my-auto m-0 p-0">
                            <img src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${patalogData.pkgMgt && patalogData.pkgMgt[0].catalogEntity.image1}`} 
                                className="img-fluid mx-auto" alt="" 
                                style={{width:"100%", height:"100%"}}/>
                        </div>
                        <div className="col-7">
                            <div className="row">
                                <div className="col-3 pr-0">배송번호</div>
                                <div className="col-9 pl-0">{shipData.id}</div>
                            </div>
                            <div className="row pt-1">
                                <div className="col-3 pr-0">배송지</div>
                                <div className="col-9 pl-0">{`${shipData.address} ${shipData.addressDetail}`}</div>
                            </div>
                            <div className="row pt-1">
                                <div className="col-3 pr-0">배송구분</div>
                                <div className="col-9 pl-0">{shipData.type === 1 ? "새벽배송" : "일반배송"}</div>
                            </div>
                            <div className="row pt-1">
                                <div className="col-3 pr-0">배송상태</div>
                                <div className="col-9 pl-0">{subShipStatusText(shipData.status)}</div>
                            </div>
                            <div className="row pt-1">
                                <div className="col-3 pr-0">배송예정일</div>
                                <div className="col-9 pl-0">{shipData.dueDate}</div>
                            </div>
                        </div>
                        <div className="col-3 text-center my-auto">
                            <Button 
                                sx={{width:"100%", height:"3rem", mb:"1rem"}}
                                variant="outlined"
                                size="large"
                                onClick={registerReviewHandler}
                            >
                                패키지 리뷰 작성
                            </Button>
                            <Button 
                                sx={{width:"100%", height:"3rem"}}
                                variant="outlined"
                                size="large"
                                onClick={openShipInfoHandler}
                            >
                                배송정보 변경
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default withRouter(MyShipListView);
