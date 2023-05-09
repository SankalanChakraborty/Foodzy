import "./Cartmeal.css";
import { useContext } from "react";
import { Cartcontext } from "../Context/Context";

const Cartmeal = ({ item }) => {
  const { cartItems, setCartItems } = useContext(Cartcontext);

  return (
    <div className="foodzy-app__cart-item-container">
      <div className="foodzy-app__cart-item">
        <h3>{item.name}</h3>
        <h4>{item.description}</h4>
        <span>${item.price}</span>
      </div>
      <button
        className="btn-remove__cart-meal"
        onClick={async () => {
          const deleteFoodItem = await fetch(
            `http://localhost:5000/items/${item.id}`,
            {
              method: "DELETE",
            }
          );
          const response = await deleteFoodItem.json();
          setCartItems(cartItems.filter((meal) => meal.id !== item.id));
          console.log(response);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default Cartmeal;
