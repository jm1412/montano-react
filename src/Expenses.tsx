import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the structure of an Expense object
interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch expenses from Django server
    axios
      .get<Expense[]>("http://your-django-server.com/api/expenses/")
      .then((response) => {
        setExpenses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch expenses");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Expenses</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount} on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
