const express = require("express");
const products = require("./data/products");

const app = express();

app.get("/", (req, res) => res.send("Hello"));

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get product with id
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

// Setting up port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
