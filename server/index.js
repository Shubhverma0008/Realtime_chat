const dotenv=require('dotenv')
dotenv.config();
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
        origin:process.env.URL,
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







// app.get('/',(req,res)=>{
//     res.send("working");
// })

const port =process.env.PORT||3001;
if(process.env.NODE_ENV=='production')
{
    app.use(express.static('client/build'));
}



server.listen(port,()=>{
    console.log( `${process.env.URL}` )
})