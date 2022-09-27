import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AvailBuses from "./AvailBuses";
import classes from "./SearchBus.module.css";
import SearchForm from "./SearchForm";

const SearchBus = (props) => {
  const [busDataSearchList, setBusDataSearchList] = useState([]);
  //console.log({ routeProps: props });

  

  const[location,setLocation]=useState(
    {
      fromLoc:"",
      toLoc:"",
      date:""
    }
  );
  const handleSearchBus = async (formData) => {
    
    //API call to get the list of busses.
    try {
      const { fromLocation, toLocation, dateTravel } = formData;
      const url = `http://localhost:8080/route-api/busesId?origin=${fromLocation}&destination=${toLocation}&date=${dateTravel}`;
      const res = await fetch(url);
      const response = await res.json();


      setLocation({
        fromLoc:fromLocation,
        toLoc:toLocation, 
        date:dateTravel
      });
      setBusDataSearchList(response);
      console.log(response);
  
    } catch (error) {
      console.error("error in bus search api: ", error);
      setBusDataSearchList([]);
    }
  };

  
  return (
    <>
      <SearchForm handleSearchBus={handleSearchBus} />
      {!!busDataSearchList && busDataSearchList?.length > 0 ? (
        <AvailBuses busDataSearchList={busDataSearchList} fromLocation={location.fromLoc} toLocation={location.toLoc} date={location.date}/>
      ) : (
        <div className={classes.note}>"Please search with from and to location"</div>
      )}
    </>
  );
};
export default withRouter(SearchBus);
