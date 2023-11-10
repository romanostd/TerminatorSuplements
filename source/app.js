require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const categoriesRoute = require("./routes/categories");
const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");
const usersRoute = require("./routes/users");
const emailRoute = require("./routes/email");
const loginRoute = require("./routes/login");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});

app.use("/categories", categoriesRoute);
app.use("/orders", ordersRoute);
app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/email", emailRoute);
app.use("/login", loginRoute);

app.use(next => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, res) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
