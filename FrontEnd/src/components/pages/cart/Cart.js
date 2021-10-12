import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import CartTable from '../../elements/widgets/carttable/CartTable';

import { Fragment } from 'react';

export default function Cart() {

    return(
        <Fragment>
            <Header />
            <Bread productName="Cart" />
            <CartTable
                 />
            <Footer />
        </Fragment>
    );
}