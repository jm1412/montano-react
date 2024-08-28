import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Import AuthContext

function MenuBar() {
  const { isAuthenticated, logout } = useContext(AuthContext); // Use isAuthenticated and logout from context

  const handleLogout = (event) => {
    event.preventDefault(); // Prevent default link navigation
    logout(); // Perform logout action
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <strong>Montano</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/" className="secondary">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="secondary">
              About
            </Link>
          </li>
          <li>
            <details className="dropdown">
              <summary>Apps</summary>
              <ul dir="rtl">
                <li>
                  <Link to="/gasto">Gasto</Link>
                </li>
                <li>
                  <Link to="#">Settings</Link>
                </li>
              </ul>
            </details>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/" onClick={handleLogout} className="secondary">
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="secondary">
                Login
              </Link>
            </li>
          )}            <li>
          <Link to="/create-expense" className="secondary">
            Create Expense
          </Link>
        </li>
        </ul>
      </nav>
    </header>
  );
}

export default MenuBar;
