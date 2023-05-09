import React, { useContext, useState } from "react";
import "./Form.css";
import { Cartcontext } from "../Context/Context";

const Form = () => {
  const { setOrderPlaced, setIsOrdering, setCartItems } =
    useContext(Cartcontext);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    setFullName("");
    setEmail("");
    setstreetName("");
    setzipcode("");
    setcity("");
    const clearCart = await fetch("http://localhost:5000/items", {
      method: "DELETE",
    });
    const data = await clearCart.json();
    setCartItems([]);
    console.log(data);
    console.log("Order Placed");
    setOrderPlaced(true);
    setIsOrdering(false);
  };

  return (
    <div className="checkoutForm-container">
      <form action="" className="checkout-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="full-name">Your Name</label>
          <input
            type="text"
            value={fullName}
            onChange={fullNameChangeHandler}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={emailChangeHandler}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="street-name">Street Name</label>
          <input
            type="text"
            id="street-name"
            value={streetName}
            onChange={streetNameChangeHandler}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="zip-code">Zip Code</label>
          <input
            type="text"
            id="zip-code"
            value={zipcode}
            onChange={zipcodeChangeHandler}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={cityChangeHandler}
            required
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
