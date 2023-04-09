import React, { useState, useEffect } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  console.log({ users }, "from chatbar");

  useEffect(() => {
    socket.on("userLeft", (data) => {
      setUsers([...data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("createRoomResponse", (data) => {
      console.log("createRoomResponse", { data });
      setUsers([...data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("joinRoomResponse", (data) => {
      console.log("joinRoomResponse", { data });
      setUsers([...data]);
    });
  }, [socket]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <h5>{"Room Id : " + localStorage.getItem("roomId")}</h5>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatBar);
