import React, { useState } from "react";
import {  Dialog, DialogTitle, Grid, StylesProvider, TextField } from "@mui/material";
import Button from "../search/UI/Button";
import classes from "./Addbusroute.module.css";
import Formcard from "./Formcard/Formcard";

const Addbusroute = (props) => {

  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const todayDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  console.log(time);
  const { history } = props;
  const [formFields, setFormFields] = useState([
    {
      busId: "",
      stationName: "",
      routeRank: "",
      distance: "",
      price: "",
      scheduleTime: "",
      date: todayDate,
      lat:"",
      lng:"",
    },
  ]);

  


  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = async (e) => {
    e.preventDefault();

    //api for adding the stops 
    try {
      const url = "http://localhost:8080/route-api/assignRoutes",
        body = JSON.stringify(formFields);
      console.log(body);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json " },
        body,
      });
      const response = await res.json();
      console.log({ response });
       history.push("/EditBus");
    } catch (error) {
      console.error("error in route assigning", error);
    }

    console.log(formFields);
  };

  const addFields = () => {
    let object = {
      busId: "",
      stationName: "",
      routeRank: "",
      distance: "",
      price: "",
      scheduleTime: "",
      date: todayDate,
      lat:"",
      lng:"",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  return (
    <Formcard>
      <form onSubmit={submit}>
      <div className={classes.title}>Bus Stops</div>
        {formFields.map((form, index) => {
          return (
            // <div key={index} className={classes.input}>
            //   <label>Bus id</label>
            //   <input
            //     type="text"
            //     name="busId"
            //     placeholder="BusId"
            //     onChange={(event) => handleFormChange(event, index)}
            //     value={form.busId}
            //   />
            //   <label>station Name</label>
            //   <input
            //     type="text"
            //     name="stationName"
            //     placeholder="Station Name"
            //     onChange={(event) => handleFormChange(event, index)}
            //     value={form.stationName}
            //   />
            //   <label>Route rank</label>
            //   <input
            //     type="text"
            //     name="routeRank"
            //     placeholder="Route Rank"
            //     onChange={(event) => handleFormChange(event, index)}
            //     value={form.routeRank}
            //   />
            //   <label>Distance</label>
            //   <input
            //     type="text"
            //     name="distance"
            //     placeholder="Distance"
            //     onChange={(event) => handleFormChange(event, index)}
            //     value={form.distance}
            //   />
            //   <label>Price</label>
            //   <input
            //     type="text"
            //     name="price"
            //     placeholder="Price"
            //     onChange={(event) => handleFormChange(event, index)}
            //     value={form.price}
            //   />
            //   <label>scheduleTime</label>
            //   <input
            //     type="time"
            //     name="scheduleTime"
            //     onChange={(event) => handleFormChange(event, index)}
            //     value={form.scheduleTime}
            //   />
            //   <label>scheduleDate</label>
            //   <input
            //     type="date"
            //     name="date"
            //     onChange={(event) => handleFormChange(event, index)}
            //     value={form.date}
            //   />
            //   <Button onClick={() => removeFields(index)}>Remove</Button>
            // </div>

            <div className={classes.cnt}>
              
              <Grid container key={index} className={classes.input}>
              <Grid xs={4} >
              <TextField
                type="text"
                name="busId"
                placeholder="BusId"
                label="Bus Id"
                className={classes.inputField}
                onChange={(event) => handleFormChange(event, index)}
                value={form.busId}
              />
              </Grid>
              <Grid xs={4} >
              <TextField
                type="text"
                name="stationName"
                placeholder="Station Name"
                label="Station Name"
                className={classes.inputField}
                onChange={(event) => handleFormChange(event, index)}
                value={form.stationName}
              />
              </Grid>
              <Grid xs={4} >
              <TextField
                type="text"
                name="routeRank"
                placeholder="Route Rank"
                label="Route Rank"
                className={classes.inputField}
                onChange={(event) => handleFormChange(event, index)}
                value={form.routeRank}
              />
              </Grid>
              <Grid xs={4} >
              <TextField
                type="text"
                name="distance"
                placeholder="Distance"
                label="Distance"
                className={classes.inputField}
                onChange={(event) => handleFormChange(event, index)}
                value={form.distance}
              />
              </Grid>
              <Grid xs={4} >
              <TextField
                type="text"
                name="price"
                placeholder="Price"
                label="Price"
                className={classes.inputField}
                onChange={(event) => handleFormChange(event, index)}
                value={form.price}
              />
              </Grid>
              <Grid xs={4} >
              <TextField
                type="time"
                name="scheduleTime"
                label="Schedule Time"
                className={classes.inputField}
                onChange={(event) => handleFormChange(event, index)}
                value={form.scheduleTime}
              />
              </Grid>
              {/* <Grid xs={4} >
              <TextField
                type="date"
                name="date"
                
                className={classes.inputField}
                onChange={(event) => handleFormChange(event, index)}
                value={form.date}
              />
              </Grid> */}
              <Grid xs={4} >
              <TextField
                type="text"
                name="lat"
                label="Latitude"
                className={classes.inputField}
                onChange={(event) => handleFormChange(event, index)}
                value={form.lat}
              />
              </Grid>
              <Grid xs={4} >
              <TextField
                type="text"
                name="lng"
                label="Longitude"
                className={classes.inputField}
                onChange={(event) => handleFormChange(event, index)}
                value={form.lng}
              />
              </Grid>
              <Grid xs={4} >
              <button className={classes.btn}  onClick={() => removeFields(index)}>Remove</button>
              </Grid>
            </Grid>
            </div>
          );
        })}
      </form>
      <button className={classes.btn}  onClick={addFields}>Add More..</button>
      <br />
      <button className={classes.btn} onClick={submit}>Submit</button>
    </Formcard>
  );
};

export default Addbusroute;
