import React, { useState } from "react";
import NoticeContext from "./NoticeContext";

const NoticeState = (props) => {
  const [notices, setNotices] = useState([]);
  const host = process.env.REACT_APP_API_HOST;

  const fetchNotices = async () => {
    const url = `${host}/notices/getnotices`;
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
        setNotices(json.notices);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addNotice = async (notice, endDate) => {
    const url = `${host}/notices/addnotice`;
    const { title, message, severity, duration } = notice;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          title,
          message,
          severity,
          duration,
          endDate,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setNotices(notices.concat(json.notices));
        return true;
      } else {
        console.log("error");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const updateNotice = async (id, notice, endDate) => {
    const url = `${host}/notices/updatenotice/${id}`;
    const { title, message, severity, duration } = notice;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          title,
          message,
          severity,
          endDate,
          duration,
        }),
      });

      const json = await response.json();
      if (json.success) {
        const updatedNotices = notices.map((item) => {
          return item.key === id
            ? { ...item, title, message, severity, endDate }
            : item;
        });
        setNotices(updatedNotices);
        return true;
      } else {
        console.log("error");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const deleteNotice = async (id) => {
    const url = `${host}/notices/deletenotice/${id}`;

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
        setNotices(notices.filter((item) => item.key !== id));
        return true;
      } else {
        console.log("error");
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  return (
    <NoticeContext.Provider
      value={{ notices, fetchNotices, addNotice, updateNotice, deleteNotice }}
    >
      {props.children}
    </NoticeContext.Provider>
  );
};

export default NoticeState;
