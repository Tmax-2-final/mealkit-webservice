import React, {useState, useEffect} from 'react';
import SideCategoryList from '../productlist/SideCategoryList';
import axios from 'axios';

export default function SidePackage({setCategoryName, setSearch}) {

    const [categoryList, setCategoryList] = useState([]);

    const [inputData, setInputData] = useState([]);

    useEffect(()=>{
        axios.get("/catalog-service/package")
        .then(res => {
            console.log(res.data);
            setCategoryList(res.data)
        });

    },[]);

    useEffect(() =>{
        // let lowerInputData = String(inputData).toLowerCase();
        // setSearch(lowerInputData);
        // console.log("테스트");
        // console.log(inputData);
    }, [])


    const categoryLi = categoryList.map(item => (
        <SideCategoryList
            key={item.childId}
            data={item}
            setCategoryName = {setCategoryName}
            setSearch = {setSearch}
            setInputData = {setInputData}
        />
    ))

    const searchDataHandler = (e) => {
        e.preventDefault();
        setInputData(e.target.value);

        let lowerInputData = String(inputData).toLowerCase();
        setSearch(lowerInputData)

    }

    const submitHandler = (e) => {
        e.preventDefault();
        setInputData(e.target.value);
    };

    const noActionHandler = (e) => {
        e.preventDefault();
    }

    const searchHandler = (e) => {
        e.preventDefault();
        setSearch(inputData);
    }

    return(
        <div className="col-lg-3 order-2 order-lg-1">
            <div className="sidebar-style mr-30">
                <div className="sidebar-widget">
                    <h4 className="pro-sidebar-title">Search </h4>
                    <div className="pro-sidebar-search mb-50 mt-25">

                        <form className="pro-sidebar-search-form" 
                            //onSubmit={noActionHandler}
                        >
                            <input
                                value={inputData}
                                type="text"
                                placeholder="Search here..."
                                onChange={submitHandler}

                            />
                            <button class="btn btn-primary" 
                                onClick={searchHandler}
                            >
                                조회
                            <i className="las la-search ml-2" /></button>

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
                    <div className="sidebar-widget-tag mt-25">
                    </div>
                </div>
            </div>
        </div>
    );
}