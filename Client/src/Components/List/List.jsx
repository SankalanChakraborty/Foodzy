import React, { useContext, useEffect } from "react";
import { Cartcontext } from "../Context/Context";
import "./List.css";

const List = () => {
  const { cartItems, setCartItems, meals, setMeals } = useContext(Cartcontext);

  useEffect(() => {
    const getMeals = async () => {
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      // console.log(data);
      setMeals(data);
    };

    getMeals();
    // eslint-disable-next-line
  }, []);

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
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default List;
