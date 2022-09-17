import React, { useState } from "react";
import Card from "../search/UI/Card";
import PerTicket from "./PerTicket";
import classes from './AvailableTickets.module.css';

const AvilablTickets=(props)=>{
    const ticketList=props.ticketList.map((ticket) =>{
        
        return <PerTicket
        key={ticket.bookingId}
        busId={ticket.busId}
        seatId={ticket.seatId}
        destinationStation={ticket.destinationStation}
        startingStation={ticket.startingStation}
        name={ticket.name}
        gender={ticket.gender}
        age={ticket.age}
        totalDistance={ticket.totalDistance}
        totalPrice={ticket.totalPrice}
        departureTime={ticket.departureTime}
        arrivalTime={ticket.arrivalTime}
        busName={ticket.busName}
        busNumber={ticket.busNumber}
        busType={ticket.busType}
        date={ticket.date}
        status={ticket.status}
        bookingId={ticket.bookingId}
        />
    });

    return <section className={classes.tickets}>
        <Card>
            <ul>{ticketList}</ul>
        </Card>
    </section>

};

export default AvilablTickets;