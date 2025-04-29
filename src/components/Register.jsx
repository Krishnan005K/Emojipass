import React, { useState } from "react";
import { emojiMapping } from "../utils/emojiMapping";
import EmojiKeyboard from "./emojiKeyboard";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

import "../assets/styles/Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const date = new Date();
  const handleEmojiSelect = (emoji) => {
    if (selectedEmojis.length < 8) {
      setSelectedEmojis((prev) => [...prev, emoji]);
    }
  };

  const handleBackspace = () => {
    setSelectedEmojis((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedEmojis.length < 3) {
      toast.warning("Please select at least 3 emojis for password.");
      return;
    }
    if (!email) {
      toast.info("Please enter your email!");
      return;
    }

    // Step 1: Map emojis to internal codes
    const mapped = selectedEmojis.map((emoji) => emojiMapping[emoji]).join("-");

    // Step 2: Create salted password
    const saltedString = mapped + email;
    const hashedPassword = CryptoJS.SHA256(saltedString).toString();



    try {
      // Send POST request to SheetDB API
      const response = await fetch("https://sheetdb.io/api/v1/[Your API Endpoint ]", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              name: name,
              email: email,
              password: hashedPassword,
              registeredTime: new Date(date.getTime() + 330 * 60 * 1000),
            }
          ]
        }),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        console.log("User registered successfully", data);
        toast.success("Registered Successfully!");

        // Reset form fields after successful registration
        setEmail("");
        setName("");
        setSelectedEmojis([]);
        setShowKeyboard(false);
        Navigate('/login');
      } else {
        throw new Error("Error saving data to SheetDB.");
      }
    } catch (error) {
      console.error("❌ Error saving to SheetDB:", error);
      toast.error("Failed to register. Try again later!");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          required
          className="name-input"
        />
        <input
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="text"
          value={selectedEmojis.join("")}
          placeholder="Select emoji password"
          readOnly
          onFocus={() => setShowKeyboard(true)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              e.preventDefault();
              handleBackspace();
            }
          }}
          className="emoji-input"
        />

        {showKeyboard && (
          <div className="emoji-keyboard-container">
            <EmojiKeyboard onSelectEmoji={handleEmojiSelect} />
          </div>
        )}

        <button type="submit" className="register-btn">
          Register
        </button>
        <p>wanna Login? Click <a href="/login">here</a>!</p>
      </form>
    </div>
  );
}
