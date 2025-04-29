import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emojiMapping } from "../utils/emojiMapping";
import EmojiKeyboard from "./emojiKeyboard";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

import "../assets/styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const navigate = useNavigate();
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
      toast.warning("Please select at least 3 emojis.");
      return;
    }
    if (!email) {
      toast.info("Please enter email!");
      return;
    }

    // Step 1: Map emojis and create salted hash
    const mapped = selectedEmojis.map((emoji) => emojiMapping[emoji]).join("-");
    const saltedString = mapped + email;
    const hashedPassword = CryptoJS.SHA256(saltedString).toString();

    try {
      // Step 2: Search for the user from SheetDB by email
      const response = await fetch(`https://sheetdb.io/api/v1/xt2cf0v1lqbz1/search?email=${email}`);
      const users = await response.json();

      if (users.length === 0) {
        toast.error("User not found!");
        return;
      }

      const user = users[0]; // First matching user

      // Step 3: Compare passwords
      if (user.password === hashedPassword) {
        toast.success("Login Successful!");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", email);
        localStorage.setItem("name", user.name);

        // Step 4: Update lastLoggedAt in SheetDB
        await fetch(`https://sheetdb.io/api/v1/xt2cf0v1lqbz1/email/${email}`, {
          method: "PATCH",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              lastLoggedAt: new Date(date.getTime()+330*60*1000),
            }
          }),
        });

        navigate("/"); // Go to home
      } else {
        toast.error("Invalid Credentials!");
      }
    } catch (error) {
      console.error("❌ Error during login:", error);
      toast.error("Login failed. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="text"
          value={selectedEmojis.join("")}
          placeholder="Enter Emoji Password"
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

        <button type="submit" className="login-btn">
          Login
        </button>
        <p>wanna register? Click <a href="/register">here</a>!</p>
      </form>
    </div>
  );
}
