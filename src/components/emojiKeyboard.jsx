import React from "react";
import { emojiMapping } from "../utils/emojiMapping";
import "../assets/styles/emojiKeyboard.css"; // Import the CSS file

export default function EmojiKeyboard({ onSelectEmoji }) {
  return (
    <div className="emoji-keyboard-container">
      {Object.keys(emojiMapping).map((emoji, index) => (
        <button 
          key={index} 
          type="button"
          onClick={() => onSelectEmoji(emoji)}
          className="emoji-keyboard-btn" // Apply the class for button
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
