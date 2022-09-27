import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "../search/UI/Button";
import classes from "./Register.module.css";

const Login = (props) => {
  console.log(props);
  const { history } = props;
  const [details, setDetails] = useState({ username: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(details);
    try {
      const res = await fetch("http://localhost:8080/user-api/login", {
        body: JSON.stringify(details),
        method: "POST",
        headers: { "Content-Type": "application/json " },
      });
      const response = await res.json();
      console.log({ response });
      if (response && response.length > 0) {
        localStorage.setItem("user", JSON.stringify(response[0]));
        localStorage.setItem("userId", JSON.stringify(response[0].userId));
        localStorage.setItem(
          "userBookinglist",
          JSON.stringify(response[0].bookingList)
        );
        localStorage.setItem("role", response[0].role);
        localStorage.setItem("email", response[0].email);
        history.push("/");
      } else {
        alert("Enter correct username and Password");
      }
    } catch (error) {
      console.error("error in login: ", error);
    }

    // setIsSubmitted(true);
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

  const gotoRegister = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  const renderForm = (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <div className={classes.inputcont}>
            <input
              type="text"
              name="username"
              placeholder="usename"
              required
              onChange={usernameChangeHandler}
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
          <Button id="3" type="submit">
            Login
          </Button>
        </div>
      </form>
      <p className={classes.lnk}>
        Not Registered?{" "}
        <a id="4" onClick={gotoRegister}>
          Register Here
        </a>
      </p>
    </div>
  );
  return (
    <div className={classes.app}>
      <div className={classes.login}>
        <div className={classes.title}>Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
};

export default withRouter(Login);
