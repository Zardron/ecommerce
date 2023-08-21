const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/user", authRouter);

// Middlewares
app.use(notFound);
app.use(errorHandler);

dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
