const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const rateLimiter = require("express-rate-limit");
let arguments = process.argv;

console.log(arguments);

//dot en configuration
dotenv.config();

//DB connection
connectDb();

//rest object
const app = express();

//rate limiter
let limiter = rateLimiter({
  max: 3,
  windowMs: 60 * 60 * 1000,
  message: " Maximum number of attempts made.Please try after 1 hour ",
});

//middlewares
app.use("/api", limiter);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
// URL => http://localhost:8080
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/catgeoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Food Server APP API BASE PROJECT </h1>");
});

//PORT
const PORT = process.env.PORT || 9090;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.white.bgMagenta);
});
