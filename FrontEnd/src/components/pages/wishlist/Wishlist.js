import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import WishTable from '../../elements/widgets/wishtable/WishTable';
import { Fragment } from 'react';

export default function Wishlist(){

    return(
        <Fragment>
            <Header/>
            <Bread productName ="Wish List" />
            <WishTable />
            <Footer/>
        </Fragment>
    );
}