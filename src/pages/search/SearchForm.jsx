import React, { useState } from "react";
import classes from "./SearchBus.module.css";
export default function SearchForm(props) {
  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    dateTravel: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const isEmpty = (value) => !!["", null, undefined, "null"].includes(value);
  const validateForm = (formData) => {
    const { fromLocation, toLocation, dateTravel } = formData;
    if (isEmpty(fromLocation)) {
      return false;
    }
    if (isEmpty(toLocation)) {
      return false;
    }
    if (isEmpty(dateTravel)) {
      return false;
    }

    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validForm = validateForm(formData);
    if (!!validForm) {
      props.handleSearchBus(formData);
    }
  };
  return (
    <form className={classes.total_form}>
      <div className={classes.type_from}>
        <input
          type="text"
          placeholder="FROM"
          name="fromLocation"
          id="5"
          onChange={handleChange}
          required
        />
      </div>
      <div className={classes.type_to}>
        <input
          type="text"
          placeholder="TO"
          name="toLocation"
          id="6"
          onChange={handleChange}
          required
        />
      </div>
      <div className={classes.type_date}>
        <input
          type="date"
          placeholder="DATE"
          name="dateTravel"
          id="7"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button id="8" className={classes.link} onClick={handleSubmit}>
          Search Buses
        </button>
      </div>
    </form>
  );
}
