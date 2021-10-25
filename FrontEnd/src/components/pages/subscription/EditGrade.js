import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import EditGradeDetail2 from './EditGradeDetail2';

export default function EditGrade(props) {

    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "구독 변경"
                productUrl = "/subscription/grade"
            />
            <EditGradeDetail2/>
            <Footer/>
        </Fragment>
    );
}