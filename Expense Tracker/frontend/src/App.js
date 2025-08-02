import Register from "./Components/Login Register Forms/Register";
import "./App.css";
import { UserState } from "./Components/Context/UserState";
import Login from "./Components/Login Register Forms/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import Budget from "./Components/Budget/Budget";
import BudgetState from "./Components/Context/BudgetState";
import MyExpenses from "./Components/Expense/MyExpenses";
import ExpenseState from "./Components/Context/ExpenseState";
import AllExpense from "./Components/Expense/AllExpenses";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  useEffect(() => {
    // get auth-token
    setIsLoggedIn(!!localStorage.getItem("authToken"));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Router>
        <UserState>
          <BudgetState>
            <ExpenseState>
              {/* set routes */}
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    isLoggedIn ? (
                      <Home setIsLoggedIn={setIsLoggedIn} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                >
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route exact path="/allexpenses" element={<AllExpense />} />
                  <Route exact path="/budget" element={<Budget />} />
                  <Route exact path="/myexpenses" element={<MyExpenses />} />
                </Route>
                <Route
                  exact
                  path="/login"
                  element={
                    !isLoggedIn ? (
                      <Login setIsLoggedIn={setIsLoggedIn} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  exact
                  path="/register"
                  element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
                />
              </Routes>
            </ExpenseState>
          </BudgetState>
        </UserState>
      </Router>
    </>
  );
}

export default App;
