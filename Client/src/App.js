import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Info from "./Components/Info/Info";
import List from "./Components/List/List";
import { Cartcontext } from "./Components/Context/Context";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      const getCartMeals = await fetch("http://localhost:5000/cart", {
        method: "GET",
      });
      const data = await getCartMeals.json();
      setCartItems(data);
    };
    getCartItems();
  }, [setCartItems]);

  return (
    <div className="app-container">
      <Cartcontext.Provider
        value={{ cartItems, setCartItems, meals, setMeals }}
      >
        <Header />
        <Info />
        <List />
      </Cartcontext.Provider>
    </div>
  );
}

export default App;
