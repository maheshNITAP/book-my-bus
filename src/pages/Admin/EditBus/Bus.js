import React, { useState } from "react";
import {  Dialog, DialogTitle, Grid, StylesProvider, TextField } from "@mui/material";

import Button from "../../search/UI/Button";
import classes from "./Bus.module.css";
import Modal from "react-modal";
import models from "./Modal.module.css";
import GMaps from "../../GMaps/GMaps";
import mapstyles from "./GMapsModal.module.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

Modal.setAppElement("#root");

const Bus = (props) => {
  const [busData, setBusData] = useState({
    busId: props.busId,
    busName: props.busName,
    busType: props.busType,
    totalSeats: props.totalSeats,
    busNumber: props.busNumber,
  });
  console.log(busData);
  const [isOpen, setIsOpen] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const todayDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  console.log(time);

  function locationToggleModal() {
    setShowLocation(!showLocation);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
    //console.log("changed busData",busData);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    //console.log(busData);

    //api for edit bus Details
    try {
      const url = "http://localhost:8080/buses-api/updateBus",
        body = JSON.stringify(busData);
      console.log(body);
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json " },
        body,
      });
      const response = await res.json();
      console.log({ response });
    } catch (error) {
      console.error("error in Updating buses", error);
    }
    toggleModal();
    refreshPage();
  };

  const deleteHandler = async (event) => {
    //api for delete bus
    try {
      const  url =`http://localhost:8080/buses-api/buses/${props.busId}`,
        body = JSON.stringify();
        console.log(body);
      const res = await fetch(url, {
        method: "DELETE",headers:{'Content-Type':'application/json '},
        body,
      });
      const response = await res.json();
      console.log({ response });

    } catch (error) {
      console.error("error in Delete buses", error);
    }
    refreshPage();
  };

  const locationHandler = async (event) => {
    //api for lat and long for bus location on gMaps
    try {
      const url = `http://localhost:8080/route-api/mapsApi?busId=${props.busId}&currentTime=${time}&date=${todayDate}`;
      const res = await fetch(url);
      const response = await res.json();
      console.log(response);
      console.log("lat", response[0]);
      setLat(response[0]);
      setLng(response[1]);
    } catch (error) {
      console.log("error in searching lat and long", error);
    }

    locationToggleModal();
  };

  return (
    <div>
      <li>
        <div>
          <div>
            <div className={classes.rowone}>
              <div className={classes.colzero}>{props.busId}</div>
              <div className={classes.colone}>{props.busName}</div>
              <div className={classes.coltwo}>{props.busNumber}</div>
              <div className={classes.colthree}>{props.busType}</div>
              <div className={classes.colfoure}>{props.totalSeats}</div>
              <div className={classes.colfive}>
                <Button onClick={toggleModal}><EditIcon/></Button>
              </div>
              <div className={classes.colsix}>
                <Button onClick={deleteHandler}><DeleteIcon/></Button>
              </div>
              <div className={classes.colsix}>
                <Button onClick={locationHandler}><LocationOnIcon/></Button>
              </div>
              {busData && (
                <Modal
                  className={models.model}
                  isOpen={isOpen}
                  onRequestClose={toggleModal}
                  contentLabel="My dialog"
                  overlayClassName={models.myoverlay}
                >
                  <form onSubmit={submitHandler}>
                    {/* <div className={models.title}>Edit Bus Details</div>
                    <div>
                      <div className={models.lbl}>Bus Name</div>
                      <input
                        type="text"
                        name="busName"
                        className={models.inputField}
                        value={busData.busName}
                        onChange={(e) =>
                          setBusData({
                            ...busData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}>Bus Number</div>
                      <input
                        type="text"
                        name="busNumber"
                        className={models.inputField}
                        value={busData.busNumber}
                        onChange={(e) =>
                          setBusData({
                            ...busData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}>Bus Type</div>
                      <input
                        type="text"
                        name="busType"
                        className={models.inputField}
                        value={busData.busType}
                        onChange={(e) =>
                          setBusData({
                            ...busData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={models.lbl}>
                      <div>Total Seats</div>
                      <input
                        type="text"
                        name="totalSeats"
                        className={models.inputField}
                        value={busData.totalSeats}
                        onChange={(e) =>
                          setBusData({
                            ...busData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={models.btn}>
                      <Button type="submit" onClick={submitHandler}>
                        Save Data
                      </Button>
                      <span className={models.cncl}>
                        <Button onClick={toggleModal}>Cancle</Button>
                      </span>
                    </div> */}
                    <div className={models.title}>Edit Bus Details</div>
                    <Grid container>
                    <Grid xs={6} >
                      <TextField
                        type="text"
                        name="busName"
                        label="Bus Name"
                        className={models.inputField}
                        value={busData.busName}
                        onChange={(e) =>
                          setBusData({
                            ...busData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                     </Grid>
                     <Grid xs={6}>
                      <TextField
                        type="text"
                        name="busNumber"
                        label="Bus Number"
                        className={models.inputField}
                        value={busData.busNumber}
                        onChange={(e) =>
                          setBusData({
                            ...busData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      </Grid>
                     <Grid xs={6}>  
                      <TextField
                        type="text"
                        name="busType"
                        label="Bus Type"
                        className={models.inputField}
                        value={busData.busType}
                        onChange={(e) =>
                          setBusData({
                            ...busData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                     </Grid >
                     <Grid xs={6}>
                      
                      <TextField
                        type="text"
                        name="totalSeats"
                        label="Total Seats"
                        className={models.inputField}
                        value={busData.totalSeats}
                        onChange={(e) =>
                          setBusData({
                            ...busData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                     </Grid>
                     </Grid>
                    <div className={models.btn}>
                      <Button type="submit" onClick={submitHandler}>
                        Save Data
                      </Button>
                      <span className={models.cncl}>
                        <Button onClick={toggleModal}>Cancel</Button>
                      </span>
                    </div>
                  </form>
                </Modal>
              )}
              {
                <Modal
                  className={mapstyles.model}
                  isOpen={showLocation}
                  onRequestClose={locationToggleModal}
                  contentLabel="My Maps"
                  overlayClassName={mapstyles.myoverlay}
                >
                  <GMaps lat={lat} lng={lng} />
                </Modal>
              }
            </div>
          </div>
        </div>
        <br></br>
      </li>
    </div>
  );
};

export default Bus;
