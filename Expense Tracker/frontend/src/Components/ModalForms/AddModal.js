import { useContext, useEffect, useState } from "react";
import "./AddModal.css";
import BudgetContext from "../Context/BudgetContext";
import { toast } from "react-toastify";
import ExpenseContext from "../Context/ExpenseContext";
import { useNavigate } from "react-router-dom";

const AddModal = (props) => {
  const { setIsModalOpen, title, budget, budgetItem, remainingAmount } = props;
  const [formValues, setFormValues] = useState({
    name: "",
    amount: "",
  });
  const budgetContext = useContext(BudgetContext);
  const { addBudget, updateBudget } = budgetContext;

  const expenseContext = useContext(ExpenseContext);
  const { addExpense, fetchExpensesByBudget } = expenseContext;

  const navigate = useNavigate();

  useEffect(() => {
    // set the form values
    if (budgetItem) {
      setFormValues({
        name: budgetItem.name,
        amount: budgetItem.amount,
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // add budget
    if (title === "Budget") {
      const addedBudget = await addBudget(formValues);
      if (addedBudget) {
        toast("Budget added!");
      } else {
        toast("Cannot add the budget!");
      }
      setIsModalOpen(false);
    }

    // add expense
    if (title === "Expense") {
      if (formValues.amount <= remainingAmount) {
        const addedExpense = await addExpense(formValues, budget);
        if (addedExpense) {
          toast("Expense added!");
          setFormValues({
            name: "",
            amount: "",
          });
        } else {
          toast("Cannot add expense!");
        }
      } else {
        toast("There's no enough amount to add this expense!");
      }
    }

    // update budget
    if (title === "Update Budget") {
      const updatedBudget = await updateBudget(budgetItem.key, formValues);
      if (updatedBudget) {
        toast("Budget updated!");
        fetchExpensesByBudget(formValues.name);
        navigate("/myexpenses", {
          state: {
            budget: {
              key: budgetItem.key,
              name: formValues.name,
              amount: formValues.amount,
            },
          },
        });
      } else {
        toast("Cannot update the budget!");
      }
      setIsModalOpen(false);
    }
  };

  // reset form values
  const handleReset = () => {
    setFormValues({
      name: "",
      amount: "",
    });
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2>{`${
          title === "Update Budget" ? "Update Budget" : `Add ${title}`
        }`}</h2>
        {(title === "Budget" || title === "Update Budget") && (
          <span onClick={() => handleClose()}>
            <i class="bi bi-x"></i>
          </span>
        )}
      </div>
      <div className="modal-form-container">
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={`${
              title === "Update Budget" ? "Budget name" : `${title} name`
            }`}
            className="input modal-input"
            value={formValues.name}
            name="name"
            onChange={onChange}
          />
          <input
            type="number"
            placeholder={`${
              title === "Update Budget" ? "Budget amount" : `${title} amount`
            }`}
            className="input modal-input"
            value={formValues.amount}
            name="amount"
            onChange={onChange}
          />
          <div className="modal-btn-container">
            <button type="submit" className="btn modal-btn">
              {title !== "Update Budget" ? `Add ${title}` : `${title}`}
            </button>
            <button
              type="reset"
              className="btn modal-btn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
