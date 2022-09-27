import React from "react";
import Button from "../UI/Button";
import classes from "./Perbus.module.css";
import { useState } from "react";
import Seat from "../Seat/Seat";

const PerBus = (props) => {
  const [availableSeats, setAvailbleSeats] = useState([]);
  const [show, setShow] = useState(false);

  const price = `₹${props.price}`;

  const clickHandler = async (event) => {

    //api for searching available seats
    try {
      const url = `http://localhost:8080/route-api/AvailableSeats?origin=${props.fromLocation}&destination=${props.toLocation}&busId=${props.busId}&date=${props.date}`;
      const res = await fetch(url);
      const response = await res.json();
      setShow(true);
      setAvailbleSeats(response);
    } catch (error) {
      console.error("error in bus search api: ", error);
      setAvailbleSeats([]);
    }
    console.log(availableSeats);
  };

  return (
    <div className={classes.all}>
      <li className={classes.cont}>
        {/* <div>
        <div>Bus Name: {props.busName}</div>
        <div>Bus Number: {props.busNumber}</div>
        <div> bus id:{props.busId}</div>
        <div> Bus Type :{props.busType}</div>
        <div> Starting Station:{props.source}</div>
        <div>Depo Station:  {props.destination}</div>
        <div>Total Seats :{props.totalSeats} </div>
        <div className={classes.price}>{price}</div>
        <div> Pickup Station:{props.fromLocation}</div>
        <div>Drop Station:  {props.toLocation}</div>
      </div>
        <div className={classes.btn}>
         <Button onClick={clickHandler} >Seat</Button> 
       </div>   */}
        <div>
          <div>
            <div className={classes.rowone}>
              <div  className={classes.colone}>Bus Name <div>{props.busName}</div></div>
              <div  className={classes.coltwo}>Bus Number <div>{props.busNumber}</div></div>
              <div className={classes.colthree}>Departure Time <div>{props.departureTime}</div> </div>
              <div className={classes.colfoure}>Arrival Time <div>{props.arrivalTime}</div> </div>
              <div className={classes.colfive}>Total Distance: <div>{props.distance}</div></div>
            </div>
            <div className={classes.rowone}>
              <div className={classes.colone}>Bus Type <div>{props.busType}</div></div>
              <div className={classes.coltwo}>Total Seats <div>{props.totalSeats}</div></div>
              <div className={classes.colthree}>Pickup Station<div>{props.fromLocation}</div></div>
              <div className={classes.colfoure}>Drop Station <div>{props.toLocation}</div></div>
              <div className={classes.colfive}>Price <div>{props.price}</div></div>
            </div>
          </div>
          <div>
            <Button id="9" onClick={clickHandler}>View Seat</Button>
            <Button onClick={() => setShow(false)}>Hide Seat</Button>
          </div>
        </div>
        <div>
          {show ? (
            <div>
              <Seat
                busId={props.busId}
                fromLocation={props.fromLocation}
                toLocation={props.toLocation}
                totalSeats={props.totalSeats}
                availableSeats={availableSeats}
                price={props.price}
                distance={props.distance}
                startingStation={props.fromLocation}
                destinationStation={props.toLocation}
                arrivalTime={props.arrivalTime}
                departureTime={props.departureTime}
                busName={props.busName}
                busNumber={props.busNumber}
                busType={props.busType}
                date={props.date}
              />
            </div>
          ) : null}
        </div>
      </li>
      
    </div>
  );
};

export default PerBus;
