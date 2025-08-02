import { useContext } from "react";
import ExpenseContext from "../Context/ExpenseContext";
import "./Expense.css";
import { toast } from "react-toastify";

const Expense = (props) => {
  const { expenses, allexpenses, searchValue, tableRef } = props;
  const expenseContext = useContext(ExpenseContext);
  const { deleteExpense } = expenseContext;

  // delete expenses
  const handleExpenseDel = async (id) => {
    const deletedExpense = await deleteExpense(id);
    if (deletedExpense) {
      toast("Expense deleted");
    } else {
      toast("Cannot delete the expense");
    }
  };

  return (
    <>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th style={{ width: `${allexpenses ? "20%" : "25%"}` }}>Name</th>
            <th style={{ width: `${allexpenses ? "20%" : "25%"}` }}>Amount</th>
            {allexpenses && <th style={{ width: "20%" }}>Category</th>}
            <th style={{ width: `${allexpenses ? "20%" : "25%"}` }}>Date</th>
            <th style={{ width: `${allexpenses ? "20%" : "25%"}` }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchValue && expenses && expenses.length > 0
            ? expenses
                .filter((item) => item.budget === searchValue)
                .map((item) => {
                  return (
                    <tr key={item.key}>
                      <td>{item.name}</td>
                      <td>{item.amount}</td>
                      {allexpenses && <td>{item.budget}</td>}
                      <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                      <td>
                        <i
                          className="bi bi-trash-fill del-icon"
                          onClick={() => handleExpenseDel(item.key)}
                        ></i>
                      </td>
                    </tr>
                  );
                })
            : expenses.map((item) => {
                return (
                  <tr key={item.key}>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    {allexpenses && <td>{item.budget}</td>}
                    <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                    <td>
                      <i
                        className="bi bi-trash-fill del-icon"
                        onClick={() => handleExpenseDel(item.key)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </>
  );
};

export default Expense;
