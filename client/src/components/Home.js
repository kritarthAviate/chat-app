import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const disabled = !userName?.trim()?.length;
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Enter Username to get started</h2>
      <input
        autoComplete="off"
        type="text"
        minLength={3}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        className={disabled ? "home__cta__disabled" : "home__cta"}
        disabled={disabled}
      >
        Enter
      </button>
    </form>
  );
};
export default Home;
