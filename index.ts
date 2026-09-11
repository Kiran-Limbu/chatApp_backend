import express from "express";
import cookieSession from "cookie-session";
import cookieParser from 'cookie-parser'
import passport from "passport"
import passportSetup from './config/passport.ts'
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import authRoute from "./route/auth.route.ts"
import userRoute from "./route/user.route.ts"
import connectToDB from "./config/db/db.ts";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//setup the cookie in our middlewere;
app.use(cookieParser());

// middleware of express
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://mero-chate.vercel.app"], 
  credentials: true 
}));

//config the cookieSession
app.use(cookieSession({
  name: "session",
  keys: ["auth"],
  maxAge: 24 *60 * 60* 100,
}))


//config the passport 
app.use(passport.initialize())
app.use(passport.session())

//connect To db function:
connectToDB();

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
  console.log(`connection estabished ${socket.id}`);

  //listen the "joinRoom" event from the client
  socket.on("joinRoom", async (userName) => {
    //this .join method is used to join the chat
    await socket.join(ROOM);

    //sent the userName to all member who join the roomNotice room
    // io.to(ROOM).emit("userJoinRoomNotify", userName);

    socket.to(ROOM).emit("userJoinRoomNotify", userName);
  });

  //listen the client msg
  socket.on("sendMsg", (msg) => {
    socket.to(ROOM).emit("msgSendNotify", msg);
  });

  socket.on("typingNotify", (userName) => {
    socket.to(ROOM).emit("typingNotify", userName);
  });

  socket.on("stopTypingNotify", (userName) => {
    socket.to(ROOM).emit("stopTypingNotify", userName);
  })
});

//route for the auth
app.use("/api/auth", authRoute);

//route fot the users
app.use("/api/user", userRoute);

//listing the server on port 4000 or 3000
server.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
