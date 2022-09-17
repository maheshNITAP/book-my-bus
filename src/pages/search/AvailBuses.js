import React from "react";
import classes from "./AvailBuses.module.css";
import PerBus from "./Perbus/Perbus";
import Card from "./UI/Card";
import Button from "./UI/Button";

const AvailBuses = (props) => {
  const busesList = props.busDataSearchList.map((bus) => {
    let price = 0;
    let distance = 0;
    let startCounting = false;
    let departureTime;
    let arrivalTime;
    if (bus) {
      const routeList = bus.routeList.sort((a, b) =>
        a.routeRank>b.routeRank
      );
      //console.log(routeList);
      if (routeList?.length) {
        routeList.forEach((route) => {
          if (startCounting) {
            price += route.price;
            distance += route.distance;
          }
  
          if (route.stationName === props.fromLocation) {
            startCounting = true;
            departureTime=route.scheduleTime;
          }
          if (route.stationName === props.toLocation) {
            startCounting = false;
            arrivalTime=route.scheduleTime;
          }
        });
      }
    }
    
    return  <PerBus
      key={bus.busId}
      busId={bus.busId}
      busNumber={bus.busNumber}
      busName={bus.busName}
      busType={bus.busType}
      source={bus.routeList[0]?.stationName}
      destination={bus.routeList[bus.routeList.length - 1]?.stationName}
      totalSeats={bus.totalSeats}
      price={price}
      distance={distance}
      fromLocation={props.fromLocation}
      toLocation={props.toLocation}
      departureTime={departureTime}
      arrivalTime={arrivalTime}
      date={props.date}
     
    />
    
});
  return (
    <section className={classes.buses}>
      <Card>
        <ul>{busesList}</ul>
      </Card>
    </section>
  );
};

export default AvailBuses;
