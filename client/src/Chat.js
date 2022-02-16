import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'
const Chat=({socket,username,room})=>{
    const [currmessage,setCurrmessage]=useState('');
    const [messagelist,setMessagelist]=useState([]);
    
    const sendMessage=async()=>{
        if(currmessage!=="")
        {
             const messageData={
                 room:room,
                 author:username,
                 message:currmessage,
                 time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
             };
             await socket.emit("send-data",messageData);
             setMessagelist((list)=>[...list,messageData]);
             setCurrmessage('');
             

        }
    }
    useEffect(()=>{
        socket.on("receive-message",(data)=>{
            setMessagelist((list)=>[...list,data]);
        })
            },[socket])

    return (
        <div className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
      
        <div className="chat-body">
        <ScrollToBottom  className="message-container">
        
            {messagelist.map((messageContent)=>{
                return <div className="message" id={username===messageContent.author?"you":"other"}> 
                <div>
                 <div className="message-content">
                     <p>{messageContent.message}</p>
                 </div> 
                 <div className="message-meta">
                     <p id="time">{messageContent.time}</p>
                     <p id="author">{messageContent.author}</p>
                 </div> 
                </div>
                
                </div>
            })}
            </ScrollToBottom>
            
        </div>
        
        <div className="chat-footer">
            <input
              onChange={(event)=>{setCurrmessage(event.target.value)}}
              onKeyPress={(event)=>{event.key=="Enter"&&sendMessage()}} 
             type="text" placeholder="enter a message " value={currmessage}></input>
            <button onClick={sendMessage} >&#9658;</button>
        </div>

        </div>
    )

}
export default Chat;