import "./Cartmeal.css";
import { useContext } from "react";
import { Cartcontext } from "../Context/Context";

const Cartmeal = ({ item }) => {
  const { getUpdatedCart } = useContext(Cartcontext);

  return (
    <div className="foodzy-app__cart-item-container">
      <div className="foodzy-app__cart-item">
        <h3>{item.name}</h3>
        <h4>{item.description}</h4>
        <span>${item.price}</span>
      </div>
      <button
        className="btn btn-remove__cart-meal"
        onClick={async () => {
          const deleteFoodItem = await fetch(
            `http://localhost:5000/items/${item.id}`,
            {
              method: "DELETE",
            }
          );
          const response = await deleteFoodItem.json();
          console.log(response);
          getUpdatedCart();
        }}
      >
        -
      </button>
      <span className="count-cart-item">{item.quantity}</span>
      <button
        className="btn btn-add__cart-meal"
        onClick={async () => {
          const response = await fetch("http://localhost:5000", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
          const backendResponse = await response.json();
          console.log(backendResponse);
          getUpdatedCart();
        }}
      >
        +
      </button>
    </div>
  );
};

export default Cartmeal;
