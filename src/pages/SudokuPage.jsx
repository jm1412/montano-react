import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import "./SudokuPage.css";

const SudokuPage = () => {
  const [board, setBoard] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);

  // Fetch the Sudoku puzzle on component mount
  useEffect(() => {
    fetchPuzzle();
  }, []);

  // Fetch the Sudoku puzzle from the API
  const fetchPuzzle = async () => {
    try {
      const response = await axiosInstance.get("sudoku/create-sudoku/41/");
      setBoard(response.data.puzzle);
      setInitialBoard(response.data.puzzle.map((row) => row.slice())); // Create a copy for checking pre-filled cells
    } catch (error) {
      console.error("Error fetching Sudoku puzzle:", error);
    }
  };

  // Handle cell selection
  const handleCellClick = (row, col) => {
    if (isCellEditable(row, col)) {
      setSelectedCell({ row, col });
    }
  };

  // Handle number button click
  const handleButtonClick = (number) => {
    if (selectedCell) {
      const { row, col } = selectedCell;

      // Check if the cell is editable before updating the board
      if (isCellEditable(row, col)) {
        const newBoard = board.map((r, rIndex) =>
          r.map((cell, cIndex) =>
            rIndex === row && cIndex === col ? number : cell
          )
        );
        setBoard(newBoard);

        if (isBoardComplete(newBoard)) {
          validateBoard(newBoard);
        }
      }
    }
  };

  // Check if the cell is editable (i.e., was not pre-filled)
  const isCellEditable = (row, col) => {
    return initialBoard[row][col] === null; // Cells with `null` were originally empty
  };

  // Check if the board is fully filled
  const isBoardComplete = (board) => {
    return board.flat().every((cell) => cell !== null);
  };

  // Validate the Sudoku board through the API
  const validateBoard = async (board) => {
    try {
      const response = await axiosInstance.post("sudoku/validate-sudoku/", {
        board,
      });
      const { valid, completed } = response.data;

      if (completed && valid) {
        const restart = window.confirm(
          "Congratulations! The board is complete and valid. Do you want to start a new game?"
        );
        if (restart) {
          fetchPuzzle();
        }
      } else if (!valid) {
        alert("The board is not valid. Please check your entries.");
      }
    } catch (error) {
      console.error("Error validating Sudoku board:", error);
    }
  };

  return (
    <div className="sudoku-container">
      <table className="sudoku-board">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`sudoku-cell ${
                    cell === null ? "empty" : "filled"
                  } ${
                    isCellEditable(rowIndex, colIndex) ? "editable" : "fixed"
                  } ${
                    selectedCell &&
                    selectedCell.row === rowIndex &&
                    selectedCell.col === colIndex
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className="number-button"
            onClick={() => handleButtonClick(number)}
          >
            {number}
          </button>
        ))}
        <button
          key="none"
          className="number-button"
          onClick={() => handleButtonClick(null)}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SudokuPage;
