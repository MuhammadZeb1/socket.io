import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [message, setmessage] = useState("");
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("welcome", (m) => {
      console.log("📩", m);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handle = (e) => {
    e.preventDefault(); // typo fixed
    if (message.trim()) {
      socket.emit("message", message);
      setmessage(""); // reset input field
    }
  };

  return (
    <>
      <form onSubmit={handle}>
        <input
          type="text"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
