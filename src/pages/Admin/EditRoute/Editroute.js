import React, { useState,useEffect } from "react";
import Allroute from "./Allroute";
const Editroute=()=>{
    const [routeList,setRouteList]=useState([]);
    const today = new Date();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const todayDate =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    console.log(time);
    const apiHandler=async()=>{
        try {
            // const url = "http://localhost:8080/route-api/routes";
            const url = `http://localhost:8080/route-api/todayRoutes?date=${todayDate}`;
            const res = await fetch(url);
            const response = await res.json();
            setRouteList(response);
            console.log(response);
          } catch (error) {
            console.error("error in bus search api: ", error); 
            setRouteList([]);
          }
          console.log(routeList);
    }

    useEffect(()=>{
        apiHandler();
        console.log(routeList);
    },[]);

    return <div>
        {!!routeList && routeList.length>0 ?(
        <Allroute routeList={routeList}/>):(
        <div>****************No Route Exist*************</div>)}
    </div>
}
export default Editroute;