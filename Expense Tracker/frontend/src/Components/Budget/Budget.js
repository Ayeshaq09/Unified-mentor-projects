import BudgetContext from "../Context/BudgetContext";
import "./Budget.css";
import { useContext, useEffect, useState } from "react";
import BudgetItem from "./BudgetItem";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../ModalForms/ModalWrapper";
import ExpenseContext from "../Context/ExpenseContext";

const Budget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const budgetContext = useContext(BudgetContext);
  const { budgets, fetchBudget } = budgetContext;
  const navigate = useNavigate();

  const expenseContext = useContext(ExpenseContext);
  const { expenses, fetchExpenses } = expenseContext;

  useEffect(() => {
    // fetch expenses and budgets
    fetchBudget();
    fetchExpenses();
    // eslint-disable-next-line
  }, []);

  const handleAddBudget = () => {
    setIsModalOpen(true);
  };

  const handleClick = (item) => {
    // navigate to myexpenses and set state to selected budget
    navigate("/myexpenses", {
      state: {
        budget: item,
      },
    });
  };

  // get total number of expenses under selected budget
  const getExpenseCount = (budgetName) => {
    const itemCount = expenses.filter(
      (item) => item.budget === budgetName
    ).length;
    return itemCount;
  };

  // get total spent amount by user on expenses
  const spentAmount = (budgetName) => {
    let sum = 0;
    const expAmount = [];
    expenses.forEach((item) => {
      if (item.budget === budgetName) {
        expAmount.push(item.amount);
      }
    });

    for (const amt of expAmount) {
      sum += parseInt(amt);
    }
    return sum;
  };

  // get total amount remaining from all the budgets
  const remainingAmount = (budgetName, budgetAmount) => {
    let sum = 0;
    const expAmount = [];
    expenses.forEach((item) => {
      if (item.budget === budgetName) {
        expAmount.push(item.amount);
      }
    });

    for (const amt of expAmount) {
      sum += parseInt(amt);
    }
    return parseInt(budgetAmount) - sum;
  };

  // set the progress bar value
  const progressBarValue = (budgetName, budgetAmount) => {
    const spent = spentAmount(budgetName);
    const percent = (spent / parseInt(budgetAmount)) * 100;
    return Math.round(percent);
  };

  return (
    <>
      {isModalOpen && (
        <ModalWrapper setIsModalOpen={setIsModalOpen} title={"Budget"} />
      )}

      <div className="budget-container">
        <h2
          className="heading"
          onClick={() => navigate("/budget")}
        >
          Budgets
        </h2>
        <div className="budget-card-container">
          <div className="budget-add-card" onClick={() => handleAddBudget()}>
            <i className="bi bi-plus-lg"></i>
            <p>Create New Budget</p>
          </div>
          {/* display all budgets */}
          {budgets &&
            budgets.length > 0 &&
            budgets.map((item) => {
              return (
                <BudgetItem
                  item={item}
                  onclick={() => handleClick(item)}
                  expenseCount={getExpenseCount(item.name)}
                  spentAmount={spentAmount(item.name)}
                  remainingAmount={remainingAmount(item.name, item.amount)}
                  progressBarValue={progressBarValue(item.name, item.amount)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Budget;
