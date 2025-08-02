import "./DeleteBudgetModal.css";
import "./AddModal.css";
import { toast } from "react-toastify";
import BudgetContext from "../Context/BudgetContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const DeleteBudgetModal = (props) => {
  const { budgetItem, setIsDelModalOpen } = props;
  const budgetContext = useContext(BudgetContext);
  const { deleteBudget } = budgetContext;
  const navigate = useNavigate();

  // delete budget
  const handleContinue = async () => {
    const deletedBudget = await deleteBudget(budgetItem.key);
    if (deletedBudget) {
      toast("Budget deleted");
      navigate("/budget");
      setIsDelModalOpen(false);
    } else {
      toast("Cannot delete the budget");
    }
  };

  return (
    <div className="modal-container">
      <div className="delete-msg-content">
        <p className="delete-msg-title">Are you sure?</p>
        <p className="delete-msg">
          This cannot be undone. This will delete the budget and all its
          expenses.
        </p>
        <div className="delmodal-btn-container">
          <button
            className="btn modal-btn"
            onClick={() => setIsDelModalOpen(false)}
          >
            Cancel
          </button>
          <button className="btn modal-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBudgetModal;
