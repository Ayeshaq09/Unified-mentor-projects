import { createContext, useState } from "react";

const CompareContext = createContext();

export default CompareContext;

export const CompareProvider = (props) => {
  const [compare1, setCompare1] = useState(localStorage.getItem("compare1"));
  const [compare2, setCompare2] = useState(localStorage.getItem("compare2"));

  const addCompare1 = (product) => {
    setCompare1(product);
    localStorage.setItem("compare1", JSON.stringify(product));
  };

  const addCompare2 = (product) => {
    setCompare2(product);
    localStorage.setItem("compare2", JSON.stringify(product));
  };

  const clearCompare = () => {
    setCompare1(localStorage.removeItem("compare1"));
    setCompare2(localStorage.removeItem("compare2"));
  };

  return (
    <CompareContext.Provider
      value={{ compare1, compare2, addCompare1, addCompare2, clearCompare }}
    >
      {props.children}
    </CompareContext.Provider>
  );
};
