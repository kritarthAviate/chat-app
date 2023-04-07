import React, { useRef, useState } from "react";
const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const timeout = useRef(null);
  const typing = useRef(false);

  const timeoutFunction = () => {
    typing.current = false;
    socket.emit("stopTyping");
  };

  const handleTyping = () => {
    if (!typing.current) {
      typing.current = true;
      socket.emit("typing", `${localStorage.getItem("userName")} is typing`);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(timeoutFunction, 1000);
    } else {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(timeoutFunction, 1000);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};
export default ChatFooter;
