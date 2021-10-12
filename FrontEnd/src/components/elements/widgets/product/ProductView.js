import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Rating from '../../ui/Rating';
import axios from 'axios';
import Pagination from "../../ui/Pagination";

export default function ProductView({categoryName, sliceNumber, columNumber, search, setSearch, currentList}){
    console.log(categoryName);
    console.log(search);
    let process = require('../../../../myProcess.json');

    console.log("===searchData====");

    return(

        <div className="row mt-5">
            {currentList}
        </div>

);
}