// src/utils/emojiAPI.js
import axios from 'axios';

const API_KEY = '233a573bc4f1123528a3a4904c3cd5ed1526ce6d'; // Replace with your Open Emoji API key

export async function getEmojiName(emoji) {
  try {
    const response = await axios.get(
      `https://emoji-api.com/emojis?access_key=${API_KEY}`
    );
    const emojiData = response.data;

    // Search for the emoji's name in the API data
    const emojiInfo = emojiData.find(item => item.character === emoji);
    return emojiInfo ? emojiInfo.name : emoji; // Return name or emoji itself if not found
  } catch (error) {
    console.error('Error fetching emoji data:', error);
    return emoji; // Return the emoji itself in case of an error
  }
}
