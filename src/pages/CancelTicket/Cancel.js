import React from "react";
import classes from './Cancel.module.css';

const Cancel= ()=>{
    return (
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.title1}> Cancel your Ticket</div>
            <div className={classes.title2}>Verify your details, and CANCEL your tickets</div>
          </div>
          <form className={classes.frm}>
          <div className={classes.total_form}>
          <div className={classes.type_from}>
            <label> TICKET NUMBER</label>
            <input type="text" placeholder="Enter your ticket number"  />
          </div>
          <div className={classes.type_to}>
          <label> E-MAIL</label>
            <input type="text" placeholder="Enter e-mail used for booking"  />
          </div>
          <div>
            <button className={classes.btn}>SUBMIT</button>
          </div>
        </div>
          </form>
        </div>
      );



};

export default Cancel;