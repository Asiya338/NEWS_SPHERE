// ChatRoom.js

import { useState, useEffect } from "react";

const Notes = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://news-sphere-backend.onrender.com/messages"
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    try {
      await fetch("https://news-sphere-backend.onrender.com/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, message }),
      });

      // Clear the message input after sending
      setUser("");
      setMessage("");
      // Fetch messages to update the list
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-20">
      <ul className="p-0 ">
        {messages.map((message) => (
          <li key={message._id} className="m-5 p-10 rounded-md notes">
            <strong>{message.user}:</strong>
            <br />

            {message.message}
          </li>
        ))}
      </ul>
      <div className="mt-10 ">
        <input
          type="text"
          placeholder="Enter title "
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-5 mr-10 rounded-md ml-20"
        />
        <input
          className="p-5 mr-10 rounded-md ml-20 mt-2"
          type="text"
          placeholder="Type your notes..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className=" text-white font-bold p-5 rounded button"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Notes;
