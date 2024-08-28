import React, { useState } from "react";
import axios from "axios";

const CreateExpense = () => {
  const [telegramId, setTelegramId] = useState("");
  const [amount, setAmount] = useState("");
  const [timezone, setTimezone] = useState("");
  const [expenseComment, setExpenseComment] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the access token from local storage
    const token = localStorage.getItem("accessToken");

    const data = {
      telegram_id: telegramId,
      amount: amount,
      timezone: timezone,
      expense_comment: expenseComment,
      category: category,
      date: date,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/ipon_goodbot/goodbot_postexpense/", data, {
        headers: {
          "Content-Type": "application/json",
          // Include the token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

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
