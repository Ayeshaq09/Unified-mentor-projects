import { useContext, useEffect } from "react";
import BudgetContext from "../Context/BudgetContext";
import "./Search.css";

const Search = (props) => {
  const { setSearchValue } = props;
  const budgetContext = useContext(BudgetContext);
  const { budgets, fetchBudget } = budgetContext;

  useEffect(() => {
    // fetch budget
    fetchBudget();
    // eslint-disable-next-line
  }, []);

  // set the searched value
  const handleSelectedValue = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }

  return (
    <>
      <select
        type="text"
        name="budget-name"
        placeholder="Enter Budget/Category"
        className="input search-input"
        onChange={handleSelectedValue}
      >
        <option value="" hidden>
          Select budget
        </option>
        {/* display all the budget names to search expenses as per budgets */}
        {budgets &&
          budgets.map((item) => {
            return (
              <option key={item.key} value={item.name}>
                {item.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Search;
