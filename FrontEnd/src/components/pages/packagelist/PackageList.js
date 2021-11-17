import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import SidePackage from '../../elements/widgets/packagelist/SidePackage';
import PackageShop2 from '../../elements/widgets/packagelist/PackageShop2';

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';

export default function PackageList(props) {
    console.log(props);
    // console.log(props.location.pathname);
    // let path = props.location.pathname;
    // let strLength = props.location.pathname.length;
    // const category = path !== "/productlist" ? path.substring(13, strLength) : "전체메뉴";
    const [categoryName, setCategoryName] = useState("유저 패키지");
    // const category = props.locaton.pathname !== "/productlist" ? props.locaton.pathname: null;
    const [search, setSearch] = useState(null);
    const { selCategoryName } = useParams(); 
    console.log(search);
    console.log(categoryName);
    console.log(selCategoryName);

    useEffect(() => {
        if(selCategoryName != null) setCategoryName(selCategoryName)
        else setCategoryName("유저 패키지");
    },[selCategoryName]);

    if(categoryName === "패키지 직접 제작"){
        window.location.href="/mypkg";
    }

    

    return(
        <>
        <Header/>
        <Bread
            productName = "구독패키지"
        />
        <div className="shop-area pt-95 pb-100">
            <div className="container">
                <div className="row">
                    <SidePackage
                        setCategoryName = {setCategoryName}
                        setSearch={setSearch}
                    />
                    <PackageShop2
                        // 카테고리를 바로 선택하여 상품리스트에 접속 시 URL의 카테고리 맵핑
                        categoryName = {categoryName}
                        search = {search}
                        setSearch = {setSearch}
                        props = {props}

                    />
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );

}