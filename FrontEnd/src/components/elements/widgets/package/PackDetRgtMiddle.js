import {Fragment, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import AddBuyAndCart from '../product/productTop/AddBuyAndCart';
import AddPackage from "./AddPackage";
import axios from "axios";

export default function PackDetRgtMiddle({props, packageData}) {

    const [ pkgMgtData, setPkgMgtData ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {

        const fetchPosts = async () => {
            setLoading(true);
        }

        console.log("=======패키지 데이터======");
        console.log(packageData);

        axios.get(`/catalog-service/${userId}/pkgmgt/${packageData.patalogId}`,{
            headers : headers
        })
            .then(res => {
                console.log("=======상품관리 데이터======");
                setPkgMgtData(res.data);
                console.log(res.data);
                console.log(pkgMgtData);
                setLoading(false);
            })
    },[packageData]);

    return (
        <Fragment>
            {/* <ColorAndSize 
                vData = {varData.variation}
                setColor = {setColor}
                setSize = {setSize}
            /> */}
            <AddPackage
                props = {props}
                packageData = {packageData}
                pkgMgtData = {pkgMgtData}
            /> 
        </Fragment>
    
    );
}