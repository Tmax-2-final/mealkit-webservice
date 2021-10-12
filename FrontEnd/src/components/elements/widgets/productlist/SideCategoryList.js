import React, {useState} from 'react';

export default function SideCategoryList({data, setCategoryName, setSearch}) {

    const [chk, setChk] = useState(false)
    const [ inputStatus, setInputStatus] = useState('')

    const handleCheck = (name) => {
        setSearch(null)
        setChk(!chk)
        setChk(chk)
        setCategoryName(name)
    }

    return(
        <li>
            <div className="sidebar-widget-list-left">
                <button name="radioGroup" value={data.name} key={data.childId} onClick={()=>handleCheck(data.name)}><span className={chk ? "mark" : "checkmark"}></span>{data.name}</button>
            </div>
        </li>
    );
}