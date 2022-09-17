import React, { useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Location from "./Location";

const GMaps = (props) => {


  
  return (
    <div>
      <Map
        google={props.google}
        style={{ width: "100%", height: "100%" }}
        center={{ lat: props.lat, lng: props.lng }}
        initialCenter={{ lat: props.lat, lng: props.lng }}
        zoom={11}
      > 
        <Marker center={{ lat: props.lat, lng: props.lng }}
        initialCenter={{ lat: props.lat, lng: props.lng }} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyC9dH5vH6KC-fupASL6RDu3sRDbG1pumqQ",
})(GMaps);
