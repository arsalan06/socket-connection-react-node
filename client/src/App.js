import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";
const socket = io.connect("http://localhost:4000");
function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);
  //join new room 
  const AddRoom = () => {
    if (userName && roomId) {
      socket.emit("join_room", roomId);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h2>Join the Room</h2>
          <input
            type="text"
            placeholder="John..."
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          />
          <button onClick={AddRoom}>Add Room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} roomId={roomId} />
      )}
    </div>
  );
}

export default App;
