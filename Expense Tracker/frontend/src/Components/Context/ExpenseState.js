import { useState } from "react";
import ExpenseContext from "./ExpenseContext";

const ExpenseState = (props) => {
  const [expenses, setExpenses] = useState([]);

  const host = "http://localhost:5000/api/expense";

  // fetch the get all expenses api
  const fetchExpenses = async () => {
    const url = `${host}/fetchallexpenses`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setExpenses(json.expenses);
      } else {
        console.error("Cannot fetch the expenses");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  // fetch the get expenses by budget name api
  const fetchExpensesByBudget = async (budget) => {
    const url = `${host}/fetchexpensebybudget/${budget}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setExpenses(json.expenses);
        return true;
      } else {
        console.error("Cannot fetch the expenses");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  // fetch the add expense api
  const addExpense = async (expense, budget) => {
    const url = `${host}/addexpense`;
    const { name, amount } = expense;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          name,
          amount,
          budget,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setExpenses(expenses.concat(json.expense));
        return true;
      } else {
        console.error("Cannot add the expense");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  // fetch the delete expense api
  const deleteExpense = async (id) => {
    const url = `${host}/deleteexpense/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        const updatedExpenses = expenses.filter((item) => item.key !== id);
        setExpenses(updatedExpenses);
        return true;
      } else {
        console.error("Cannot delete the expense");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };
  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        fetchExpenses,
        fetchExpensesByBudget,
        addExpense,
        deleteExpense,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseState;
