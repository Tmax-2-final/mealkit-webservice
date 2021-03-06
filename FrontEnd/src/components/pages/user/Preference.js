import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "./LayoutOne";
import Bread from "../../elements/ui/Bread";
import axios from "axios";


export default function Preference(props) {

    const [checkedThemeItems, setCheckedThemeItems] = useState(new Set());

    const themeHandler = (e) => {

        setTheme({
            ...theme,
            [e.target.name]: e.target.checked,
        });
        
        if (e.target.checked) {
            checkedThemeItems.add(e.target.value);
            setCheckedThemeItems(checkedThemeItems);
        } else if (!e.target.checked && checkedThemeItems.has(e.target.value)) {
            checkedThemeItems.delete(e.target.value);
            setCheckedThemeItems(checkedThemeItems);

        }
        console.log(checkedThemeItems);
        console.log(checkedThemeItems.size);
        
    };


    const [checkedFlavorItems, setCheckedFlavorItems] = useState(new Set());

    const flavorHandler = (e) => {

        setFlavor({
            ...flavor,
            [e.target.name]: e.target.checked,
        });

        if (e.target.checked) {
            checkedFlavorItems.add(e.target.value);
            setCheckedFlavorItems(checkedFlavorItems);
        } else if (!e.target.checked && checkedFlavorItems.has(e.target.value)) {
            checkedFlavorItems.delete(e.target.value);
            setCheckedFlavorItems(checkedFlavorItems);

        }
        console.log(checkedFlavorItems);
        console.log(checkedFlavorItems.size);

    };

    const ageHandler = (e) => {
        e.preventDefault();
        setAge(e.target.value);
    };

    const genderHandler = (e) => {
        // e.preventDefault();
        console.log(e.target.value)
        setGender(e.target.value);
    };

    const cookingtimeHandler = (e) => {
        // e.preventDefault();
        setCookingtime(e.target.value);
    };

    const [age, setAge] = useState(10);
    const [gender, setGender] = useState('0');
    const [cookingtime, setCookingtime] = useState(0);
    
    let themeText = "";
    let flavorText = "";

    let SetThemeText = "";
    let SetFlavorText = "";

    const submitHandler = (e) => {
        e.preventDefault();
        if (age === 0) {
            alert("????????? ??????????????????")
            return;
        }
        if (gender === 0) {
            alert("????????? ??????????????????")
            return;
        }
        if (theme === "") {
            alert("???????????? ????????? ??????????????????")
            return;
        }
        if (flavor === "") {
            alert("???????????? ?????? ??????????????????")
            return;
        }
        if (cookingtime === 0) {
            alert("??????????????? ??????????????????")
            return;
        }
        if (error === true) {
            alert("???????????? ????????? ????????? ?????? ???????????????")
            return;
        }
        if (error2 === true) {
            alert("???????????? ?????? ????????? ?????? ???????????????")
            return;
        }

        let userId = localStorage.getItem('userid');
        let token = localStorage.getItem('token');
        
        themeText = "";

        for (let item of checkedThemeItems) {
            themeText += ","  + item
        }
        
        SetThemeText = themeText.substring(1);


        flavorText = "";

        for (let item of checkedFlavorItems) {
            flavorText += "," + item
        }
        
        SetFlavorText = flavorText.substring(1);


        let body = {
            age: age,
            gender: Number(gender),
            userId: userId,
            flavor: SetFlavorText,
            cookingtime: Number(cookingtime),
            theme: SetThemeText
        };

        console.log(body);
     
        axios.post("/user-service/users/preference", body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res)
                if (res.status === 201) {
                    alert("????????? ????????? ?????????????????????.")
                    window.location.href = '/'
                }
                else {
                    alert("?????? ??????????????????.");
                }
            })
            .catch(err => {
                alert("?????? ??????????????????.");
            })
    }

    const [theme, setTheme] = useState({
        chk1: false,
        chk2: false,
        chk3: false,
        chk4: false,
        chk5: false,
    });

    const [flavor, setFlavor] = useState({
        ck1: false,
        ck2: false,
        ck3: false,
        ck4: false
    });


    const { chk1, chk2, chk3, chk4, chk5 } = theme;
    const error = [chk1, chk2, chk3, chk4, chk5].filter((v) => v).length < 2;

    const { ck1, ck2, ck3, ck4 } = flavor;
    const error2 = [ck1, ck2, ck3, ck4].filter((v) => v).length < 2;

    return (
        <Fragment>
            <LayoutOne headerTop="visible">
                <Bread productName="My Account" />
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    <div className="container" defaultActiveKey="login">
                                        <ul variant="pills" className="login-register-tab-list">

                                            <li>
                                                <Link eventKey="register">
                                                    <h4>My Preference</h4>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="content">
                                            <div className="pane" eventKey="register">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form onSubmit={submitHandler}>
                                                            <h4><strong>???????????? ??? ????????? ????????? ?????????.</strong></h4>
                                                            <h5>???????????? ????????? ?????? ????????? ??????????????? ?????? ????????? ???????????????.</h5><br /><br />

                                                            <div>
                                                            <strong>1. ???????????? ???????????????</strong><br /><br />
                                                                <select name="age" value={age} onChange={ageHandler}>
                                                                    <option value="1" >10???</option>
                                                                    <option value="2" >20???</option>
                                                                    <option value="3" >30???</option>
                                                                    <option value="4" >40???</option>
                                                                    <option value="5" >50???</option>
                                                                    <option value="6" >60??? ??????</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <br /><br /><strong>2. ????????? ???????????????</strong><br /><br />
                                                                <input type="radio" name="gender" value="1" onChange={ genderHandler }
                                                                        style={{ width: "15px", height: "15px", margin: "8px" }}
                                                                        checked={gender === "1" ? true : false} /> ??????
                                                                <input type="radio" name="gender" value="2" onChange={ genderHandler }
                                                                        style={{ width: "15px", height: "15px", margin: "8px" }}
                                                                        checked={gender === "2" ? true : false}/> ??????
                    
                                                            </div>
                                                            <br /><br />
                                                            <div>
                                                                <strong>3. ???????????? ????????? ????????? ?????? ???????????????. </strong><br /><br />
                                                                <input type="checkbox" name="chk1" value="1" checked={chk1} onChange={themeHandler} style={{ margin: "8px" }} /> ??????
                                                                <input type="checkbox" name="chk2" value="2" checked={chk2} onChange={themeHandler} style={{ margin: "8px" }} /> ??????
                                                                <input type="checkbox" name="chk3" value="3" checked={chk3} onChange={themeHandler} style={{ margin: "8px" }} /> ??????
                                                                <input type="checkbox" name="chk4" value="4" checked={chk4} onChange={themeHandler} style={{ margin: "8px" }} /> ??????
                                                                <input type="checkbox" name="chk5" value="5" checked={chk5} onChange={themeHandler} style={{ margin: "8px" }} /> ????????? ??????
                                                            </div>
                                                            <br /><br />
                                                            <div>
                                                                <strong>4. ???????????? ?????? ????????? ?????? ???????????????.</strong><br /><br />
                                                                <input type="checkbox" name="ck1" value="1" checked={ck1} onChange={flavorHandler} style={{ margin: "8px" }} /> ??? ???
                                                                <input type="checkbox" name="ck2" value="2" checked={ck2} onChange={flavorHandler} style={{ margin: "8px" }} /> ?????? ???
                                                                <input type="checkbox" name="ck3" value="3" checked={ck3} onChange={flavorHandler} style={{ margin: "8px" }} /> ????????? ???
                                                                <input type="checkbox" name="ck4" value="4" checked={ck4} onChange={flavorHandler} style={{ margin: "8px" }} /> ????????? ???
                                                            </div>

                                                            <div>
                                                                <br /><br /><strong>5. ????????? ????????? ?????? ?????????? </strong><br /><br />
                                                                <input type="radio" name="cookingtime" value="1" onChange={cookingtimeHandler} style={{ width: "15px", height: "15px", margin: "8px" }} /> 10??? ??????
                                                                <input type="radio" name="cookingtime" value="2" onChange={cookingtimeHandler} style={{ width: "15px", height: "15px", margin: "8px" }} /> 10 ~ 20???
                                                                <input type="radio" name="cookingtime" value="3" onChange={cookingtimeHandler} style={{ width: "15px", height: "15px", margin: "8px" }} /> 20??? ??????
                                                            </div>
                                                            <br /><br />
                                                            <br />
                                                            <div className="button-box">
                                                                <div class="row justify-content-between">
                                                                    <div class="col-4">
                                                                        <button type="submit" >
                                                                            <span>Submit</span>
                                                                        </button>
                                                                    </div>

                                                                    {/* <div class="col-4">
                                                                        <button type="submit" >
                                                                            <span>Skip</span>
                                                                        </button>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};
