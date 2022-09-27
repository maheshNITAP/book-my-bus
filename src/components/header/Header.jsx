import React, { useEffect, useState } from "react";
import { Link, withRouter ,useHistory} from "react-router-dom";
import classes from "./Header.module.css";

const Header = (props) => {

  const { history } = props;

  function refreshPage() {
    window.location.reload(false);
  }
  const logOutHandler=()=>{
    localStorage.clear();
    //refreshPage();
    history.push('/');

  }

  return (
    <>
      <header className={classes.header}>
        <Link to="/" underline="none" >
          <h1>BusBook</h1>
        </Link>
        <div className={classes.btn}>
          <Link to="/">
            {" "}
            <button className={classes.btnn}>Help</button>
          </Link>
          {/* <Link to="/SearchBus">
            {" "}
            <button>Manage Booking</button>
          </Link> */}

            {localStorage.getItem("role") === 'admin' && <div className={classes.dropdown}>
              <button  className={classes.btnn}>Admin Access</button>
              <div className={classes.dropdown_content}>
              <Link to="/Addbus">{" "}<div>Add Bus</div></Link>
              <Link to="/Addbusroute">{" "}<div>Add stops</div></Link>
              <Link to="/EditBus">{" "}<div>Edit Bus</div></Link>
              <Link to="/Editroute">{" "}<div>Edit Stops</div></Link>
              </div>
            </div>}
            {localStorage.getItem("user")?(<span>
            <div className={classes.dropdown}>
              <button  className={classes.btnn}>Manage Booking</button>
              <div className={classes.dropdown_content}>
              <Link to="/showticket">{" "}<div>Show My Ticket</div></Link>
              <Link to="/email">{" "}<div>Email/SMS</div></Link>
              <Link to="/cancel">{" "}<div>Cancle Ticket</div></Link>
              </div>
            </div>
            <Link to="/"><button id="1"  className={classes.btnn} onClick={logOutHandler}>logout</button></Link>
            </span>):null}
          <Link to="/login">
            {" "}
            {!localStorage.getItem("user") && <button id="2" className={classes.btnn}>Signin</button>}
            
          </Link>
        </div>
      </header>
    </>
  );
};
export default withRouter(Header);
