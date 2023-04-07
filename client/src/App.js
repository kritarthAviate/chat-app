import socketIO from "socket.io-client";
const socket = socketIO("http://localhost:8080");

function App() {
  console.log({ socket });
  return (
    <div>
      <p>Hello World!</p>
    </div>
  );
}

export default App;
