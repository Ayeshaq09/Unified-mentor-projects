import { useLocation, useNavigate } from "react-router-dom";
import AddModal from "../ModalForms/AddModal";
import BudgetItem from "../Budget/BudgetItem";
import "./MyExpenses.css";
import { useContext, useEffect, useState } from "react";
import ExpenseContext from "../Context/ExpenseContext";
import ModalWrapper from "../ModalForms/ModalWrapper";
import DeleteBudgetModal from "../ModalForms/DeleteBudgetModal";
import Expense from "./Expense";

const MyExpenses = () => {
  const location = useLocation();
  const budget = location.state?.budget;
  const expenseContext = useContext(ExpenseContext);
  const { expenses, fetchExpensesByBudget } = expenseContext;

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  useEffect(() => {
    // fetch expenses by budget name
    if (budget && budget.name) {
      fetchExpensesByBudget(budget.name);
    }
    // eslint-disable-next-line
  }, []);

  const handleBudgetEdit = () => {
    setIsModalOpen(true);
  };

  const handleBudgetDel = () => {
    setIsDelModalOpen(true);
  };

  // get expenses count under selected budget
  const getExpenseCount = (budgetName) => {
    const itemCount = expenses.filter(
      (item) => item.budget === budgetName
    ).length;
    return itemCount;
  };

  // get total spent amount on expenses
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

  // get total amount remaining in budgets
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

  // set progress bar value
  const progressBarValue = (budgetName, budgetAmount) => {
    const spent = spentAmount(budgetName);
    const percent = (spent / parseInt(budgetAmount)) * 100;
    return Math.round(percent);
  };

  return (
    <>
      {isModalOpen && (
        <ModalWrapper
          setIsModalOpen={setIsModalOpen}
          title={"Update Budget"}
          budgetItem={budget}
        />
      )}
      {isDelModalOpen && (
        <DeleteBudgetModal
          setIsDelModalOpen={setIsDelModalOpen}
          budgetItem={budget}
        />
      )}
      <div className="expenses-container">
        <div className="myexpenses-header">
          <h2
            className="heading myexpenses-heading"
            onClick={() => navigate("/budget")}
          >
            <i className="bi bi-arrow-left"></i>My Expenses
          </h2>
          <div className="btns-container">
            <button
              className="btn edit-btn"
              onClick={() => {
                handleBudgetEdit();
              }}
            >
              <i className="bi bi-pencil-square icon"></i>Edit
            </button>
            <button
              className="btn del-btn"
              onClick={() => {
                handleBudgetDel();
              }}
            >
              <i className="bi bi-trash-fill icon"></i>Delete
            </button>
          </div>
        </div>
        <div className="budget-expense-container">
          <div className="budget-item-container">
            <BudgetItem
              item={budget}
              expenseCount={getExpenseCount(budget.name)}
              spentAmount={spentAmount(budget.name)}
              remainingAmount={remainingAmount(budget.name, budget.amount)}
              progressBarValue={progressBarValue(budget.name, budget.amount)}
            />
          </div>
          <div className="addmodal-container">
            <AddModal
              title={"Expense"}
              budget={budget.name}
              remainingAmount={remainingAmount(budget.name, budget.amount)}
            />
          </div>
        </div>
        <div className="budget-expenses">
          {expenses && expenses.length > 0 ? (
            <Expense expenses={expenses} />
          ) : (
            <div className="no-records">
              No expenses to display, please add budgets and expenses
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyExpenses;
