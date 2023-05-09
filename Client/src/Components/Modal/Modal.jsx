import React from "react";
import "./Modal.css";
import { Fragment } from "react";
import { createPortal } from "react-dom";
import { useEffect, useState, useContext } from "react";
import { Cartcontext } from "../Context/Context";
import Form from "../CheckoutForm/Form";

const Modal = (props) => {
  const { cartItems, isOrdered, setIsOrdered } = useContext(Cartcontext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cartItems.reduce((acc, meal) => acc + Number(meal.price), 0));
  }, [cartItems]);

  if (!props.open) {
    return null;
  }

  const placeOrderHandler = () => {
    setIsOrdered((prevData) => (prevData = true));
  };

  return createPortal(
    <Fragment>
      <div className="foodzy-app__cart-overlay"></div>
      <div className="foodzy-app__cart-modal">
        {cartItems.length ? (
          props.children
        ) : (
          <h2 className="foodzy-app__empty-cart">Your cart is empty</h2>
        )}{" "}
        <div>
          {cartItems.length ? (
            <div className="foodzy-app__cart-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          ) : (
            ""
          )}
          <div className="foodzy-app__modal-buttons">
            <button className="btn btn__close-modal" onClick={props.onClose}>
              Close
            </button>
            {cartItems.length ? (
              <button
                className="btn btn__place-order"
                onClick={placeOrderHandler}
              >
                Order
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        {isOrdered ? <Form /> : ""}
      </div>
    </Fragment>,
    document.getElementById("portal")
  );
};

export default Modal;
