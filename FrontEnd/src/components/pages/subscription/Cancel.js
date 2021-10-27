import React, { Fragment } from 'react';
import Bread from '../../elements/ui/Bread';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import CancelDetail from './CancelDetail';

function Cancel(props) {
    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "구독 취소"
                productUrl = "/subscription/cancel"
            />
            <CancelDetail/>
            <Footer/>
        </Fragment>
    );
}

export default Cancel;