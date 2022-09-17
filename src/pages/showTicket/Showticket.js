import React, { useEffect, useState } from "react";
import classes from './Showticket.module.css';
import AvilablTickets from "./AvailableTickets";

const Showticket = () => {
  const [ticketList,setTicketList]=useState([]);
  let userId=localStorage.getItem("userId");
  const apiHandler=async()=>{
    try {
      const url = `http://localhost:8080/booked-api/byUserId/${userId}`;
      const res = await fetch(url);
      const response = await res.json();
      setTicketList(response);
      console.log(response);
    } catch (error) {
      console.error("error in bus search api: ", error);
      setTicketList([]);
    }
  }
  useEffect(()=>{
    apiHandler();

  },[]);

  return (
    <div className={classes.container}>
      {
        !!ticketList && ticketList?.length> 0 ?(
          <AvilablTickets ticketList={ticketList}/>
        ):(
            <div className={classes.note}>NO Tickets Available</div>
        )}

    </div>
  );
};

export default Showticket;
