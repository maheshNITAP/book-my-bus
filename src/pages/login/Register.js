import React, { Fragment, useEffect, useState } from "react";
import classes from "./Register.module.css";
import Button from "../search/UI/Button";
import { withRouter } from "react-router-dom";

const Register = (props) => {
  const{ history }=props;
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    role:"user"
  });

  
  const [registermsg, setRegistermsg] = useState([]);
  const [errormsg, setErrormsg] = useState([]);
  const [error, setError] = useState(false);
  const [register, setRegister] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(details);
    
    try {
      const url = "http://localhost:8080/user-api/save",
        body = JSON.stringify(details);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json " },
        body,
      });
      const response = await res.json();
      console.log({ response });
      
    } catch (error) {
      console.error("error in register", error);
    }
    history.push('/login');
    //setIsSubmitted(true);
  };
  const usernameChangeHandler = (event) => {
    setDetails((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };

  const passwordChangeHandler = (event) => {
    setDetails((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const emailChangeHandler = (event) => {
    setDetails((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const renderForm = (
    <div className={classes.frm}>
      <form onSubmit={submitHandler}>
        <div>
          <div className={classes.inputcont}>
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              onChange={usernameChangeHandler}
            />
          </div>
          <br></br>
          <div className={classes.inputcont}>
            <input
              type="text"
              name="email"
              placeholder="email"
              required
              onChange={emailChangeHandler}
            />
          </div>
          <br></br>
          <div className={classes.inputcont}>
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              onChange={passwordChangeHandler}
            />
          </div>
        </div>
        <div className={classes.buttoncont}>
          <Button id="5" type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
  return (
    <div className={classes.app}>
      <div className={classes.login}>
        <div className={classes.title}> SignUp</div>
        {isSubmitted ? <div>User is successfully Registerd</div> : renderForm}
      </div>
    </div>
  );
};
export default withRouter(Register);
