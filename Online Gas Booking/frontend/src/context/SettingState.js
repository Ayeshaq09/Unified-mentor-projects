import { useState } from "react";
import SettingContext from "./SettingContext";

const SettingState = (props) => {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    subject: "",
    cylinder: "",
  });

  const host = process.env.REACT_APP_API_HOST;
  const fetchSettings = async () => {
    const url = `${host}/settings/getsettings`;
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
        setSettings(json.settings[0]);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateSettings = async (setting) => {
    const url = `${host}/settings/updatesettings`;
    const {name, email, subject, cylinder} = setting;
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
          subject,
          cylinder,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setSettings(json.settings);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <SettingContext.Provider value={{ settings, fetchSettings, updateSettings }}>
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingState;
