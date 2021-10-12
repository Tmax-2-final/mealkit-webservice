import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from './components/pages/Home/Home';
import Cart from './components/pages/cart/Cart';
import Compare from './components/pages/compare/Compare';
import Wishlist from './components/pages/wishlist/Wishlist';
import ProductDetail from './components/pages/ProductDetail/ProductDetail';
import ProductList from './components/pages/productlist/ProductList';
import Features from './components/pages/Features/Features';
import MyAccount from './components/pages/myaccount/MyAccount';
import ReduxSample from './components/pages/reduxsample/ReduxSample';
import "./assets/css/mystyle.css";
import "./assets/css/style.css";
import "./assets/css/animate.css";
import "./assets/css/bootstrap.css";
import "./assets/css/googlefont.css";
import "./assets/icons8/css/line-awesome.min.css";
import './assets/css/pagination.css'
import ToTop from "./utilities/ToTop";
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/pages/user/Login';
import Register from './components/pages/user/Register';
import MyPage from './components/pages/user/MyPage';
import MyInfoEdit from './components/pages/user/MyInfoEdit';
import MyOrder from './components/pages/user/MyOrder';
import FindPw from './components/pages/user/FindPw';
import Payment from './components/pages/payment/Payment';
import PaymetComplete from './components/pages/payment/PaymetComplete';
import AdminUser from './components/pages/admin/AdminUser';
import AdminOrder from './components/pages/admin/AdminOrder';
import AdminCatalog from './components/pages/admin/AdminCatalog';
import CatalogRegister from "./components/pages/productlist/CatalogRegister";
import CatalogRegisterSub from "./components/pages/productlist/CatalogRegisterSub";
import TestOne from "./components/pages/productlist/Test";


function App() {

  return (
    <BrowserRouter>
      <ToTop>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/compare"><Compare /></Route>
          <Route exact path="/cart" component={Cart}></Route>
          <Route exact path="/wishlist"><Wishlist /></Route>
          <Route exact path="/features"><Features /></Route>
          <Route exact path="/productdetail/:id" component={ProductDetail}></Route>
          <Route exact path="/productlist" component={ProductList}></Route>
          <Redirect exact from="/productlist/reload" to="/productlist" />
          <Route exact path="/productlist/:selCategoryName" component={ProductList}></Route>
          <Redirect exact from="/productlist/:selCategoryName/reload" to="/productlist/:selCategoryName" />
          <Route exact path="/productlist"><ProductList /></Route>
          <Route exact path="/myaccount"><MyAccount /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/register"><Register /></Route>
          <Route exact path="/find/pw"><FindPw/></Route>
          <Route exact path="/mypage"><MyPage /></Route>
          <Route exact path="/mypage/myInfo"><MyInfoEdit /></Route>
          <Route exact path="/mypage/myOrder"><MyOrder /></Route>
          <Route exact path="/payment" component={Payment}></Route>
          <Route exact path="/paymentcomplete" component={PaymetComplete}></Route>
          <Route exact path="/admin/users"><AdminUser /></Route>
          <Route exact path="/admin/orders"><AdminOrder /></Route>
          <Route exact path="/admin/catalogs" component={AdminCatalog}></Route>
          <Route exact path="/admin/catalogs/:productId"><CatalogRegisterSub /></Route>
          <Route exact path="/admin/catalog-register"><CatalogRegister /></Route>
          <Route exact path="/test"><TestOne /></Route>
          <Provider store={store}>
            <Route exact path="/reduxsample"><ReduxSample /></Route>
          </Provider>
        </Switch>
      </ToTop>
    </BrowserRouter>
  );
}

export default App;
