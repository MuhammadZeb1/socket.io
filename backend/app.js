import express from "express"
import {Server  } from "socket.io";
import {createServer, METHODS} from "http"
import cors from "cors"


const app = express();



const server = createServer(app)
const io = new Server(server,
   {
    cors:{
      origin:"*",
     methods: ["GET", "POST"],
      credentials:true
    }
   }
)
const PORT = 3000;

// Middleware (optional)
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Express server!');
});

io.on("connection",(socket)=>{
     console.log("connect",socket.id)
     socket.on("message",(data)=>{
      console.log(data)
     })

     socket.broadcast.emit("welcome", `welcome back ${socket.id}`);
      socket.on("disconnect",()=>{
        console.log(`user disconnect ${socket.id}`)
      })
})
// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)})
  

    
  