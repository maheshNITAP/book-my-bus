import React from "react";
import classes from './Formcard.module.css';

const Formcard= props=>{
    return <div className={`${classes.card} ${props.className}`}>{props.children}</div>
};
export default Formcard;