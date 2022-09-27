import React from "react";
import Card from "../../search/UI/Card";
import Bus from "./Bus";
import classes from './Allbus.module.css';

const Allbus=(props)=>{
const busList=props.busList.map((bus)=>{

    return<Bus
    Key={bus.busId}
    busId={bus.busId}
    busName={bus.busName}
    busType={bus.busType}
    totalSeats={bus.totalSeats}
    busNumber={bus.busNumber}
    />

});

return <section className={classes.buses}>
    <Card>
        <div className={classes.rowone}>
        <div className={classes.colzero}>BusId</div>
            <div className={classes.colone}>Bus Name</div>
            <div className={classes.coltwo}>Bus Number</div>
            <div className={classes.colthree}>Bus Type</div>
            <div className={classes.colfoure}>Total Seats</div>
            <div  className={classes.colfive}>Edit Bus</div>
            <div  className={classes.colsix}>Delete Bus</div>
            <div  className={classes.colseven}>Bus Location</div>
        </div>
        <ul>{busList}</ul>
    </Card>
</section>
};
export default Allbus;