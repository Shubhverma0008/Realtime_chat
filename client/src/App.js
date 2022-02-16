import React, { useState } from "react";
import io from 'socket.io-client'  //use to establish connection
import Chat from "./Chat";
import Ap from './App.css'
const socket=io.connect("http://localhost:3001");

const App =()=>{
    const [username,setUsername]=useState("");
    const [room,setRoom]=useState("");
    const [showchat,setshowchat]=useState(false);
    const joinRoom=()=>{
        if(username!==""&&room!==""){
            socket.emit("join_room",room);//this room will receive at code-1
            setshowchat(true);

        }

    }
    return <div className="App">
    {!showchat?
    <div className="joinChatContainer">
    <h3> Join A chat</h3>
    <input
     onChange={(event)=>{setUsername(event.target.value)}} 
     type="text" placeholder="Enter Your Name" />
    <input
    onChange={(event)=>{
        setRoom(event.target.value);
    }}
     type="text" placeholder="Room id.." />
    <button onClick={joinRoom}>join chat</button>
    </div>:
    <Chat 
    username={username}
    room={room}
    socket={socket}/>}
    </div>
}
export default App;