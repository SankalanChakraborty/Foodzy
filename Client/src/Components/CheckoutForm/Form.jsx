import React, { useState } from "react";
import "./Form.css";

const Form = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [streetName, setstreetName] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [city, setcity] = useState("");

  const fullNameChangeHandler = (e) => {
    setFullName((prevData) => (prevData = e.target.value));
  };
  const emailChangeHandler = (e) => {
    setEmail((prevData) => (prevData = e.target.value));
  };
  const streetNameChangeHandler = (e) => {
    setstreetName((prevData) => (prevData = e.target.value));
  };
  const zipcodeChangeHandler = (e) => {
    setzipcode((prevData) => (prevData = e.target.value));
  };
  const cityChangeHandler = (e) => {
    setcity((prevData) => (prevData = e.target.value));
  };

  return (
    <div className="checkoutForm-container">
      <form action="" className="checkout-form">
        <div className="form-control">
          <label htmlFor="full-name">Your Name</label>
          <input
            type="text"
            value={fullName}
            onChange={fullNameChangeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} onChange={emailChangeHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="street-name">Street Name</label>
          <input
            type="text"
            id="street-name"
            value={streetName}
            onChange={streetNameChangeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="zip-code">Zip Code</label>
          <input
            type="text"
            id="zip-code"
            value={zipcode}
            onChange={zipcodeChangeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={cityChangeHandler}
          />
        </div>
        <button className="btn btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
