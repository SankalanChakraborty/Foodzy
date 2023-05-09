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
  try {
    const { id, name, description, price } = req.body;
    const newFoodItem = await pool.query(
      "INSERT INTO FOOD_CART (ID, NAME, DESCRIPTION, PRICE) VALUES ($1, $2, $3, $4)",
      [id, name, description, price]
    );
    res.json("Item successfully added to the cart");
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
    const deleteFoodItem = await pool.query(
      "DELETE FROM FOOD_CART WHERE ID = $1",
      [id]
    );
    res.json("Item removed from the cart");
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
