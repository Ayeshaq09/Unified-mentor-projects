import React, { useContext, useRef, useState } from "react";
import "../Component Styles/UpdateModal.css";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";

const Modal = (props) => {
  const { user, setIsModalOpen } = props;
  const closeBtnRef = useRef();
  const [credentials, setCredentials] = useState({
    name: user.name,
    email: user.email,
  });

  const usersContext = useContext(UserContext);
  const { updateUser } = usersContext;

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.key, credentials.name, credentials.email);
    closeBtnRef.current.click();
    toast("User Updated!");
  };

  const handleReset = () => {
    setCredentials({
      name: "",
      email: "",
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="modal-container">
        <div className="modal-content">
          <span className="close-btn" ref={closeBtnRef} onClick={handleClose}>
            x
          </span>
          <h1 className="login-heading">Update Customer</h1>
          <form onSubmit={handleSubmit} className="modal-form">
            <input
              type="text"
              placeholder="Username"
              className="input modal-input"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
            <i className="bi bi-person"></i>

            <input
              type="email"
              placeholder="Email address"
              className="input cust-modal-input"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <i className="bi bi-envelope"></i>

            <div className="modal-btns">
              <button
                type="reset"
                className="btn cust-modal-btn"
                onClick={handleReset}
              >
                Reset
              </button>
              <button type="submit" className="btn modal-btn">
                Update Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
