import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import ProDetRgtTop from '../product/productTop/ProDetRgtTop';
import ProDetRgtMiddle from '../product/productTop/ProDetRgtMiddle';
import ProDetRgtBottom from '../product/productTop/ProDetRgtBottom';
import PackDetRgtTop from "./PackDetRgtTop";
import PackDetRgtMiddle from "./PackDetRgtMiddle";

export default function PackageDetailRight({props, packageData, selCatalogData}) {
    useEffect(()=>{
        
    },[packageData])

    console.log(selCatalogData);
    
    return (
        <div className="col-lg-6 col-md-6">
            <div className="product-details-content ml-70">

                <PackDetRgtTop
                    name = {packageData.name}
                    price = {packageData.unitPrice}
                    rating = {packageData.rating}
                    packageData={packageData.pkgMgt}
                />
                <PackDetRgtMiddle
                    props = {props}
                    packageData = {packageData}
                    selCatalogData = {selCatalogData}
                />
                {/* <ProDetRgtBottom /> */}

            </div>
        </div>
    );
}