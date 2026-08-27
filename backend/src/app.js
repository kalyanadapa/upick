import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js";
import bodyParser from "body-parser"; // ✅ add this
const app = express()

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (process.env.CORS_ORIGIN === "*" || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, origin);
    }
    return callback(null, origin);
  },
  credentials: true
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import categoryRouter from './routes/category.routes.js'
import productRouter from './routes/product.routes.js'
import brandRouter from "./routes/brand.routes.js"
import cartRouter from "./routes/cart.routes.js"
import wishlistRouter from "./routes/wishlist.routes.js"
import orderRouter from "./routes/order.routes.js"
import stripeRouter from "./routes/stripe.routes.js";
import notificationRouter from "./routes/notification.routes.js";

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running successfully!" });
});
const globalErrorHandler = (err, req, res, next) => {
    // Check if the error is an instance of ApiError
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            stack: err.stack, // Optional: Include in dev mode only
            statusCode: err.statusCode // Add status code to response body
        });
    }

    // If the error isn't an ApiError, return a generic internal server error
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        statusCode: 500 // Add status code to response body
    });
};

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/brands",brandRouter)
app.use("/api/v1/category",categoryRouter )
app.use("/api/v1/product",productRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/wishlist",wishlistRouter)
app.use("/api/v1/orders",orderRouter)
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/stripe", bodyParser.raw({ type: "application/json" }), stripeRouter);


app.use(globalErrorHandler);
// http://localhost:8000/api/v1/users/register

export { app }