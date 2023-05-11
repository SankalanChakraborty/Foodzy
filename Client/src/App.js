import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Info from "./Components/Info/Info";
import List from "./Components/List/List";
import { Cartcontext } from "./Components/Context/Context";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [meals, setMeals] = useState([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const getUpdatedCart = async () => {
    const updatedCartDetails = await fetch("http://localhost:5000/cart", {
      method: "GET",
    });
    const data = await updatedCartDetails.json();
    setCartItems(data);
  };

  return (
    <div className="app-container">
      <Cartcontext.Provider
        value={{
          cartItems,
          setCartItems,
          meals,
          setMeals,
          isOrdering,
          setIsOrdering,
          orderPlaced,
          setOrderPlaced,
          getUpdatedCart,
        }}
      >
        <Header />
        <Info />
        <List />
      </Cartcontext.Provider>
    </div>
  );
}

export default App;
