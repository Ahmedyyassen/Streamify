import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import { createServer } from "http";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import { FRONT_END, NODE_ENV, PORT } from "./constants/env.js";
// import path from "path";

import { errorHandler } from "./middleware/ErrorHandler.js";

const app = express();
// const __dirname = path.resolve();
const server = createServer(app);

app.use(
  cors({
    origin: [FRONT_END],
    credentials: true,
  })
);
// app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);
app.use(errorHandler);


// if (NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));
//   console.log("path: ", path.join(__dirname, "../FrontEnd/dist"));
  
//   app.get("*", (req, res) => {
//    res.sendFile(path.join(__dirname, "../FrontEnd/dist/index.html"));
//   });
// }

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`);
  });
});

