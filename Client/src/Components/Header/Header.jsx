import React, { useContext } from "react";
import { Cartcontext } from "../Context/Context";
import Headerimage from "../../Assets/Images/headerImage.jpg";
import Modal from "../Modal/Modal";
import Cartmeal from "../CartMeal/Cartmeal";
import "./Header.css";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, setIsOrdered } = useContext(Cartcontext);

  const onCloseHandler = () => {
    setIsOpen(false);
    setIsOrdered(false);
  };

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
          {cartItems.length > 0 && (
            <div className="foodzy-app__cart-badge">{cartItems.length}</div>
          )}
        </button>
        <Modal open={isOpen} onClose={onCloseHandler}>
          {cartItems.map((item) => {
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
