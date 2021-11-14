import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import Rating from "./Rating";
import {Link} from "react-router-dom";
import axios from "axios";

export default function PackageTable({ patalogDatas, setPatalogDatas, loading }) {

  const handleDelete = (id) => {

    axios.delete(`/catalog-service/patalogs/${id}`)
      .then(res => {
        alert("삭제 되었습니다.")
        axios.get(`/catalog-service/patalogs`)
          .then(data => {
            console.log(data);
            setPatalogDatas(data.data);
            window.location.href = "/#/products/package"

            // setCatalogDatas(data.data);
          })
      })

  }

    const getStatusText = (status) => {
        switch (status) {
            case '1':
                return "구독중 (패키지확정 전)"
            case '2':
                return "구독중 (패키지확정 완료)"
            case '3':
                return "구독취소"
            default:
                break;
        }
    }

    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="cart-main-area pt-20 pb-2">
            <div className="container">
                {/* <h3 className="cart-page-title">회원 목록</h3> */}
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content">
                            <div className="card" style={{ paddingBottom: "20px" }}>
                                <CTable hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">이미지</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">상품명</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">패키지 유형</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">평점</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">제작자</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">삭제 </CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {
                                            loading === false ?
                                                (
                                                    patalogDatas.map((item) => (
                                                        <CTableRow key={item.patalogId}>
                                                            <CTableHeaderCell scope="row">{item.patalogId}</CTableHeaderCell>
                                                            <CTableDataCell><img className="default-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image}`} alt="" style={{width:"auto", height:"5rem"}} /></CTableDataCell>
                                                            <CTableDataCell>{item.name}</CTableDataCell>
                                                            <CTableDataCell>{item.category}</CTableDataCell>
                                                            <CTableDataCell>{item.rating && item.rating > 0 ? (<Rating ratingValue={item.rating} />):("")}</CTableDataCell>
                                                            <CTableDataCell>{item.userId}</CTableDataCell>
                                                            <CTableDataCell><Link onClick={(e)=> handleDelete(item.patalogId)}><i className="far fa-trash-alt"></i></Link></CTableDataCell>
                                                        </CTableRow>
                                                    ))
                                                )
                                                :
                                                null
                                        }

                                    </CTableBody>
                                </CTable>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
