const express=require('express')
const app=express();
const http=require('http')// to build with socket.io
const cors=require('cors') // very important for socket
const {Server}=require('socket.io'); //Server is exist in socket io librar;
const { connected } = require('process');
app.use(cors());
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    },
});
//on is event shows someone is connected

io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`);
    // on means listening and emit matlab sending
    socket.on("join_room",(data)=>{//data is coming from code-1
        socket.join(data)
        console.log(`User with ID:${socket.id} joined room ${data}`)
    })
   socket.on("send-data",(data)=>{
    //    console.log(data);
    // to me ager ek ki id dege to unko sunai dega
       socket.to(data.room).emit("receive-message",data)
   })


    socket.on("disconnect",()=>{
        console.log("User Discconected",socket.id);
    })
})













server.listen(3001,()=>{
    console.log("server running")
})