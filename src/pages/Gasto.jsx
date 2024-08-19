import React, { useState } from "react";
import styles from "./Gasto.module.css";

function GetExpensesFromServer() {
  // Get expense details from server.

  // Sample data only.
  const categories = {
    Housing: 0,
    Transportation: 5.75,
    Food: 40,
    Health: 30,
    Personal: 10,
    Entertainment: 5,
    Shopping: 35,
    Savings: 100,
    Debt: 30,
    Miscellaneous: 0,
  };

  // Sample expense breakdown from django
  const detailedBreakdown = {
    Housing: ["Rent: $0", "Utilities: $0"],
    Transportation: ["Bus: $2.00", "Gas: $3.75"],
    Food: ["Groceries: $30", "Dining Out: $10"],
    Health: ["Doctor: $20", "Medication: $10"],
    Personal: ["Gym: $10"],
    Entertainment: ["Movies: $5"],
    Shopping: ["Clothes: $20", "Gadgets: $15"],
    Savings: ["Emergency Fund: $50", "Investments: $50"],
    Debt: ["Credit Card: $20", "Loan: $10"],
    Miscellaneous: [],
  };

  return { categories, detailedBreakdown };
}

function Gasto() {
  const { categories, detailedBreakdown } = GetExpensesFromServer();
  const entries = Object.entries(categories);

  function GetExpenseEntries(entries, start, end) {
    /*
    Gets expense entries and returns them in a card
    */
    return entries.slice(start, end).map(([category, total]) => (
      <div
        className="col-sm"
        id={styles.expenseDiv}
        key={`expense-div-${category}`}
      >
        <article
          className={styles.expenseEntry}
          key={`expense-entry-${category}`}
          onClick={() => ExpandExpenseCategory(category)}
        >
          <span>{category}</span> : <span>{total}</span>
        </article>
      </div>
    ));
  }

  function ExpenseList() {
    /* 
    Makes the list of expenses for display in UserView
    Uses GetExpenseEntries to make the cards
    */
    const itemsPerRow = 2; // Columns per row
    const rows = [];
    for (let i = 0; i < entries.length; i += itemsPerRow) {
      rows.push(
        <div className="row" key={`row-${i}`}>
          {GetExpenseEntries(entries, i, i + itemsPerRow)}
        </div>
      );
    }
    return (
      <>
        <h2>Today's Expenses</h2>
        {rows}
      </>
    );
  }

  const ExpandExpenseCategory = (category) => {
    /* When user clicks on expense card, shows breakdown of that expense
    Uses setUserView to what user views
    */
    const details = detailedBreakdown[category] || ["No details available"];
    setUserView(
      <div className={styles.detailedView}>
        <h4>{category} Breakdown</h4>
        <ul>
          {details.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button onClick={() => setUserView(<HomePage />)}>Back</button>
      </div>
    );
  };

  const CreateButton = ({ label, onClickHandler, className }) => {
    return (
      <button className={className} onClick={onClickHandler}>
        {label}
      </button>
    );
  };

  const BackButton = () => {
    // Can be used as back for certain pages, or Home
    // Brings user to home page
    return (
      <CreateButton
        label="Back"
        onClickHandler={() => setUserView(<HomePage />)}
        className={styles.button}
      />
    );
  };

  const AddExpenseButton = () => {
    return (
      <CreateButton
        label="Add Expense"
        onClickHandler={InitiateAddExpense}
        className={styles.button}
      />
    );
  };

  const ViewExpenseButton = () => {
    return (
      <CreateButton
        label="View Expenses"
        onClickHandler={setUserView(<HomePage />)}
        className={styles.button}
      />
    );
  };

  const HomePage = () => {
    return (
      <>
        <ExpenseList />
        <Buttons />
      </>
    );
  };

  const Buttons = () => {
    return (
      <>
        <div className={`${styles.buttons} grid`}>{availableButtons}</div>
      </>
    );
  };

  function InitiateAddExpense() {
    const AddExpenseForm = () => {
      return (
        <>
          <article>
            <form>
              <fieldset>
                <label>
                  First name
                  <input
                    name="first_name"
                    placeholder="First name"
                    autocomplete="given-name"
                  />
                </label>
                <select name="favorite-cuisine" aria-label="Category" required>
                  <option selected disabled value="">
                    Select your favorite cuisine...
                  </option>
                  <option>Italian</option>
                  <option>Japanese</option>
                  <option>Indian</option>
                  <option>Thai</option>
                  <option>French</option>
                </select>
              </fieldset>
              <input type="submit" value="Submit" />
            </form>
          </article>
        </>
      );
    };

    setUserView(
      <>
        <h2>Add Expense</h2>
        <AddExpenseForm />
      </>
    );
  }

  const [userView, setUserView] = useState(<HomePage />);
  const [availableButtons, setAvailableButtons] = useState(
    <>
      <ViewExpenseButton />
      <AddExpenseButton />
    </>
  );

  return (
    <>
      <div className={`${styles.expenseContainer} container`}>{userView}</div>
    </>
  );
}

export default Gasto;
