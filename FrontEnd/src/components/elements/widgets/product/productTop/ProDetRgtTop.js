import { Fragment,useState } from "react";
import Rating from '../../../ui/Rating';

export default function ProDetRgtTop({name,price,rating,txt}) {

    return (
        <Fragment>
            <h2>{name}</h2>
            <div className="product-details-price">
                <span>{price} 원</span>
            </div>
            <div className="pro-details-rating-wrap">
                {rating && rating > 0 ? (
                    <Rating ratingValue={rating} />
                ) : ( "" )
                }
            </div>
            <div className="pro-details-list">
                <p>{txt}</p>
            </div>
        </Fragment>
    );
}