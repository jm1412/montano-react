import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import "./WordlePage.css";

const WordlePage = () => {
  const [token, setToken] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [guessHistory, setGuessHistory] = useState([]); // Track previous guesses and feedback

  // Fetch a new word and token when the component mounts
  useEffect(() => {
    fetchNewWord();
  }, []);

  // Fetch a new word and token from the backend
  const fetchNewWord = async () => {
    try {
      const response = await axiosInstance.get("wordle/new/");
      setToken(response.data.token);
      setGuess(""); // Reset the current guess
      setFeedback([]); // Clear previous feedback
      setGuessHistory([]); // Reset the guess history
    } catch (error) {
      console.error("Error fetching new word:", error);
    }
  };

  // Handle the submission of a guess
  const handleGuess = async () => {
    try {
      if (guess.length !== 5) {
        alert("Guess must be 5 letters long!");
        return;
      }

      const response = await axiosInstance.post("wordle/submit-guess/", {
        guess,
        token,
      });

      setFeedback(response.data.feedback);

      // Store guess and feedback in history
      setGuessHistory((prevHistory) => [
        ...prevHistory,
        { guess: guess.split(""), feedback: response.data.feedback },
      ]);

      // Reset the input field for the next guess
      setGuess("");
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
        <div className="wordle-grid">
          {guessHistory.map((entry, rowIndex) => (
            <div key={rowIndex} className="wordle-row">
              {entry.guess.map((letter, index) => (
                <div
                  key={index}
                  className={`wordle-cell wordle-cell-${entry.feedback[index]}`}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="wordle-input">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value.toUpperCase())}
            maxLength={5}
            placeholder="Enter your guess"
          />
          <button onClick={handleGuess}>Submit Guess</button>
          <button onClick={fetchNewWord}>New Word</button>
        </div>
      </div>
    </div>
  );
};

export default WordlePage;