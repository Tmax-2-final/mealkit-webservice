import React, {useState, useEffect} from 'react';
import SideCategoryList from './SideCategoryList';
import axios from 'axios';

export default function SideBar({setCategoryName, setSearch}) {

    const [categoryList, setCategoryList] = useState([]);




    const [inputData, setInputData] = useState([]);




    let process = require('../../../../myProcess.json');

    useEffect(()=>{
        axios.get("/catalog-service/children")
        .then(res => {
            console.log(res.data);
            setCategoryList(res.data)
        });

    },[]);

    useEffect(() =>{
        let lowerInputData = String(inputData).toLowerCase();
        setSearch(lowerInputData);
        console.log("테스트");
        console.log(inputData);
    }, [])


    const categoryLi = categoryList.map(item => (
        <SideCategoryList
            key={item.childId}
            data={item}
            setCategoryName = {setCategoryName}
            setSearch = {setSearch}
        />
    ))
    console.log(categoryLi);

    const searchDataHandler = (e) => {
        e.preventDefault();
        setInputData(e.target.value);

        let lowerInputData = String(inputData).toLowerCase();
        setSearch(lowerInputData)
        console.log(inputData);

    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(inputData);
        setInputData(e.target.value);
        setSearch(inputData);
        console.log(inputData);

        // let body = {
        //     searchData: searchData
        // };
    };

    const noActionHandler = (e) => {
        e.preventDefault();
    }

    //     axios.post("/catalog-service/productlist", body, {
    //         headers : {
    //             'Accept' : 'application/json',
    //             'Content-Type' : 'application/json;charset=UTF-8'
    //         }
    //     })
    //     .then(response => {
    //         console.log(response.data);
    //         setCategoryList(response.data);
    //     })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }



    return(
        <div className="col-lg-3 order-2 order-lg-1">
            <div className="sidebar-style mr-30">
                <div className="sidebar-widget">
                    <h4 className="pro-sidebar-title">Search </h4>
                    <div className="pro-sidebar-search mb-50 mt-25">

                        <form className="pro-sidebar-search-form" onSubmit={noActionHandler}>
                            <input
                                value={inputData}
                                type="text"
                                placeholder="Search here..."
                                onChange={submitHandler}

                            />
                            <button ><i className="pe-7s-search"></i></button>

                        </form>
                    </div>
                </div>
                <div className="sidebar-widget">
                    <h4 className="pro-sidebar-title">Categories </h4>
                    <div className="sidebar-widget-list mt-30">
                        <ul>
                            
                            {categoryLi}
                            
                        </ul>
                    </div>
                </div>
                <div className="sidebar-widget mt-50">
                    {/*<h4 className="pro-sidebar-title">Tag </h4>*/}
                    <div className="sidebar-widget-tag mt-25">
                        {/*<ul>*/}
                        {/*    <li><button>아프니깐 청춘이다.</button></li>*/}
                        {/*    <li><button>훈이의 Cisco Networking</button></li>*/}
                        {/*    <li><button>남곤이 짱</button></li>*/}
                        {/*    <li><button>지웅이 짱</button></li>*/}
                        {/*    <li><button>women</button></li>*/}
                        {/*    <li><button>coat</button></li>*/}
                        {/*    <li><button>top</button></li>*/}
                        {/*    <li><button>sleeveless</button></li>*/}
                        {/*    <li><button>electronics</button></li>*/}
                        {/*    <li><button>furniture</button></li>*/}
                        {/*    <li><button>plant</button></li>*/}
                        {/*    <li><button>organic food</button></li>*/}
                        {/*    <li><button>flower</button></li>*/}
                        {/*    <li><button>book</button></li>*/}
                        {/*    <li><button>cosmetics</button></li>*/}
                        {/*    <li><button>accessories</button></li>*/}
                        {/*    <li><button>handmade</button></li>*/}
                        {/*    <li><button>kids</button></li>*/}
                        {/*    <li><button>auto parts</button></li>*/}
                        {/*    <li><button>cakes</button></li>*/}
                        {/*    <li><button>pet food</button></li>*/}
                        {/*    <li><button>medical</button></li>*/}
                        {/*    <li><button>black friday</button></li>*/}
                        {/*    <li><button>christmas</button></li>*/}
                        {/*</ul>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}