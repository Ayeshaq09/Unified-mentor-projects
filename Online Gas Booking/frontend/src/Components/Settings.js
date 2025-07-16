import React, { useContext, useEffect, useState } from "react";
import "./Component Styles/Settings.css";
import SettingContext from "../context/SettingContext";
import { toast } from "react-toastify";

const SendEmail = () => {
  const settingsContext = useContext(SettingContext);
  const { settings, fetchSettings, updateSettings } = settingsContext;
  const [setting, setSetting] = useState({
    name: settings.name,
    email: settings.email,
    subject: settings.subject,
    cylinder: settings.cylinder,
  });

  useEffect(() => {
    fetchSettings();
    setSetting(settings);
    // eslint-disable-next-line
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedSetting = await updateSettings(setting);
    if (updatedSetting) {
      toast("Settings Updated!");
    } else {
      toast('Couldn\'t update the settings!');
    }
  };

  const onChange = (e) => {
    setSetting({ ...setting, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <h2>Email Settings</h2>
        <div className="email-container">
          <div className="form-control-container">
            <label for="name" className="setting-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="input setting-input"
              placeholder="Enter from name"
              value={setting.name}
              onChange={onChange}
            />
          </div>
          <div className="form-control-container">
            <label for="email" className="setting-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={setting.email}
              className="input setting-input"
              disabled
              onChange={onChange}
            />
          </div>
          <div className="form-control-container">
            <label for="subject" className="setting-label">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="input setting-input"
              placeholder="Enter subject"
              value={setting.subject}
              onChange={onChange}
            />
          </div>
        </div>
        <h2 className="Setting-heading">Cylinder Number Settings</h2>
        <div className="form-control-container">
          <label for="cylinder" className="setting-label">
            Max Cylinder Number
          </label>
          <div className="cylinder-container">
            <input
              type="number"
              name="cylinder"
              id="cylinder"
              className="input setting-input"
              placeholder="Enter max cylinder no"
              min="1"
              max="3"
              value={setting.cylinder}
              onChange={onChange}
            />
          </div>
        </div>
        <button type="submit" className="btn settings-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SendEmail;
