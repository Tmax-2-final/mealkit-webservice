import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import SideBar from '../../elements/widgets/productlist/SideBar';
import Shop from '../../elements/widgets/productlist/Shop';

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';

export default function ProductList(props) {
    console.log(props);
    // console.log(props.location.pathname);
    // let path = props.location.pathname;
    // let strLength = props.location.pathname.length;
    // const category = path !== "/productlist" ? path.substring(13, strLength) : "전체메뉴";
    const [categoryName, setCategoryName] = useState("전체메뉴");
    // const category = props.locaton.pathname !== "/productlist" ? props.locaton.pathname: null;
    const [search, setSearch] = useState(null);
    const { selCategoryName } = useParams(); 
    console.log(search);
    console.log(categoryName);
    console.log(selCategoryName);

    useEffect(() => {
        if(selCategoryName != null) setCategoryName(selCategoryName)
        else setCategoryName("전체메뉴");
    },[selCategoryName]);

    

    return(
        <>
        <Header/>
        <Bread
            productName = "Categories"
        />
        <div className="shop-area pt-95 pb-100">
            <div className="container">
                <div className="row">
                    <SideBar 
                        setCategoryName = {setCategoryName}
                        setSearch={setSearch}
                    />
                    <Shop
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