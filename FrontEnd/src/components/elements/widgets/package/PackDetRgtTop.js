import { Fragment,useEffect,useState } from "react";
import Rating from '../../ui/Rating';

export default function PackDetRgtTop({name,price,rating,txt}) {


    return (
        <Fragment>
            <h2 className="mb-4">{name}</h2>
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