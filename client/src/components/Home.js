import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "short-uuid";
const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [openRoomIdInput, setOpenRoomIdInput] = useState(false);
  const disabled = !userName?.trim()?.length;
  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!userName?.trim()?.length) return;
    localStorage.setItem("userName", userName);
    const roomId = uuid.generate();
    localStorage.setItem("roomId", roomId);
    socket.emit(
      "createRoom",
      {
        userName,
        socketID: socket.id,
        roomId,
      },
      roomId
    );
    navigate("/chat");
  };
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!userName?.trim()?.length) return;
    if (!openRoomIdInput) {
      setOpenRoomIdInput(true);
      return;
    }
    if (!roomId?.trim()?.length) return;
    localStorage.setItem("userName", userName);
    localStorage.setItem("roomId", roomId);
    socket.emit("joinRoom", { userName, socketID: socket.id, roomId }, roomId);
    navigate("/chat");
  };

  return (
    <form className="home__container">
      <h2 className="home__header">Enter Username to get started</h2>
      <input
        autoComplete="off"
        type="text"
        minLength={3}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        placeholder="Enter Username"
        onChange={(e) => setUserName(e.target.value)}
      />
      {openRoomIdInput && (
        <input
          autoComplete="off"
          type="text"
          minLength={3}
          name="roomID"
          id="roomID"
          className="username__input"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      )}
      <div style={{ display: "flex", gap: "10px" }}>
        {!openRoomIdInput && (
          <button
            className={disabled ? "home__cta__disabled" : "home__cta"}
            disabled={disabled}
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
        )}
        <button
          className={disabled ? "home__cta__disabled" : "home__cta"}
          disabled={disabled}
          onClick={handleJoinRoom}
        >
          {openRoomIdInput ? "Join" : "Join Room"}
        </button>
      </div>
    </form>
  );
};
export default Home;
