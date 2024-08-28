import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { lazy } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Gasto from "./pages/Gasto";
import Login from "./pages/Login";
import CreateExpense from "./pages/CreateExpense";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/gasto"
              element={
                <ProtectedRoute>
                  <Gasto />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/create-expense" element={<ProtectedRoute><CreateExpense/></ProtectedRoute>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
