import React, { useState } from 'react';

import Title from '../../elements/ui/Title';
import TabMenu from '../../elements/ui/TabMenu';
import ProductViewMain from '../../elements/widgets/product/ProductViewMain';

export default function Deal(){


    const [ categoryName , setCategoryName ] = useState("전체메뉴");
    let sliceNumber = 12;
    let columNumber = 3;
    console.log(categoryName);

    return(

        <section id="deal">
            <div className="container">
                <Title title = "추천 상품"/>
                <TabMenu 
                    setCategoryName = {setCategoryName}
                    categoryName = {categoryName}
                />
                <ProductViewMain
                    categoryName = {categoryName}
                    sliceNumber = {sliceNumber}
                    columNumber = {columNumber}
                />
               
            </div> 
        </section> 

    );
}