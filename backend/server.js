import express from "express";
import dotenvFlow from "dotenv-flow";
import VARS from "./config/vars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";

// route import
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

dotenvFlow.config();
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

const originRegex =
  /^https?:\/\/(.*\.)?yashsagar\.in$|^http:\/\/localhost:5173$/;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || originRegex.test(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by Cross"));
      }
    },
    methods: "GET , POST , OPTION , PUT ",
    allowedHeaderers: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// testining

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} request to ${req.url}`
  );
  next();
});

// creatining a session
app.use(
  session({
    secret: "aswdrfgttE4Ba0cfD@",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      secure: false, //since no ssl certificate configuration
      httpOnly: true,
      sameSite: "lax",
    },
    name: "authCookie",
  })
);

// routes
app.use("/v1/auth", authRoutes);
app.use("/v1/employee", employeeRoutes);

if (VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// testing code
// app.get("/test", (req, res) => {
//   console.log("sever working");
//   res.json({
//     succsess: true,
//     message: "server working ",
//   });
// });

app.listen(VARS.PORT, () => {
  console.log(`server started on http://localhost:${VARS.PORT}`);
  connectDB();
});
