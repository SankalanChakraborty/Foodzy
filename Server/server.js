const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
//GET all meals
app.get("/", async (req, res) => {
  try {
    const allMeals = await pool.query("SELECT * FROM MENU");
    res.json(allMeals.rows);
  } catch (error) {
    console.error(error);
  }
});

//ADD a meal to the cart
app.post("/", async (req, res) => {
  const { id, name, description, price } = req.body;
  try {
    //Check if item already present in the cart
    const checkIfExisting = await pool.query(
      "SELECT * FROM FOOD_CART WHERE ID = $1",
      [id]
    );
    console.log("MEAL: ", checkIfExisting.rows[0]);

    //If item not present in the cart then add it to the cart
    if (!checkIfExisting.rows.length) {
      const newFoodItem = await pool.query(
        "INSERT INTO FOOD_CART (ID, NAME, DESCRIPTION, PRICE) VALUES ($1, $2, $3, $4)",
        [id, name, description, price]
      );
      const updateQty = await pool.query(
        "UPDATE FOOD_CART SET QUANTITY = 1 WHERE ID = $1",
        [id]
      );
      res.json("Item successfully added to the cart");
    } else {
      // if item is present get the quantity and update it
      const getExistingQuantity = await pool.query(
        "SELECT QUANTITY FROM FOOD_CART WHERE ID = $1",
        [id]
      );
      const cartMealqty = getExistingQuantity.rows[0].quantity;
      const updateQty = await pool.query(
        "UPDATE FOOD_CART SET QUANTITY = $1 WHERE ID = $2",
        [cartMealqty + 1, id]
      );
      res.json("The quantity of this meal is updated in the cart");
    }
  } catch (err) {
    console.error(err);
  }
});

//GET all meals from the cart
app.get("/cart", async (req, res) => {
  try {
    const allCartMeals = await pool.query("SELECT * FROM FOOD_CART");
    res.json(allCartMeals.rows);
  } catch (error) {
    console.error(error);
  }
});

//Remove a meal from the cart
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //check if item has more than one quantity
    const getItem = await pool.query(
      "SELECT QUANTITY FROM FOOD_CART WHERE ID = $1",
      [id]
    );

    //Reduce quantity by 1
    if (getItem.rows[0].quantity > 1) {
      const reduceQty = await pool.query(
        "UPDATE FOOD_CART SET QUANTITY = $1 WHERE ID = $2",
        [getItem.rows[0].quantity - 1, id]
      );
      res.json("An instance of the item removed from the cart");
    }

    if (getItem.rows[0].quantity === 1) {
      const mealQty = getItem.rows[0].quantity;
      const deleteFoodItem = await pool.query(
        "DELETE FROM FOOD_CART WHERE ID = $1",
        [id]
      );
      res.json("Item removed from the cart");
    }
  } catch (err) {
    console.log(err);
  }
});

//Remove all meals from the cart
app.delete("/items", async (req, res) => {
  try {
    const clearCart = await pool.query("DELETE FROM FOOD_CART");
    res.json("Cart cleared");
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
