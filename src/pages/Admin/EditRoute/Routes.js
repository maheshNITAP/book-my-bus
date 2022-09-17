import React, { useState } from "react";
import {  Dialog, DialogTitle, Grid, StylesProvider, TextField } from "@mui/material";
import Button from "../../search/UI/Button";
import classes from "./Routes.module.css";
import models from "./Modal.module.css";
import Modal from "react-modal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

Modal.setAppElement("#root");

const Routes = (props) => {
  const [routeData, setRouteData] = useState({
    routeId: props.routeId,
    stationName: props.stationName,
    busId: props.busId,
    scheduleTime: props.scheduleTime,
    routeRank: props.routeRank,
    date: props.date,
    price: props.price,
    distance: props.distance,
    lat: props.lat,
    lng: props.lng,
  });

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function refreshPage() {
    window.location.reload(false);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    //console.log(routeData);
    //api for edit Route/Stops Details
    try {
      const url = "http://localhost:8080/route-api/save",
        body = JSON.stringify(routeData);
      console.log(body);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json " },
        body,
      });
      const response = await res.json();
      console.log({ response });
    } catch (error) {
      console.error("error in Updating routes", error);
    }

    toggleModal();
    refreshPage();
  };

  const deleteHandler = async (event) => {
    //api for delete route
    // try {
    //   const  url =`http://localhost:8080/route-api/routes/${props.routeId}`,
    //     body = JSON.stringify();
    //     console.log(body);
    //   const res = await fetch(url, {
    //     method: "DELETE",headers:{'Content-Type':'application/json '},
    //     body,
    //   });
    //   const response = await res.json();
    //   console.log({ response });

    // } catch (error) {
    //   console.error("error in Delete route", error);
    // }
    refreshPage();
  };

  return (
    <div>
      <li>
        <div>
          <div>
            <div className={classes.rowone}>
              <div className={classes.colzero}>{props.routeId}</div>
              <div className={classes.colone}>{props.busId}</div>
              <div className={classes.coltwo}>{props.stationName}</div>
              <div className={classes.colthree}>{props.routeRank}</div>
              {/* <div className={classes.colfoure}>{props.date}</div> */}
              <div className={classes.colfive}>{props.scheduleTime}</div>
              <div className={classes.colsix}>{props.price}</div>
              <div className={classes.colseven}>{props.lat}</div>
              <div className={classes.coleight}>{props.lng}</div>
              <div className={classes.colnine}>{props.distance}</div>
              <div className={classes.colten}>
                <Button onClick={toggleModal}><EditIcon/></Button>
              </div>
              <div className={classes.colele}>
                <Button onClick={deleteHandler}><DeleteIcon/></Button>
              </div>
              {routeData && (
                <Modal
                  className={models.model}
                  isOpen={isOpen}
                  onRequestClose={toggleModal}
                  contentLabel="My dialog"
                  overlayClassName={models.myoverlay}
                >
                  <form onSubmit={submitHandler}>
                    <div className={models.title}>Edit Stop Details</div>
                    {/* <div>
                      <div className={models.lbl}>Bus Id</div>
                      <input
                        type="text"
                        name="busId"
                        className={models.inputField}
                        value={routeData.busId}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}>stationName</div>
                      <input
                        type="text"
                        name="stationName"
                        className={models.inputField}
                        value={routeData.stationName}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}>routeRank</div>
                      <input
                        type="text"
                        name="routeRank"
                        className={models.inputField}
                        value={routeData.routeRank}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}> scheduleTime</div>
                      <input
                        type="time"
                        name="scheduleTime"
                        className={models.inputField}
                        value={routeData.scheduleTime}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}> date</div>
                      <input
                        type="date"
                        name="date"
                        className={models.inputField}
                        value={routeData.date}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}> price</div>
                      <input
                        type="text"
                        name="price"
                        className={models.inputField}
                        value={routeData.price}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}> distance</div>
                      <input
                        type="text"
                        name="distance"
                        className={models.inputField}
                        value={routeData.distance}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}> Latitude</div>
                      <input
                        type="text"
                        name="lat"
                        className={models.inputField}
                        value={routeData.lat}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <div className={models.lbl}> Longitute</div>
                      <input
                        type="text"
                        name="lng"
                        className={models.inputField}
                        value={routeData.lng}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div> */}
                    <Grid container>
                    <Grid xs={4} >
                      <TextField
                        type="text"
                        name="busId"
                        placeholder="Bus Id"
                        label="Bus Id"
                        className={models.inputField}
                        value={routeData.busId}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid xs={4} >
                      <TextField
                        type="text"
                        name="stationName"
                        placeholder="Station Name"
                        label="Station Name"
                        className={models.inputField}
                        value={routeData.stationName}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid xs={4} >
                      <TextField
                        type="text"
                        name="routeRank"
                        placeholder="Route Rank"
                        label="Route Rank"
                        className={models.inputField}
                        value={routeData.routeRank}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid xs={4} >
                      <TextField
                        type="time"
                        name="scheduleTime"
                        placeholder="Schedule Time"
                        label="Schedule Time"
                        className={models.inputField}
                        value={routeData.scheduleTime}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    {/* <Grid xs={4} >
                      <TextField
                        type="date"
                        name="date"
                        placeholder="Date"
                        label="Date"
                        className={models.inputField}
                        value={routeData.date}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid> */}
                    <Grid xs={4} >
                      <TextField
                        type="text"
                        name="price"
                        placeholder="Price"
                        label="Price"
                        className={models.inputField}
                        value={routeData.price}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid xs={4} >
                      <TextField
                        type="text"
                        name="distance"
                        placeholder="Distance"
                        label="Distance"
                        className={models.inputField}
                        value={routeData.distance}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid xs={4} >
                      <TextField
                        type="text"
                        name="lat"
                        placeholder="Latitude"
                        label="Latitude"
                        className={models.inputField}
                        value={routeData.lat}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid xs={4} >
                      <TextField
                        type="text"
                        name="lng"
                        placeholder="Longitude"
                        label="Longitude"
                        className={models.inputField}
                        value={routeData.lng}
                        onChange={(e) =>
                          setRouteData({
                            ...routeData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    </Grid>
                    <div className={models.btn}>
                      <Button type="submit" onClick={submitHandler}>
                        Save{" "}
                      </Button>
                      <span className={models.cncl}>
                        <Button type="submit" onClick={toggleModal}>
                          Cancel
                        </Button>
                      </span>
                    </div>
                  </form>
                </Modal>
              )}
            </div>
          </div>
        </div>
        <br></br>
      </li>
    </div>
  );
};
export default Routes;
