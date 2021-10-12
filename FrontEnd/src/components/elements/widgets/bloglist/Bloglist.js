import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Bloglist(){

    const [newBlogData , setNewBlogData] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:3005/blog")
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         setNewBlogData(data);
    //     })
    //     //.catch(error => console.log(error))
    // },[]);

    useEffect(() => {
        axios.get("catalog-service/catalogs")
            .then(res => {
                setNewBlogData(res.data);;

                console.log(res.data);
            })
    },[]);



    const blogList = newBlogData.map(item => (
        <div key={item.id} className="col-12 col-md-4 mb-4">
            <Link to={`/blogdetail/${item.id}`}><div className="blogImg" style={{backgroundImage:`url(https://bookstore-image.s3.us-east-2.amazonaws.com/${item.image})`,backgroundSize:"cover"}}></div></Link>
            <div className="blogTxt">
            <Link to={`/blogdetail/${item.id}`}><p className="blogTitle">{item.name}</p></Link>
            <Link to={`/authordetail/${item.author}`}><p className="blogAuth">지은이 : {item.author}</p></Link>
            </div>
        </div>
    )).slice(0,3)


    return(
        <div className="row mt-5">
            {blogList}
        </div>
    );
}