import { useState, useEffect } from "react";
import { Link, withRouter ,useHistory} from "react-router-dom";
import Button from "../search/UI/Button";
import {
  Dialog,
  DialogTitle,
  Grid,
  StylesProvider,
  TextField,
} from "@mui/material";
import classes from "./Addbus.module.css";
import Formcard from "./Formcard/Formcard";

const Addbus = () => {
  const [details, setDetails] = useState({
    busName: "",
    busNumber: "",
    busType: "",
    totalSeats: 0,
  });

  const [busDetails, setBusDetails] = useState();
  const [isCreated, setIsCreated] = useState(false);

  const busnameChangeHandler = (event) => {
    setDetails((prevState) => {
      return { ...prevState, busName: event.target.value };
    });
  };
  const busnumberChangeHandler = (event) => {
    setDetails((prevState) => {
      return { ...prevState, busNumber: event.target.value };
    });
  };
  const bustypeChangeHandler = (event) => {
    setDetails((prevState) => {
      return { ...prevState, busType: event.target.value };
    });
  };
  const totalseatsChangeHandler = (event) => {
    setDetails((prevState) => {
      return { ...prevState, totalSeats: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(details);
    try {
      const url = "http://localhost:8080/buses-api/save",
        body = JSON.stringify(details);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json " },
        body,
      });
      const response = await res.json();
      console.log({ response });
      setBusDetails(response);
      if (response) {
        setIsCreated(true);
      }
    } catch (error) {
      console.error("error in register", error);
    }
  };


  const addStopsHandler=(event)=>{

  }

  const renderForm = (
    // <div>
    //   <form onSubmit={submitHandler}>
    //     <label>Busname</label>
    //     <input
    //       type="text"
    //       name="busname"
    //       placeholder="Busname"
    //       onChange={busnameChangeHandler}
    //     />
    //     <label>Busnumber</label>
    //     <input
    //       type="text"
    //       name="busnumber"
    //       placeholder="Busnumber"
    //       onChange={busnumberChangeHandler}
    //     />
    //     <label>Bus Type</label>
    //     <input
    //       type="text"
    //       name="bustype"
    //       placeholder="Bus type"
    //       onChange={bustypeChangeHandler}
    //     />
    //     <label>Total Seats</label>
    //     <input
    //       type="text"
    //       name="totalseats"
    //       placeholder="total seats"
    //       onChange={totalseatsChangeHandler}
    //     />
    //     <input type="submit" value="ADD BUS" />
    //   </form>
    // </div>

    <div className={classes.cnt}>
      <div className={classes.title}>Add New Bus</div>
      <div>
        <form onSubmit={submitHandler}>
          <Grid container>
            <Grid xs={6}>
              <TextField
                type="text"
                name="busname"
                placeholder="Busname"
                label="Bus Name"
                className={classes.inputField}
                onChange={busnameChangeHandler}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                type="text"
                name="busnumber"
                placeholder="Busnumber"
                label="Bus Number"
                className={classes.inputField}
                onChange={busnumberChangeHandler}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                type="text"
                name="bustype"
                placeholder="Bus type"
                label="Bus Type"
                className={classes.inputField}
                onChange={bustypeChangeHandler}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                type="text"
                name="totalseats"
                placeholder="total seats"
                label="Total Seats"
                className={classes.inputField}
                onChange={totalseatsChangeHandler}
              />
            </Grid>
            <button className={classes.btn} type="submit">Add Bus</button>
          </Grid>
        </form>
      </div>
    </div>
  );

  return (
    <Formcard className={classes.input}>
      {isCreated ? (
        <div className={classes.msg}>
          <div >Bus is successfully created with bus id: {busDetails.busId}</div>
          <Link to="/Addbusroute">
          <button className={classes.btnn} >Add Stops</button>
          </Link>
        </div>
      ) : (
        localStorage.getItem("user") && renderForm
      )}
    </Formcard>
  );
};

export default Addbus;
