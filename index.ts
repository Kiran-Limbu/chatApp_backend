import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// middleware of express
app.use(express.json());
app.use(cors());

//create an server
const server = http.createServer(app);
//socket io setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const ROOM = "group";

io.on("connection", (socket) => {
  console.log(`connection estabished ${socket.id}`);

  //listen the "joinRoom" event from the client
  socket.on("joinRoom", async (userName) => {
    console.log(`${userName} is joining the group .`);
    //this .join method is used to join the chat
    await socket.join(ROOM);

    //sent the userName to all member who join the roomNotice room
    // io.to(ROOM).emit("userJoinRoomNotify", userName);
 
    socket.to(ROOM).emit("userJoinRoomNotify", userName);
  });

  //listen the client msg
  socket.on("sendMsg", (msg) =>{
    console.log(`user message: ${msg}`)

    socket.to(ROOM).emit("msgSendNotify", msg);
  })
});

app.get("/", (req, res) => {
  res.send("ha ha server chal gaya");
});


//listing the server on port 4000 or 3000
server.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
