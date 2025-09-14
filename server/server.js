import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import boardRoutes from "./routes/board.js";
import authRoutes from "./routes/auth.js"; 

dotenv.config();

const app = express();
const server = createServer(app); 
const io = new Server(server, 
  { cors: 
    { origin: "*" ,
      methods: ["GET" , "POST" , "PUT" , "DELETE"]
    } });

app.use(cors());          
app.use(express.json());  

app.use("/api/auth", authRoutes);
app.use("/api/boards" , boardRoutes)

io.on("connection", (socket) => {
  console.log(" New client connected:", socket.id);

  
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log(` User joined board: ${boardId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch(err => console.error(err));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running on ${PORT}`));


export {io}