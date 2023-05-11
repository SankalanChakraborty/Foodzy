import React, { useContext, useEffect } from "react";
import { Cartcontext } from "../Context/Context";
import "./List.css";

const List = () => {
  const {
    cartItems,
    setCartItems,
    meals,
    setMeals,
    getUpdatedCart,
    setOrderPlaced,
  } = useContext(Cartcontext);

  useEffect(() => {
    const getMeals = async () => {
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      setMeals(data);
    };

    getMeals();
  }, [setMeals]);

  return (
    <div className="foodzy-app__food-list">
      {meals?.length ? (
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
                  <button
                    onClick={async () => {
                      //if any clearing the status of previous order
                      setOrderPlaced(false);
                      for (const item of cartItems) {
                        if (item.id === meal.id) {
                          console.log(
                            "Item is already present in the cart",
                            item
                          );
                          const response = await fetch(
                            "http://localhost:5000",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(meal),
                            }
                          );
                          const backendResponse = await response.json();
                          console.log(backendResponse);
                          getUpdatedCart();
                          return;
                        }
                      }
                      // console.log("New Item is going to the cart", meal);
                      setCartItems((prevMeals) => {
                        return [...prevMeals, meal];
                      });
                      const response = await fetch("http://localhost:5000", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(meal),
                      });

                      const backendResponse = await response.json();
                      console.log(backendResponse);
                      getUpdatedCart();
                    }}
                  >
                    + Add
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default List;
