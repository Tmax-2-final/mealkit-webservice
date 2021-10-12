import React, {useState, useEffect} from 'react';

export default function Brand(){
  
    const [ newBrand, setNewBrand ] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:3005/brand")
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         setNewBrand(data);
    //     })
    //     //.catch(error => console.log(error))
    // },[]);

    const brandList = newBrand.map(item => (
        <div key={item.id} className="col-12 col-md-3">
            <div className="row">
                <div className="col-12 col-sm-4 brandImg"><i className={item.img}></i></div>
                <div className="col-12 col-sm-8">
                    <p className="brandTitle">{item.name}</p>
                    <p className="brandTxt">{item.content}</p>
                </div>
            </div>
        </div> 
    )).slice(0,4)

    return(
        <section id="brand">
            <div className="container">
                <div className="row">
                    {brandList}
                </div> 
            </div> 
        </section> 
    );
}