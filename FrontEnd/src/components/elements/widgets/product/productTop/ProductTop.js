
import { useEffect, useState } from 'react';
import ProductDetailLeft from './ProductDetailLeft';
import ProductDetailLeft2 from './ProductDetailLeft2';
import ProductDetailRight from './ProductDetailRight';
import ReviewTable from '../../../../pages/review/ReviewTable';
import UserReviewList from '../../../../pages/review/UserReviewList';
import axios from "axios";


export default function ProductTop({props, productData}) {
    const [value, setValue] = useState('1');

    const [reviewCnt, setReviewCnt] = useState('1324')
    const [reviewDatas, setReviewDatas] = useState([]);

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');

    useEffect(() => {
        axios.get(`/review-service/reviews/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                console.log(data);
                setReviewDatas(data.data);
            });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=>{
    },[productData])

    return (
        
        <div className="shop-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <ProductDetailLeft2
                        productData = {productData}
                    />
                    <ProductDetailRight 
                        props = {props}
                        productData = {productData}
                    /> 
                </div>
                <div className="row">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        <span style={{color:"black"}}><strong>상세설명</strong></span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                    <span style={{color:"black"}}><strong>상세설명</strong></span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">
                        <span style={{color:"black"}}><strong>{`리뷰 ( ${reviewCnt}개 )`}</strong></span>
                    </button>
                </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row mt-30">
                        <img src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/product-1-detail.PNG`} className="img-fluid mx-auto" alt="" style={{width:"auto", maxHeight:"100%"}}/>
                    </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="row">
                        <img src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/product-1-info.PNG`} className="img-fluid mx-auto" alt="" style={{width:"auto", maxHeight:"100%"}}/>
                    </div>
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="row">                    
                        <ReviewTable
                            reviewDatas={reviewDatas}
                            setReviewDatas={setReviewDatas}
                        />
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>

    );
}