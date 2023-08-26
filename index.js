const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/categoryRoute");
const blogCategoryRouter = require("./routes/blogCategoryRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog-category", blogCategoryRouter);

// Middlewares
app.use(notFound);
app.use(errorHandler);

dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
