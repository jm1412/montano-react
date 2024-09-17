import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import "./WordlePage.css";

// Utility function to get a cookie value by name
const getCookie = (name) => {
  const cookieValue = `; ${document.cookie}`;
  const parts = cookieValue.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const WordlePage = () => {
  const [word, setWord] = useState("");
  const [token, setToken] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState([]);

  // Fetch a new word and token when the component mounts
  useEffect(() => {
    fetchNewWord();
  }, []);

  // Fetch a new word and token from the backend
  const fetchNewWord = async () => {
    try {
      const response = await axiosInstance.get("wordle/new/");
      setWord(response.data.word);
      setToken(response.data.token);
    } catch (error) {
      console.error("Error fetching new word:", error);
    }
  };

  // Handle the submission of a guess
  const handleGuess = async () => {
    try {
      const response = await axiosInstance.post("wordle/submit-guess/", {
        guess,
        token,
      });
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error submitting guess:", error);
    }
  };

  return (
    <div className="wordle-container">
      <div className="wordle-header">
        <h1>Wordle Game</h1>
      </div>
      <div className="wordle-body">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          maxLength={5}
          placeholder="Enter your guess"
        />
        <button onClick={handleGuess}>Submit Guess</button>
        <button onClick={fetchNewWord}>New Word</button>
        <div className="feedback">
          {feedback.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordlePage;
