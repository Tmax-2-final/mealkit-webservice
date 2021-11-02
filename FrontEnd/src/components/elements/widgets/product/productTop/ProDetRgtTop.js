import { Fragment,useState } from "react";
import Rating from '../../../ui/Rating';

export default function ProDetRgtTop({name,price,rating,txt}) {

    return (
        <Fragment>
            <h1><strong>집에서 즐기는 프리미엄 홈파티 메뉴 갈릭크럼블 랍스터&쉬림프</strong></h1>
            <div className="product-details-price">
                {/* <span>{price} 원</span> */}
            </div>
            <div className="pro-details-rating-wrap">
                {rating && rating > 0 ? (
                    <Rating ratingValue={rating} />
                ) : ( "" )
                }
            </div>
            <div className="pro-details-list">
                <h2 className="mb-3"><strong>갈릭크럼블 랍스터&파스타</strong></h2>
                <p>랍스터, 새우, 홍합에 갈릭크럼블을 풍성하게 올려 비주얼까지 완벽한 쿡킷의 프리미엄 홈파티 메뉴에요. 탱글탱글한 랍스터와 새우, 부드러운 그린홍합에 고소하고 달콤한 갈릭크럼블을 곁들여 놀라운 맛의 조화를 만들고, 새우볶음밥까지 더해 더욱 풍성하고 특별한 파티 메뉴를 완성하실 수 있답니다.</p>
            </div>
        </Fragment>
    );
}