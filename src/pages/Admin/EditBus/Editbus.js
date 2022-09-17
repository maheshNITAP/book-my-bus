import axios from "axios";
import React, { useEffect, useState } from "react";
import Allbus from "./Allbus";
import classes from './EditBus.module.css';

const Editbus=()=>{
    const [busList,setBusList]=useState([]);
    const apiHandler=async()=>{
        try {
            const url = "http://localhost:8080/buses-api/buses";
            const res = await fetch(url);
            const response = await res.json();
            setBusList(response);
            //console.log(response);
          } catch (error) {
            console.error("error in bus search api: ", error); 
            setBusList([]);
          }
          //console.log(busList);
    }
    
    useEffect(()=>{
        apiHandler();
        console.log(busList);
    },[]);
    //console.log(busList);
    
    return(
        <div>
          {!!busList && busList?.length>0 ?(
          
          <Allbus busList={busList}/>
          ):(
            <div>*********No Buses Exist**********</div>
          )}
        </div>
    );
    
    
};
export default Editbus;