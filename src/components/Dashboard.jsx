import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
    let login ="Login";
  if (localStorage.getItem("isLoggedIn")) {
        navigate("/");
        login="Logout";
       
  }
  const handleSubmit = () => {
    if(localStorage.getItem('isLoggedIn'))
    {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        navigate('/')
    }
    else{
        navigate('/register');
    }
  };


  return (
    <div className="homepage-container">
      <h1>Welcome to Emojipass! {localStorage.getItem("name")}</h1>
      <p>Your password is safe and secure with emojis. Have fun with your emoji passwords!</p>
      <button className="logout-btn" onClick={handleSubmit}>
        {login}
      </button>
    </div>
  );
}