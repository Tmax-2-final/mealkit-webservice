import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Menu(){

    const [ menuData, setMenuData ] = useState([]);
    const [chk, setChk] = useState(false)
    const [categoryData, setCategoryData] = useState([]);

    
    useEffect(() => {
        axios.get("/catalog-service/menu")
        .then(res => {
            setMenuData(res.data);
            console.log(res.data);

        })
        //.catch(error => console.log(error))
    },[]);

    const handleCheck = (name) => {
        setChk(!chk)
        setCategoryData(name);
        console.log(categoryData);
    }

    const menuList = menuData.map(item => {

        if (item.children) {
            return(
                <li key={item.menuId} className="px-4">
                    <Link to={`${item.url}`}>{item.name}</Link>
                    {item.name === "Categories" ?
                        <ul className="mega-menu">
                            <li>
                                <ul>
                                    {item.children.map(subitem => (
                                        <li key={subitem.id} onClick={() => handleCheck(subitem.name)}><Link
                                            to={`${subitem.url}/${subitem.name}/reload`}><span
                                            className={chk ? "mark" : "checkmark"}></span>{subitem.name}</Link></li>

                                    ))}
                                </ul>
                            </li>
                        </ul>
                        : null
                    }
                </li>

            );
        } else {
            return(
                <li key={item.id} className="px-4"><Link to={item.url}>{item.name}</Link></li>
            );
        }
    });

    return(
        <div className="col-xl-6 col-lg-6 d-none d-lg-block">
            <div className=" main-menu  ">
                <nav>
                    <ul>
                        {menuList}
                    </ul>
                </nav>
            </div>
        </div>

    );
}