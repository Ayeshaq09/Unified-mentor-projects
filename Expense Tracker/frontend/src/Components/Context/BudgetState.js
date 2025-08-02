import { useState } from "react";
import BudgetContext from "./BudgetContext";

const BudgetState = (props) => {
  const [budgets, setBudgets] = useState([]);

  const host = "http://localhost:5000/api/budget";

  // fetch the add budget api
  const addBudget = async (budget) => {
    const url = `${host}/addbudget`;
    const { name, amount } = budget;

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
        }),
      });

      const json = await response.json();
      if (json.success) {
        setBudgets(budgets.concat(json.budget));
        return true;
      } else {
        console.error("Cannot add the budget");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  // fetch the get all budgets api
  const fetchBudget = async () => {
    const url = `${host}/fetchbudget`;

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
        setBudgets(json.budgets);
        return true;
      } else {
        console.error("Cannot fetch the budgets");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  // fetch the update budget api
  const updateBudget = async (id, budget) => {
    const url = `${host}/updatebudget/${id}`;
    const { name, amount } = budget;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          name,
          amount,
        }),
      });

      const json = await response.json();
      if (json.success) {
        const updatedBudgets = budgets.map((item) => {
          if (item.key === id) {
            return { ...item, name: name, amount: amount };
          }
          return item;
        });
        setBudgets(updatedBudgets);
        return true;
      } else {
        console.error("Cannot fetch the budgets");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  // fetch the delete budget api
  const deleteBudget = async (id) => {
    const url = `${host}/deletebudget/${id}`;
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
        const updatedBudgets = budgets.filter((item) => item.key !== id);
        setBudgets(updatedBudgets);
        return true;
      } else {
        console.error("Cannot fetch the budgets");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  return (
    <BudgetContext.Provider
      value={{ budgets, addBudget, fetchBudget, updateBudget, deleteBudget }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
};

export default BudgetState;
