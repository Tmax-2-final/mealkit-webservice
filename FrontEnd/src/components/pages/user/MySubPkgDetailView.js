import React from 'react';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router';
import Rating from '../../../components/elements/ui/Rating';

function MySubPkgDetailView(props) {
    const {catalogData, shipStatus} = props;

    // function popupWindow(url, windowName, win, w, h) {
    //     const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
    //     const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
    //     return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    // }

    // const openShipInfoHandler = e => {
    //     popupWindow(`/subscription/ChangeAddressAndDueDate/${shipData.id}/${shipData.postcode}/${shipData.address}/${shipData.addressDetail}/${shipData.dueDate}`, '배송정보 변경', window, 600, 500);  

    // }

    const subShipStatusText = (subShipStatus) => {
        switch (shipStatus) {
            case "1":
                return "상품 준비중"
            case "2":
                return "발송완료"
            case "3":
                return "배송중"
            case "4":
                return "배송취소"
            case "5":
                return "배송완료"
            default:
                return "에러"
        }
    }

    const registerReviewHandler = e => {
        // 배송완료 상태가 아닐경우 리뷰쓰기 불가
        if(shipStatus !== '5'){
            alert("배송 완료된 상품에 대해서만 리뷰 작성이 가능합니다.");
            return;
        }

        props.history.push({
            pathname:"/review/register",
            state: {
                orderType: 2,
                pkgId: null,
                productId: catalogData.catalogId,
                pkgName: null,
                productName: catalogData.name,
            }
        })
    }

    return (
        <div class="card col-10 mb-40">
            {/* <div class="card-header row justify-content-between" style={{cursor:"pointer"}} 
                onClick={viewPkgDetailHandler}
            >
                <div className="col-4" style={{fontWeight:"bold", fontSize:"1.4rem"}}>{catalogData.name}</div>
            </div> */}
            <div class="card-body row justify-content-between">
                <div className="col-1 my-auto m-0 p-0">
                <img src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${catalogData.image1}`} 
                    className="img-fluid mx-auto" alt="" 
                    style={{width:"100%", height:"100%"}}/>
                </div>
                <div className="col-7">
                    <div className="row">
                        <div className="col-2 pr-0">상품번호</div>
                        <div className="col-10 pl-0">{catalogData.catalogId}</div>
                    </div>
                    <div className="row pt-1">
                        <div className="col-2 pr-0">상품명</div>
                        <div className="col-10 pl-0">{catalogData.name}</div>
                    </div>
                    <div className="row pt-1">
                        <div className="col-2 pr-0">카테고리</div>
                        <div className="col-10 pl-0">{catalogData.category}</div>
                    </div>
                    <div className="row pt-1">
                        <div className="col-2 pr-0">평점</div>
                        <div className="col-10 pl-0">
                            {catalogData.rating && catalogData.rating > 0 ? (
                                <Rating ratingValue={catalogData.rating} />
                            ) : ( "" )
                            }
                        </div>
                    </div>
                    <div className="row pt-1">
                        <div className="col-2 pr-0">배송상태</div>
                        <div className="col-10 pl-0">{subShipStatusText(shipStatus)}</div>
                    </div>
                </div>
                <div className="col-3 text-center my-auto">
                    <Button 
                        sx={{width:"100%", height:"3rem", mb:"1rem"}}
                        variant="outlined"
                        size="large"
                        onClick={registerReviewHandler}
                    >
                        상품 리뷰 작성
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(MySubPkgDetailView);