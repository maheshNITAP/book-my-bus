import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Grid,
  StylesProvider,
  TextField,
} from "@mui/material";
import Button from "../UI/Button";
import classes from "./Passengerform.module.css";

const Passengerform = (props) => {
  //const [selectedSeats, setSelectedSeat] = useState(props.selectedSeats);
  const [formFields, setFormFields] = useState(JSON.parse(props.initialStates));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { history } = props;

  //  console.log(detail);
  let busInfo = `<b>Bus Name:</b>${formFields[0].busName}

    <br><b>Bus Reg. No:</b>${formFields[0].busNumber}
    <br><b>Traveling Date:  </b>${formFields[0].date}

    <br><b>From:</b>${formFields[0].startingStation}&nbsp;&nbsp;<b>To:</b>${formFields[0].destinationStation}<br><br><br>`;

  let passengerTable = "";

  let passengerHeader = `<table style={border: 1px solid black;border-collapse: collapse;}>

    <tr>

    <th style={border: 1px solid black;border-collapse: collapse;}>Seat Number</th>

    <th style={border: 1px solid black;border-collapse: collapse;}>Passenger Name</th>

    <th style={border: 1px solid black;border-collapse: collapse;}>Age</th>

    <th style={border: 1px solid black;border-collapse: collapse;}>Gender</th></tr>`;

  let passengerTableInfo = "";

  formFields.map((info) => {
    passengerTableInfo =
      passengerTableInfo +
      `<tr>

     <td style={border: 1px solid black;border-collapse: collapse;}>${info.seatId}</td>

     <td style={border: 1px solid black;border-collapse: collapse;}>${info.name}</td>

     <td style={border: 1px solid black;border-collapse: collapse;}>${info.age}</td>

     <td style={border: 1px solid black;border-collapse: collapse;}>${info.gender}</td></tr>`;
  });

  let regards = `<br><br><br>
     <b> Thanks & Regards </b><br> <b>Team BusBook</b>`;

  passengerTable = [
    busInfo,
    passengerHeader,
    passengerTableInfo,
    "</table>",
    regards,
  ].join("");

  const email = {
    to: localStorage.getItem("email"),
    message: passengerTable,
  };
  console.log(email);

  const handleFormChange = (event, index) => {
    console.log("Index", index);
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    console.log("Data", data);
    setFormFields(data);
  };
  function refreshPage() {
    window.location.reload(false);
  }
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const submitHandler = async (event) => {
    event.preventDefault();


    let request = {
      flag:"true",
      origin:props.seatRequest.origin,
      destination:props.seatRequest.destination,
      busId:props.seatRequest.busId,
      seatNo:props.selectSeat,
      date:props.seatRequest.date
    
  }
  console.log("Final Seat data",request);

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

    //api for submitting booked ticket details
    try {
      const url = "http://localhost:8080/booked-api/bookedTicket",
        body = JSON.stringify(formFields);
      console.log(body);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json " },
        body,
      });
      const response = await res.json();
      console.log({ response });
    } catch (error) {
      console.error("error in ticket booking", error);
    }
    setIsSubmitted(true);
    //api for email ticket to user
    try {
      const url = "http://localhost:8080/Mail/sendemail",
        body = JSON.stringify(email);
      console.log(body);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json " },
        body,
      });
      const response = await res.json();
      console.log({ response });
    } catch (error) {
      console.error("error in ticket email", error);
    }
    console.log(formFields);

    await sleep(1000);
    refreshPage();
  };

  let totalPrice = props.price * props.selectedSeats.length;

  const renderForm = (
    <div className={classes.subbox}>
      <div className={classes.ttl}>Passenger Details</div>
      <div>
        {props.selectedSeats.map((x, index) => (
          <form onSubmit={submitHandler} key={index} className={classes.box}>
            {/* <div className={classes.evryinp}>
                <label>
                  Seat No.<span >{x}</span>
                </label>
              </div>
              <div className={classes.evryinp}>
                <label>Name</label>
                <div><input className={classes.input}
                  type="text"
                  name="name"
                  placeholder="Passenger details"
                  onChange={(event) => handleFormChange(event, index)}
                /></div>
              </div>
              <div className={classes.evryinp}>
                <label>Gender</label>
                <input className={classes.inp} type="text" placeholder="Gender" name="gender"
                onChange={(event) => handleFormChange(event, index)} 
                
                />
              </div>
              <div className={classes.evryinp}>
                <label>Age</label>
                <input className={classes.inp} type="text" placeholder="Age" name="age" 
                onChange={(event) => handleFormChange(event, index)}/> 
              </div> */}
            <Grid container>
              <Grid xs={6}>
                <TextField
                  className={classes.inputField}
                  type="text"
                  name="seatId"
                  placeholder="Seat Number"
                  label="Seat Number"
                  disabled
                  size="small"
                  value={x}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  className={classes.inputField}
                  type="text"
                  name="name"
                  placeholder="Passenger Name"
                  label="Passenger Name"
                  size="small"
                  onChange={(event) => handleFormChange(event, index)}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label="Gender"
                  className={classes.inputField}
                  size="small"
                  type="text"
                  placeholder="Gender"
                  name="gender"
                  onChange={(event) => handleFormChange(event, index)}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label="Age"
                  className={classes.inputField}
                  size="small"
                  type="text"
                  placeholder="Age"
                  name="age"
                  onChange={(event) => handleFormChange(event, index)}
                />
              </Grid>
            </Grid>
          </form>
        ))}
      </div>
      <div style={{fontSize: '12px', color: '#777', lineHeight: '30px'}}>
        <div>
          By clicking on pay, I agree that I have read and understood the TnCs
          and the Privacy Policy
        </div>
        <div>THIS BOOKING IS NON-REFUNDABLE</div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.lbl}>Total Amount:{totalPrice}</div>
        <div className={classes.bottm}>
          <Button onClick={submitHandler}>Pay and Go to home page</Button>
        </div>
      </div>
    </div>
  );
  return (
    <div className={classes.all}>
      {isSubmitted ? (
        <div className={classes.msg}>Seats successfully Booked</div>
      ) : (
        renderForm
      )}
    </div>
  );
};
export default Passengerform;
