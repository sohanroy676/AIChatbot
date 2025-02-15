import React, { useState, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Function to handle sending messages
  const sendMessage = async () => {
    if (!input) return;

    // Add user message to state immediately
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      console.log("Backend Response:", data); // Debugging

      if (data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, sender: "bot" }, // Add bot response correctly
        ]);
      } else {
        console.error("No response received from server");
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput(""); // Clear input field
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  // Text-to-Speech (Bot Voice)
  const speak = (text) => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis is not supported in your browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="chat-container">
      <h1>AI Chatbot</h1>

      <div className="chatbox">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={startListening}>
          {isListening ? "🎤 Listening..." : "Speak"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
