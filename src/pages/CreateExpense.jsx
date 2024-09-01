import React, { useState } from "react";
import axiosInstance from "../axiosConfig"; // Import the configured Axios instance

const CreateExpense = () => {
  // Get today's date in "YYYY-MM-DD" format
  const today = new Date().toISOString().split("T")[0];

  // State variables
  const [telegramId, setTelegramId] = useState("12345678");
  const [amount, setAmount] = useState(100);
  const [timezone, setTimezone] = useState("Asia/Manila");
  const [expenseComment, setExpenseComment] = useState("Test");
  const [category, setCategory] = useState("Miscellaneous");
  const [date, setDate] = useState(today);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to be sent in the POST request
    const data = {
      telegram_id: telegramId,
      amount: amount,
      timezone: timezone,
      expense_comment: expenseComment,
      category: category,
      date: date,
    };

    try {
      // Make POST request using the configured Axios instance
      const response = await axiosInstance.post(
        "/ipon_goodbot/goodbot_postexpense/",
        data
      );

      // Log success message
      console.log("Success:", response.data);
    } catch (error) {
      // Log error message
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Telegram ID"
        value={telegramId}
        onChange={(e) => setTelegramId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Timezone"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Expense Comment"
        value={expenseComment}
        onChange={(e) => setExpenseComment(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Create Expense</button>
    </form>
  );
};

export default CreateExpense;
