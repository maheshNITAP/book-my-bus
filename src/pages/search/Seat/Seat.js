import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import classes from "./Seat.module.css";
import Modal from "react-modal";
import models from "./Modal.module.css";
import Passengerform from "./Passengerform";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

{
  /* <div>AllSeats</div>
        <div>totalSeats: {totalSeats}</div>
        <div>{props.fromLocation}</div>
        <div>{props.toLocation}</div>
        <div>Available Seats:{availableSeats}</div> */
}
//   <div>{seat}</div>
//   <div>Available Seats:{availableSeats}</div>

//     function range(start, end) {
//         return Array(end - start + 1)
//         .fill()
//         .map((_, idx) => start + idx);
//     }
//     const totalseat = range(1, props.totalSeats);
//      console.log(totalseat);

//const url = `http://localhost:8080/route-api/bookingSeats?origin=${props.fromLocation}&destination=${props.toLocation}&busId=${props.busId}`
const Seat = (props) => {
  const [availableSeats, setAvailbleSeats] = useState(props.availableSeats);
  const [selectSeat, setSelectSeat] = useState([]);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [seatRequest,setSeatRequest]=useState();

  const clickHandler = async (event) => {
    event.preventDefault();
    //await setSeatDetails();
    console.log(props.date);
    let request = {
        flag:"false",
        origin:props.fromLocation,
        destination:props.toLocation,
        busId:props.busId,
        seatNo:selectSeat,
        date:props.date
      
    }
    setSeatRequest(request);
    console.log("Request Data"+request);
    //api for booking the seat in db
    try {
      const url = "http://localhost:8080/route-api/bookingSeats"
       // body = JSON.stringify({List:selectSeat});
      // console.log(body);
      //JSON.stringify(data)
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json " },
        body:JSON.stringify(request)
      });
      const response = await res.json();
      console.log({ response });
    } catch (error) {
      console.error("error in seat booking", error);
    }
    setIsOpen(!isOpen);
  };
  const outHandler = () => {
    setIsOpen(!isOpen);
  };


  function add(x) {
    if (selectSeat.includes(x)) {
      setSelectSeat(selectSeat.filter((y) => y !== x));
      
      
    } else {
      setSelectSeat([...selectSeat, x]);
    }
    
  }
  useEffect(() => {
    if (selectSeat?.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  console.log(localStorage.getItem("userId"));
  let userId=localStorage.getItem("userId");
  let status="confirmed";
  


  return (
    <div className={classes.seat}>
      <div>
        {availableSeats.map((x, index) => (
          <span 
            key={index}
            onClick={() => add(x)}
            className={selectSeat.includes(x) ? classes.color : classes.perseat}
          >
            {x}
          </span>
        ))}
      </div>
      {show ? (
        <div className={classes.bookbtn}>
          <div>
            <label>Boarding Station:</label>
            {props.fromLocation}
          </div>
          <div>
            <label>Dropping Station:</label>
            {props.toLocation}
          </div>
          <div>
            <label>BusId:</label>
            {props.busId}
          </div>
          <div>
            Seats:
            {selectSeat.map((x) => (
              <span>{x},</span>
            ))}
          </div>
          {localStorage.getItem("user")?(<Button onClick={clickHandler}>Book</Button>):(<div><Link to="/login">Login for Booking</Link></div>)}
          <Modal
            className={models.model}
            isOpen={isOpen}
            onRequestClose={outHandler}
            contentLabel="My dialog"
            overlayClassName={models.myoverlay}
          >
            {
              <Passengerform
              
                selectedSeats={selectSeat}
                initialStates={
                  selectSeat &&
                  JSON.stringify(
                    selectSeat.map((x) => ({
                      seatId: x,
                      name: "",
                      gender: "",
                      age: "",
                      busId: props.busId,
                      userId: userId,
                      totalPrice:props.price,
                      totalDistance:props.distance,
                      startingStation:props.startingStation,
                      destinationStation:props.destinationStation,
                      arrivalTime:props.arrivalTime,
                      departureTime:props.departureTime,
                      busName:props.busName,
                      busNumber:props.busNumber,
                      busType:props.busType,
                      date:props.date,
                      status:status 
                    }))
                  )
                }
                price={props.price}
                seatRequest={seatRequest}
                selectSeat={selectSeat}
              />
            }
          </Modal>
        </div>
      ) : null}
    </div>
  );
};

export default Seat;
