import Chart from "./Chart";
import "./Dashboard.css";
import InfoCard from "./InfoCard";
import { useContext, useEffect } from "react";
import BudgetContext from "../Context/BudgetContext";
import ExpenseContext from "../Context/ExpenseContext";

const Dashboard = () => {
  const budgetContext = useContext(BudgetContext);
  const { budgets, fetchBudget } = budgetContext;
  const expenseContext = useContext(ExpenseContext);
  const { expenses, fetchExpenses } = expenseContext;

  useEffect(() => {
    // fetch budgets and expenses
    fetchBudget();
    fetchExpenses();
    // eslint-disable-next-line
  }, []);

  // get total spent amount on expenses
  const spentAmount = () => {
    let sum = 0;

    expenses.map((item) => {
      sum += parseInt(item.amount);
    });
    return sum;
  };

  // get total amount of budgets
  const totalBudgetAmount = () => {
    let sum = 0;
    const totAmount = [];
    budgets.map((item) => {
      totAmount.push(item.amount);
    });

    for (const amt of totAmount) {
      sum += parseInt(amt);
    }
    return sum;
  };

  // get total budget count
  const BudgetCount = () => {
    let count = budgets ? budgets.length : 0;
    return count;
  };

  return (
    <div className="dashboard-container">
      <div className="info-grid-container">
        {/* display total budget amount */}
        <InfoCard
          title={"Total Budget"}
          amount={totalBudgetAmount()}
          infoIcon={"bi bi-piggy-bank-fill"}
        />
        {/* display total amount spent*/}
        <InfoCard
          title={"Total Spend"}
          amount={spentAmount()}
          infoIcon={"bi bi-cash"}
        />
        {/* display total budget count */}
        <InfoCard
          title={"No. of Budget"}
          amount={BudgetCount()}
          infoIcon={"bi bi-wallet2"}
        />
      </div>
      {/* display budgets and expenses information using chart */}
      <div className="graph">
        {expenses && expenses.length > 0 ? <Chart expenses={expenses} budgets={budgets} />: 
        <div className="no-records">No information to display, please add budgets and expenses.</div>}
      </div>
    </div>
  );
};

export default Dashboard;
