import { useState } from "react";
import "./Component Styles/Search.css";

const Search = (props) => {
  const {
    searchName,
    setSearchName,
    searchCylinder,
    setSearchCylinder,
    searchStatus,
    setSearchStatus,
    searchBookings,
    searchCustomers,
  } = props;

  const [searchValues, setSearchValues] = useState({
    name: "",
    status: "",
    cylinder: "",
  });

  const onChange = (e) => {
    setSearchValues({ ...searchValues, [e.target.name]: e.target.value });
    if (e.target.name === "name") setSearchName(e.target.value);
    if (e.target.name === "status") {
      setSearchStatus(e.target.value);
    }
    if (e.target.name === "cylinder") setSearchCylinder(e.target.value);
  };

  const handleReset = () => {
    setSearchValues({
      name: "",
      status: "",
      cylinder: "",
    });
    setSearchName("");
    if (searchBookings) setSearchStatus("");
    if (searchBookings) setSearchCylinder("");
  };

  return (
    <div className={`search-container ${searchCustomers ? 'search-customers':''}`}>
      <input
        type="text"
        name="name"
        placeholder="Enter customer name"
        className="input searchName-input"
        value={searchValues.name}
        onChange={onChange}
      />
      {searchBookings && (
        <>
          <select
            name="status"
            id="status"
            value={searchValues.status}
            onChange={onChange}
            className="input searchStatus-input"
          >
            <option hidden selected>Select status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            name="cylinder"
            id="cylinder"
            value={searchValues.cylinder}
            onChange={onChange}
            className="input searchCylinder-input"
          >
            <option hidden selected>Select cylinder no</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </>
      )}
      <button className="btn search-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Search;
