 
# 🧠Emojipass - Emoji-Based Login System

A fun and secure experiment that reimagines the login process — using **emojis** instead of traditional text passwords!  
This lightweight web app uses **Google Sheets + SheetDB.io** for user data storage and tracks user sessions, all built with **React + Vite**.

---

## 🚀 Features

- ✅ Emoji-based password system
- 🔐 Passwords hashed with **SHA-256** (salted using email)
- 🗂️ Google Sheets as database (via SheetDB.io)
- ⏱️ Tracks `lastLoggedAt` time in **IST**
- 📦 Session storage for login state
- 📋 Minimal & clean UI with emoji keyboard

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite  
- **Backend (No-code)**: Google Sheets + [SheetDB.io](https://sheetdb.io)  
- **Styling**: CSS  
- **Security**: SHA-256 encryption via `crypto-js`  
- **Notifications**: `react-toastify`

---

## 🔗 Live Demo & GitHub

- 🚀 Live Demo: https://emojipass.vercel.app/  


---

## 📦 Installation

```bash
git clone https://github.com/your-username/emoji-login.git
cd emoji-login
npm install
npm run dev
