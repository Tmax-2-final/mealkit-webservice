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
                <Title
                    title = "베스트 밀키트"
                    subtitle= "사람들이 많이 찾는 밀키트에요."/>
                {/* <TabMenu 
                    setCategoryName = {setCategoryName}
                    categoryName = {categoryName}
                /> */}
                <ProductViewMain
                    categoryName = {categoryName}
                    sliceNumber = {sliceNumber}
                    columNumber = {columNumber}
                />
               
            </div> 
        </section> 

    );
}