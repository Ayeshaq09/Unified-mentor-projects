import { useState } from "react";
import UserContext from "./UserContext";

export const UserState = (props) => {
  const [user, setUser] = useState(null);

  const host = "http://localhost:5000/api";

  // fetch the login user api
  const loginUser = async (credentials, navigate, setIsLoggedIn) => {
    const url = `${host}/auth/loginuser`;
    const { email } = credentials;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        setIsLoggedIn(true);
        navigate("/");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  // fetch the register user api
  const registerUser = async (credentials, navigate) => {
    const url = `${host}/auth/createuser`;
    const { name, email } = credentials;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const json = await response.json();
      if (json.success) {
        navigate("/login");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  // fetch the get logged in user details api
  const getUser = async () => {
    const url = `${host}/auth/getuser`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setUser(json.userName);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  return (
    <UserContext.Provider value={{ user, loginUser, registerUser, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
