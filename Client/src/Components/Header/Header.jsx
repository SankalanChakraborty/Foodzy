import React, { useContext, useState, useEffect } from "react";
import { Cartcontext } from "../Context/Context";
import Headerimage from "../../Assets/Images/headerImage.jpg";
import Modal from "../Modal/Modal";
import Cartmeal from "../CartMeal/Cartmeal";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, setIsOrdering } = useContext(Cartcontext);

  const [cartLength, setCartLength] = useState(0);

  const onCloseHandler = () => {
    setIsOpen(false);
    setIsOrdering(false);
  };

  useEffect(() => {
    setCartLength(cartItems.reduce((acc, meal) => acc + meal.quantity, 0));
  }, [cartItems]);

  return (
    <div className="foodzy-app__header-container">
      <div className="foodzy-app__banner">
        <h1>Foodzy</h1>
        <button
          className="foodzy-app__cart-button"
          onClick={() => {
            cartItems.length && setIsOpen(true);
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <p>Your Cart</p>
          {cartLength > 0 && (
            <div className="foodzy-app__cart-badge">{cartLength}</div>
          )}
        </button>
        <Modal open={isOpen} onClose={onCloseHandler}>
          {cartItems.map((item) => {
            // console.log(item);
            return (
              <li key={item.id}>
                <Cartmeal item={item} />
              </li>
            );
          })}
        </Modal>
      </div>
      <img src={Headerimage} alt="background" />
    </div>
  );
};

export default Header;
