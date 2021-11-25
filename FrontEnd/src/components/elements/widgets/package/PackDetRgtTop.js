import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Rating from '../../ui/Rating';

export default function PackDetRgtTop({ name, price, rating, packageData}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let timer = setTimeout(() => { setLoading(false) }, 1000);
        // console.log(packageData)
    });

    const getUserPkgText = (pkgName) => {
        let result = pkgName.split("님")[0];
        if (result.includes("@")) {
            result = result.split("@")[0];
        }
        if (result.length > 3) {
            let enc = result.substring(0, result.length - 3)
            enc = enc + "***";
            result = enc;
        }
        return result;
    }

    return (
        <Fragment>
            {
                loading === false ? 
                (
                    <div>
                            <h2>{getUserPkgText(name)} 님의 패키지</h2>
                            <div className="pkg-details-grade pt-5">
                                
                            </div>
                            <div className="pkg-details-rating">
                                <h4>평점 : {rating} / 5</h4>
                            </div>
                            <div className="pro-details-list">
                                <h4>상품 구성</h4>
                                
                                {
                                    packageData.map((item) => (
                                        <p key={item.pkgMgtId} style={{ fontWeight: "bold", fontSize: "16px" }}>{item.catalogEntity.name}</p>
                                    ))
                                }
                                
                            </div>
                    </div>
                )
                :
                null
            }
        </Fragment>
    );
}