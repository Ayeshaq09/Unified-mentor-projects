import "./BudgetItem.css";

// budget card
const BudgetItem = (props) => {
  const { item, onclick, expenseCount, spentAmount, remainingAmount, progressBarValue } = props;
  return (
    <div
      className="budget-card"
      key={item ? item.key : item.budget.key}
      onClick={onclick}
    >
      <div className="budget-details-container">
        <div>
          <p className="budget-name">{item ? item.name : item.budget.name}</p>
          <p className="budget-item-count">{expenseCount} Item(s)</p>
        </div>
        <p className="budget-amount">${item ? item.amount : item.budget.amount}</p>
      </div>
      <div className="budget-amount-container">
        <p className="amount-details">{spentAmount} spent</p>
        <p className="amount-details">{remainingAmount} remaining</p>
      </div>
      <div className="budget-bar-container">
        <div className="budget-progress-bar" style={{width:`${progressBarValue}%`}}></div>
      </div>
    </div>
  );
};

export default BudgetItem;
