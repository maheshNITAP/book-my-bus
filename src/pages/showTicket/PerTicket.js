import React, { useEffect, useState } from "react";
import Button from "../search/UI/Button";
import classes from './PerTicket.module.css';

const PerTicket=props=>{

    const[show,setShow]=useState(false);
    useEffect(()=>{
        if(props.status === "confirmed"){
          setShow(true);
        }
    });
   
    function refreshPage() {
      window.location.reload(false);
    }
    
    
    const clickHandler=async(event)=>{
        //api to change status of booked ticket in route table (Soft Delete)
        try {
            const url = `http://localhost:8080/booked-api/cancelTicket/${props.bookingId}`,
              body = JSON.stringify();
            console.log(body);
            const res = await fetch(url, {
              method: "PUT",
              headers: { "Content-Type": "application/json " },
              body,
            });
            const response = await res.json();
            console.log({ response });
          } catch (error) {
            console.error("error in ticket status changing", error);
          }

          //api to cancel the seats in bus(in Route table)
          try {
            const url = `http://localhost:8080/route-api/cancelSeats?origin=${props.startingStation}&destination=${props.destinationStation}&busId=${props.busId}&seatId=${props.seatId}&date=${props.date}`,
              body = JSON.stringify();
            console.log(body);
            const res = await fetch(url, {
              method: "PUT",
              headers: { "Content-Type": "application/json " },
              body,
            });
            const response = await res.json();
            console.log({ response });
            setShow(true);
          } catch (error) {
            console.error("error in cancelling the seats", error);
          }

          refreshPage();
    }

    const deleteHandler=async(event)=>{
      //api for delete Ticket (Hard Delete)
    try {
      const  url =`http://localhost:8080/booked-api/bookings/${props.bookingId}`,
        body = JSON.stringify();
        console.log(body);
      const res = await fetch(url, {
        method: "DELETE",headers:{'Content-Type':'application/json '},
        body,
      });
      const response = await res.json();
      console.log({ response }); 

    } catch (error) {
      console.error("error in Delete buses", error);
    }
    refreshPage();
    }


    
    return(
        <div className={classes.all}>
            <li className={classes.cont}>
                <div>
                    <div>
                    <div className={classes.rowone}>
                            <div  className={classes.colone}>Bus Name <div>{props.busName}</div></div>
                            <div  className={classes.coltwo}>Bus Number<div>{props.busNumber}</div></div>
                            <div className={classes.colthree}>Bus Type<div>{props.busType}</div> </div>
                            <div className={classes.colfoure}>Departure Station <div>{props.startingStation}</div> </div>
                            <div className={classes.colfive}>Arrival Station <div>{props.destinationStation}</div> </div>
                        </div>
                        <div className={classes.rowone}>
                            <div  className={classes.colone}>Traveler Name <div>{props.name}</div></div>
                            <div  className={classes.coltwo}>Seat Number<div>{props.seatId}</div> </div>
                            <div className={classes.colthree}> Departure Time<div>{props.departureTime}</div></div>
                            <div className={classes.colfoure}>ArrivalTime <div>{props.arrivalTime}</div></div>
                            <div className={classes.colfive}>Total Distance: <div>{props.totalDistance}</div></div>
                        </div>
                        
                        <div className={classes.rowfoure}>
                            <div className={classes.colone}>Ticket Status <div className={classes.status}>{props.status}</div></div>
                            <div className={classes.coltwo}>Date<div>{props.date}</div></div>
                            
                        </div>
                    </div>
                </div>
                {show?(<Button onClick={clickHandler}>Cancel Ticket</Button>):(<Button onClick={deleteHandler}>Delete</Button>)}
                
            </li>
        </div>
    )
};

export default PerTicket;