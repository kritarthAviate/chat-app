import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";

import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";

const socket = socketIO.connect(
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"
);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage socket={socket} />}></Route>
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage socket={socket} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
