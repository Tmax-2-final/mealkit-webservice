
import { useEffect, useState } from 'react';
import ProductDetailLeft from '../product/productTop/ProductDetailLeft';
import ProductDetailRight from '../product/productTop/ProductDetailRight';
import PackageDetailLeft from "./PackageDetailLeft";
import * as PropTypes from "prop-types";
import PackageDetailRight from "./PackageDetailRight";




export default function PackageTop({props, packageData}) {
    useEffect(()=>{
    },[packageData])

    console.log(packageData)

    return (
        
        <div className="shop-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <PackageDetailLeft
                        packageData = {packageData}
                    />
                    <PackageDetailRight
                        props = {props}
                        packageData = {packageData}
                    /> 
                </div>
            </div>
        </div>

    );
}