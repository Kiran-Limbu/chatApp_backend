import express from "express";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportSetup from "./config/passport.ts";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import authRoute from "./route/auth.route.ts";
import userRoute from "./route/user.route.ts";
import msgRoute from "./route/msg.route.ts";
import connectToDB from "./config/db/db.ts";
import messageModel from "./model/message.model.ts";

dotenv.config();
//connect To db function:
connectToDB();

const app = express();
const port = process.env.PORT || 3000;

//setup the cookie in our middlewere;
app.use(cookieParser());

// middleware of express
app.use(express.json());
app.use(
  cors({
    origin: ["https://mero-chate.vercel.app", "http://localhost:5173"],
    credentials: true,
  }),
);

//config the cookieSession
app.use(
  cookieSession({
    name: "session",
    keys: ["auth"],
    maxAge: 24 * 60 * 60 * 100,
  }),
);

//config the passport
app.use(passport.initialize());
app.use(passport.session());

//create an server
const server = http.createServer(app);
//socket io setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://mero-chate.vercel.app"],
    credentials: true,
  },
});

const ROOM = "group";

io.on("connection", (socket) => {
  //listen the "joinRoom" event from the client
  socket.on("joinRoom", async (username) => {
    //this .join method is used to join the chat
    await socket.join(ROOM);
    //sent the userName to all member who join the roomNotice room
    // io.to(ROOM).emit("userJoinRoomNotify", userName);

    socket.to(ROOM).emit("userJoinRoomNotify", username);
  });

  //listen the client msg
  socket.on("sendMsg", async (msg) => {
   
    try {
      const text = msg.text;
      const time = msg.time;
      const sender = msg.sender;
      const massage = await messageModel.create({ text, time, sender });
      socket.to(ROOM).emit("msgSendNotify", massage);
      
    } catch (error) {
      console.log("something went wrong" + error);
    }
  });

  socket.on("typingNotify", (displayName) => {
    socket.to(ROOM).emit("typingNotify", displayName);
  });

  socket.on("stopTypingNotify", (userName) => {
    socket.to(ROOM).emit("stopTypingNotify", userName);
  });
});

//route for the auth
app.use("/api/auth", authRoute);

//route fot the users
app.use("/api/user", userRoute);

//route for the mssages
app.use("/api/msg", msgRoute);

//listing the server on port 4000 or 3000
server.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
