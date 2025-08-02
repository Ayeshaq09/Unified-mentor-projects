import { useContext, useEffect, useRef, useState } from "react";
import ExpenseContext from "../Context/ExpenseContext";
import Expense from "./Expense";
import "./AllExpenses.css";
import Search from "../Search/Search";
import { useDownloadExcel } from "react-export-table-to-excel";

const AllExpense = () => {
  const expenseContext = useContext(ExpenseContext);
  const { expenses, fetchExpenses } = expenseContext;
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // fetch all expenses
    fetchExpenses();
    // eslint-disable-next-line
  }, []);

  const tableRef = useRef(null);

  // export all expenses table to .xls file
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Expenses table",
    sheet: "Expenses",
  });

  return (
    <div className="allexpenses-container">
      <h2 className="heading">Expenses</h2>
      <div className="search-container">
        {expenses && expenses.length > 0 && (
          <>
            <Search setSearchValue={setSearchValue} />
            <button onClick={onDownload} className="btn export-btn">
              Export Expenses
            </button>
          </>
        )}
      </div>
      <div className="budget-expenses-container">
        {expenses && expenses.length > 0 ? (
          <Expense
            expenses={expenses}
            allexpenses={true}
            searchValue={searchValue}
            tableRef={tableRef}
          />
        ) : (
          <div className="no-records">
            No expenses to display, please add budgets and expenses
          </div>
        )}
      </div>
    </div>
  );
};

export default AllExpense;
