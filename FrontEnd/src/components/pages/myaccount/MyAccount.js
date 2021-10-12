import { Fragment } from "react";
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import MyAccountForm from "./MyAccountForm";

export default function MyAccount() {

    return(
        <Fragment>
            <Header />
            <Bread productName = "My Account"/>
            <MyAccountForm />
            <Footer />
        </Fragment>
    );
}