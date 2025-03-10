import dotenv from "dotenv";
import ConnectDB from "./db/connect.js";
// import app from "./app.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extented: true, limit: "20kb" }));
app.use(express.static("public"));

app.use(cookieParser());

// import routers
import userrouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

// routes declaration

app.use("/api/v1/users", userrouter);
app.use("/", healthcheckRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);



dotenv.config();

ConnectDB()
  .then(() => {
    app.on("ERROR", (error) => {
      console.log("error", error);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection Error", err);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";

// First approach to connect with the database

/* import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    app.on("ERROR", (err) => {
      console.log("error", err);
      throw err;
    });

    app.listen(`${process.env.PORT}`, () => {
      console.log(`app is listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
})()
*/
export default app;
