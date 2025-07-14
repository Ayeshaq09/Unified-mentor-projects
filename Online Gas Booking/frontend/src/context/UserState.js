import { useState } from "react";
import UserContext from "./UserContext";

export const UserState = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    userId: "",
    user: "",
  });

  const host = process.env.REACT_APP_API_HOST;

  const createUser = async (user, navigate) => {
    const url = `${host}/auth/createuser`;
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
        console.log(json.authToken);
        setUsers(users.concat(json.users));
        if (navigate) navigate("/login");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addUser = async (user) => {
    const url = `${host}/users/adduser`;
    const { name, email, password } = user;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        setUsers(users.concat(json.user));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const loginUser = async (user, navigate, setIsLoggedIn) => {
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
        console.log(json.authToken);
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("role", json.role);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchUsers = async () => {
    const url = `${host}/users/getusers`;

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
        setUsers(json.users);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchUser = async () => {
    const url = `${host}/users/getuser`;

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
        setUser({ userId: json.userId, user: json.user });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateUser = async (id, name, email) => {
    const url = `${host}/users/updateuser/${id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const json = await response.json();

      if (json.success) {
        let newUser = JSON.parse(JSON.stringify(users));
        for (let i = 0; i < users.length; i++) {
          if (users[i].key === id) {
            newUser[i].name = name;
            newUser[i].email = email;
            break;
          }
        }
        setUsers(newUser);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteUser = async (id) => {
    const url = `${host}/users/deleteuser/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();

      if (json.success) {
        const newUsers = users.filter((user) => user.key !== id);
        setUsers(newUsers);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        addUser,
        createUser,
        loginUser,
        fetchUsers,
        fetchUser,
        updateUser,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
