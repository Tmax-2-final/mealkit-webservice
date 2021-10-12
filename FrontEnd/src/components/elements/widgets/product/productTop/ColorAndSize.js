import React, {useState, useEffect} from 'react';

export default function ColorAndSize({vData, setColor, setSize}) {

    const [isCheck, setIsCheck] = useState(false);
    const [sizeDatas, setSizeDatas] = useState([]);

    function toggleCheck(e) {
        setIsCheck(!isCheck);
        alert(e.target.value)
    }

    var process = require('../../../../../myProcess.json');

    useEffect(()=>{
        fetch(`http://${process.IP}:${process.PORT}/size`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setSizeDatas(data);
            console.log(data.variation);
        });
    },[process.IP, process.PORT]);



    return(
        <div className="pro-details-size-color">
            <div className="pro-details-color-wrap">
                <span>Color</span>
                <div className="pro-details-color-content">
                   {  
                        vData ? vData.map( (item, index) => (
                            <label key={index} className={`pro-details-color-content--single ${item.color}`}>
                                <input type="radio" name="product-color" value={item.color} checked={isCheck} onClick={()=>setColor(item.color)}/>
                                <span className="checkmark"></span>
                            </label>
                        ))
                        : <p style={{fontSize:"0.7rem"}}>no color</p>
                   }
                </div>
            </div>
            <div className="pro-details-size">
                <span>Size</span>
                <div className="pro-details-size-content">  
                {
                    sizeDatas.map(item => (
                        <label className="pro-details-size-content--single">
                            <input type="radio" value={item.name} onClick={()=>setColor(item.color)}/>
                            <span className="size-name">{item.name}</span>
                        </label>
                    ))
                }  
                    
                </div>
            </div>
        </div>
    );
}