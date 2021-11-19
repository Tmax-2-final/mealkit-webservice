
import { useEffect, useState } from 'react';
import ProductDetailLeft from '../product/productTop/ProductDetailLeft';
import ProductDetailLeft2 from '../product/productTop/ProductDetailLeft2';
import ProductDetailRight from '../product/productTop/ProductDetailRight';

import ReviewTable from '../../../pages/review/ReviewTable';
import UserReviewList from '../../../pages/review/UserReviewList';
import axios from "axios";
import PackageBottom from "./PackageBottom";
import PackageDetailBottom from "./PackageDetailBottom";
import PackageDetailLeft2 from "./PackageDetailLeft2";
import PackageDetailRight from "./PackageDetailRight";


export default function PackageTop1({props, packageData}) {
    const [selCatalogData, setSelCatalogData] = useState();

    return (
        <div className="shop-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <PackageDetailLeft2
                        packageData = {packageData}
                        setSelCatalogData = {setSelCatalogData}
                    />
                    <PackageDetailRight
                        props = {props}
                        packageData = {packageData}
                        selCatalogData = {selCatalogData}
                    />
                    <PackageDetailBottom
                        props = {props}
                        packageData = {packageData}
                    />
                </div>

            </div>
        </div>

    );
}