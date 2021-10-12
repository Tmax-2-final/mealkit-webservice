import React, {useState} from 'react';

export default function FooterMenu({footerMenuList, footerMenuTitle}){

    const [newList, setNewList] = useState(footerMenuList);
    const menuList = newList.map(item => (
        <li key={item.id}>{item.name}</li>
    ))

    return(
        <div className="col-12 col-md-2">
            <p className="menuTitle">{footerMenuTitle}</p>
            <ul>
                {menuList}
            </ul>
        </div>
    );
}