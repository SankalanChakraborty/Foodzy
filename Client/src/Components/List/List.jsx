import React, { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../Context/Context";
import "./List.css";

const List = () => {
  const { cartItems, setCartItems } = useContext(Cartcontext);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      //   console.log(data);
      setMeals(data);
    };

    getMeals();
  }, []);

  return (
    <div className="foodzy-app__food-list">
      <ul>
        {meals?.map((meal) => {
          return (
            <li key={meal.id}>
              <div className="meal-info">
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
                <span>${meal.price}</span>
              </div>

              <div className="meal_action-buttons">
                {!cartItems.includes(meal) ? (
                  <button
                    onClick={async () => {
                      setCartItems((prevData) => {
                        return [...prevData, meal];
                      });
                      const response = await fetch("http://localhost:5000", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(meal),
                      });
                      const backendResponse = await response.json();
                      console.log(backendResponse);
                    }}
                  >
                    + Add
                  </button>
                ) : (
                  <>
                    <i className="fa-sharp fa-solid fa-circle-check" />
                    <span>Added to the cart</span>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
