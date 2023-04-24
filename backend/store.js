const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
dotenv.config({ path: "backend/config/config.env" });

const items = require("./routes/item");
const users = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");

app.use("/api/v1", items);
app.use("/api/v1", users);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(errorMiddleware);
module.exports = app;
