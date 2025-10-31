import { useEffect, useState } from "react";
const { createContext } = require("react");

// UserContext
const UserContext = createContext();

export default UserContext;

// UserProvider
export const UserProvider = (props) => {
  const host = process.env.REACT_APP_API_HOST;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      setRole(localStorage.getItem('role'));
    }
  });

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  const loginUser = async (user) => {
    const url = `${host}/auth/login`;

    const { email, password } = user;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("role", json.role);
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const registerUser = async (user) => {
    const url = `${host}/auth/register`;

    const { name, email, password } = user;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("role", json.role);
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ loginUser, registerUser, login, logout, isLoggedIn, role }}>
      {props.children}
    </UserContext.Provider>
  );
};
