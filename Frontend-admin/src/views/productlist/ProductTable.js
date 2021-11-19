import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Rating from "../packagelist/Rating";

export default function ProductTable({ catalogDatas, setCatalogDatas, loading }) {

  const history = useHistory();

  const handleDelete = (id, e) => {
    e.preventDefault()

    axios.delete(`/catalog-service/catalogs/${id}`)
      .then(res => {
        alert("삭제 되었습니다.")
        axios.get(`/catalog-service/catalogs`)
          .then(data => {
            console.log(data);
            setCatalogDatas(data.data);

            history.push({
                pathname: '/products/list'
            })

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

    const getCategoryText = (category) => {
        switch (category) {
            case '1':
                return "한식"
            case '2':
                return "양식"
            case '3':
                return "중식"
            case '4':
                return "일식"
            case '5':
                return "동남아"
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
                                            <CTableHeaderCell scope="col">재고</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">카테고리</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">평점</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">삭제 </CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {
                                            loading === false ?
                                                (
                                                    catalogDatas.content.map((item) => (
                                                        <CTableRow key={item.id}>
                                                            <CTableHeaderCell scope="row">{item.catalogId}</CTableHeaderCell>
                                                            <CTableDataCell><img className="default-img" src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${item.image1}`} alt="" style={{width:"100px", height:"100px"}} /></CTableDataCell>
                                                            <CTableDataCell>{item.name}</CTableDataCell>
                                                            <CTableDataCell>{item.stock}</CTableDataCell>
                                                            <CTableDataCell>{getCategoryText(item.category)}</CTableDataCell>
                                                            <CTableDataCell>{item.rating && item.rating > 0 ? (<Rating ratingValue={item.rating} />):("")}</CTableDataCell>
                                                          <CTableDataCell><Link onClick={(e)=> handleDelete(item.catalogId, e)}><i className="far fa-trash-alt"></i></Link></CTableDataCell>
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
