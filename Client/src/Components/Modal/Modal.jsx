import React from "react";
import "./Modal.css";
import { Fragment } from "react";
import { createPortal } from "react-dom";
import { useEffect, useState, useContext } from "react";
import { Cartcontext } from "../Context/Context";
import Form from "../CheckoutForm/Form";

const Modal = (props) => {
  const { cartItems, orderPlaced, isOrdering, setIsOrdering } =
    useContext(Cartcontext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cartItems.reduce((acc, meal) => acc + meal.price * meal.quantity, 0)
    );
  }, [cartItems]);

  if (!props.open) {
    return null;
  }

  const placeOrderHandler = () => {
    setIsOrdering((prevData) => (prevData = true));
  };

  return createPortal(
    <>
      <div className="foodzy-app__cart-overlay"></div>
      <div className="foodzy-app__cart-modal">
        {!cartItems.length && !orderPlaced && (
          <h2 className="foodzy-app__empty-cart">Cart is empty</h2>
        )}
        {cartItems.length && !orderPlaced ? props.children : ""}
        {orderPlaced ? (
          <>
            <h2 className="foodzy-app__order-placed">Your order is placed</h2>
            <i className="fa-solid fa-pot-food" />
          </>
        ) : (
          ""
        )}
        <div>
          {cartItems.length && !orderPlaced ? (
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
            {cartItems.length && !orderPlaced ? (
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
        {isOrdering ? <Form /> : ""}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
