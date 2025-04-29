// src/utils/hashUtils.js
import CryptoJS from 'crypto-js';
import { getEmojiName } from './emojiAPI';

export async function hashEmojiPassword(emojiPassword) {
  const text = await emojiToText(emojiPassword); // Use the API to convert emojis to text
  const hash = CryptoJS.SHA256(text).toString(CryptoJS.enc.Base64);
  return hash;
}

async function emojiToText(emojiPassword) {
  const emojiNames = await Promise.all(
    emojiPassword.split('').map(async (emoji) => await getEmojiName(emoji))
  );
  return emojiNames.join('');
}
