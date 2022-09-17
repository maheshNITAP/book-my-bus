import React from "react";
import Card from "../../search/UI/Card";
import Routes from "./Routes";
import classes from './Allroute.module.css';


const Allroute=(props)=>{
const routeList=props.routeList.map((route)=>{

    return <Routes
    key={route.routeId}
    routeId={route.routeId}
    stationName={route.stationName}
    busId={route.busId}
    scheduleTime={route.scheduleTime}
    routeRank={route.routeRank}
    date={route.date}
    price={route.price}
    distance={route.distance}
    lat={route.lat}
    lng={route.lng}
    />
});

return <section className={classes.routes}>
    <Card>
    <div className={classes.rowone}>
            <div className={classes.colzero}>RouteId</div>
            <div className={classes.colone}>Bus Id</div>
            <div className={classes.coltwo}>Station Name</div>
            <div className={classes.colthree}>Route Rank</div>
            {/* <div className={classes.colfoure}>Date</div> */}
            <div className={classes.colfive}>Time</div>
            <div className={classes.colsix}>Price</div>
            <div className={classes.colseven}>Latitute</div>
            <div className={classes.coleight}>Longitute</div>
            <div className={classes.colnine}>distance</div>
            <div  className={classes.colten}></div>
            <div  className={classes.colele}></div>
        </div>
        <ul>{routeList}</ul>
    </Card>
</section>
}
export default Allroute;