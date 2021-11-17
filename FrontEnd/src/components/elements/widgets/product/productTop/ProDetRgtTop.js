import React, { Fragment,useState } from "react";
import Rating from '../../../ui/Rating';

export default function ProDetRgtTop({name,price,rating,txt}) {

    return (
        <Fragment>
            <h1><strong>{name}</strong></h1>
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
                <h2 className="mb-3"><strong></strong></h2>
                <p>{txt}</p>
            </div>
        </Fragment>
    );
}