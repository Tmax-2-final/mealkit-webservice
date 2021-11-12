import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from './components/pages/Home/Home';
import Cart from './components/pages/cart/Cart';
import Compare from './components/pages/compare/Compare';
import Wishlist from './components/pages/wishlist/Wishlist';
import ProductDetail from './components/pages/ProductDetail/ProductDetail';
import ProductList from './components/pages/productlist/ProductList';
import PackageDetail from './components/pages/packagedetail/PackageDetail';
import PackageList from './components/pages/packagelist/PackageList';
import Features from './components/pages/Features/Features';
import MyAccount from './components/pages/myaccount/MyAccount';
import UserDetailEdit from './components/pages/user/UserDetailEdit';
import "./assets/css/mystyle.css";
import "./assets/css/style.css";
import "./assets/css/animate.css";
import "./assets/css/bootstrap.css";
import "./assets/css/googlefont.css";
import "./assets/icons8/css/line-awesome.min.css";
import './assets/css/pagination.css'
import './assets/css/routers.css'
import './assets/css/imgslide.css'
// import ToTop from "./utilities/ToTop";
import Login from './components/pages/user/Login';
import Register from './components/pages/user/Register';
import MyPage from './components/pages/user/MyPage';
import MyInfoEdit from './components/pages/user/MyInfoEdit';
// import MyReview from './components/pages/review/MyReview';
import MyOrder from './components/pages/user/MyOrder';
import FindPw from './components/pages/user/FindPw';
import Payment from './components/pages/payment/Payment';
import PaymetComplete from './components/pages/payment/PaymetComplete';
import AdminUser from './components/pages/admin/AdminUser';
import AdminOrder from './components/pages/admin/AdminOrder';
import AdminCatalog from './components/pages/admin/AdminCatalog';
import CatalogRegister from "./components/pages/productlist/CatalogRegister";
import CatalogRegisterSub from "./components/pages/productlist/CatalogRegisterSub";
// import Routers from './utilities/Routers';
import Preference from "./components/pages/user/Preference";
import ShippingTable from './components/pages/shipping/ShippingTable';
import ReviewForm from './components/pages/review/ReviewForm';
import UserReviewList from './components/pages/review/UserReviewList';
import ProductReviewList from './components/pages/review/ProductReviewList';
import PkgReviewList from './components/pages/review/PkgReviewList';
import EditGrade from './components/pages/subscription/EditGrade';
import Cancel from './components/pages/subscription/Cancel';
import Introduction from './components/pages/subscription/Introduction';
import Grade from './components/pages/subscription/Grade';
import SubRegister from './components/pages/subscription/Register';
import ConfirmSubPkg from './components/pages/subscription/ConfirmSubPkg';
import SubscriptionComplete from './components/pages/subscription/SubscriptionComplete';
import ConfirmSubPkgComplete from './components/pages/subscription/ConfirmSubPkgComplete';
import CancelComplete from './components/pages/subscription/CancelComplete';
import UpdateComplete from './components/pages/subscription/UpdateComplete';
import KakaoLoginCallback from './components/oauth/KakaoLoginCallback';
import MySubShips from './components/pages/user/MySubShips';
import ChangeAddressAndDueDate from './components/elements/widgets/subscription/ChangeAddressAndDueDate';
import RecommendList from "./components/pages/recommendlist/RecommendList";
import MySubPkgDetail from './components/pages/user/MySubPkgDetail';



function App() {
  

  return (
    <BrowserRouter>
      {/* <ToTop> */}
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/mypkg" component={Compare}></Route>
          <Route exact path="/cart" component={Cart}></Route>
          <Route exact path="/wishlist"><Wishlist /></Route>
          <Route exact path="/features"><Features /></Route>
          <Route exact path="/productdetail/:id" component={ProductDetail}></Route>
          <Route exact path="/productlist" component={ProductList}></Route>
          <Redirect exact from="/productlist/reload" to="/productlist" />
          <Route exact path="/productlist/:selCategoryName" component={ProductList}></Route>
          <Redirect exact from="/productlist/:selCategoryName/reload" to="/productlist/:selCategoryName" />
          <Route exact path="/productlist"><ProductList /></Route>
          <Route exact path="/packagelist"><PackageList /></Route>
          <Route exact path="/recommendlist"><RecommendList /></Route>
          <Route exact path="/packagedetail/:id" component={PackageDetail}></Route>
          <Route exact path="/myaccount"><MyAccount /></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/oauth/callback/kakao" component={KakaoLoginCallback}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/preference" component={Preference}></Route>
          <Route exact path="/find/pw"><FindPw/></Route>
          <Route exact path="/mypage" component={MyPage}></Route>
        <Route exact path="/mypage/myInfo" ><MyInfoEdit /></Route>
        <Route exact path="/mypage/myInfoEdit" component={UserDetailEdit}></Route>
          <Route exact path="/mypage/myOrder"><MyOrder /></Route>
          <Route exact path="/mypage/myship"><MySubShips/></Route>
          <Route exact path="/mypage/mysubpkgdetail" component={MySubPkgDetail}></Route>
          {/* <Route exact path="/mypage/myReview"><MyReview /></Route> */}
          <Route exact path="/mypage/shipping"><ShippingTable /></Route>
          <Route exact path="/review/register" component={ReviewForm}></Route>
          <Route exact path="/mypage/review/list"><UserReviewList /></Route>
          <Route exact path="/review/list"><ProductReviewList /></Route>
          <Route exact path="/review/list"><PkgReviewList /></Route>
          <Route exact path="/payment" component={Payment}></Route>
          <Route exact path="/paymentcomplete" component={PaymetComplete}></Route>
          <Route exact path="/admin/users"><AdminUser /></Route>
          <Route exact path="/admin/orders"><AdminOrder /></Route>
          <Route exact path="/admin/catalogs" component={AdminCatalog}></Route>
          <Route exact path="/admin/catalogs/:productId"><CatalogRegisterSub /></Route>
          <Route exact path="/admin/catalog-register"><CatalogRegister /></Route>
          <Route exact path="/subscription/editgrade" component={EditGrade} />
          <Route exact path="/subscription/cancel" component={Cancel} />
          <Route exact path="/subscription/introduce" component={Introduction} />
          <Route  exact path="/subscription/grade" component={Grade} />
          <Route exact path="/subscription/register" component={SubRegister} />
          <Route exact path="/subscription/confirmusubpkg" component={ConfirmSubPkg} />
          <Route exact path="/subscription/subscriptioncomplete" component={SubscriptionComplete} />
          <Route exact path="/subscription/cancelcomplete" component={CancelComplete} />
          <Route exact path="/subscription/updatecomplete" component={UpdateComplete} />
          <Route exact path="/subscription/confirmSubPkgcomplete" component={ConfirmSubPkgComplete} />
          <Route exact path="/subscription/ChangeAddressAndDueDate/:id/:postcode/:address/:addressDetail/:dueDate" component={ChangeAddressAndDueDate} />
        </Switch>
      {/* </ToTop> */}
    </BrowserRouter>
  );
}

export default App;

