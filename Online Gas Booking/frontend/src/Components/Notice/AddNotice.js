import { useContext, useState } from "react";
import "../Component Styles/AddNotice.css";
import NoticeContext from "../../context/NoticeContext";
import { toast } from "react-toastify";

const AddNotice = () => {
  const [notice, setNotice] = useState({
    title: "",
    message: "",
    severity: "",
    endDate: "",
    duration: "",
  });

  const noticeContext = useContext(NoticeContext);
  const { addNotice } = noticeContext;

  const handleReset = (e) => {
    setNotice({
      title: "",
      message: "",
      severity: "",
      endDate: "",
      duration: "",
    });
  };

  const calcEndDate = (duration) => {
    const currentDate = new Date();
    switch (duration) {
      case "1 Day":
        return new Date(currentDate.setDate(currentDate.getDate() + 1));
      case "3 Days":
        return new Date(currentDate.setDate(currentDate.getDate() + 3));
      case "5 Days":
        return new Date(currentDate.setDate(currentDate.getDate() + 5));
      case "1 Week":
        return new Date(currentDate.setDate(currentDate.getDate() + 7));
      case "2 Weeks":
        return new Date(currentDate.setDate(currentDate.getDate() + 14));
      case "1 Month":
        return new Date(currentDate.setMonth(currentDate.getMonth() + 1));
      default:
        return currentDate;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEndDate = calcEndDate(notice.duration);
    setNotice({ ...notice, endDate: newEndDate });
    const addedNotice = await addNotice(notice, newEndDate);
    if (addedNotice) {
      toast("Notice Added!");
      setNotice({
        title: "",
        message: "",
        severity: "",
        endDate: "",
        duration: "",
      });
    } else {
      toast("Couldn't add the notice!");
    }
  };

  const onChange = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  return (
    <div className="addnotice-container">
      <form onSubmit={handleSubmit}>
        <h1 className="heading">Add Notice</h1>
        <input
          type="text"
          placeholder="Enter Title"
          className="input notice-input"
          name="title"
          onChange={onChange}
          value={notice.title}
          required
        />
        <i class="bi bi-pen-fill input-icon"></i>

        <input
          type="text"
          placeholder="Enter Message"
          className="input notice-input"
          name="message"
          onChange={onChange}
          value={notice.message}
          required
        />
        <i class="bi bi-chat-square input-icon"></i>

        <select
          name="severity"
          id="severity"
          className="input notice-input"
          onChange={onChange}
          value={notice.severity}
        >
          <option hidden selected>
            Select message severity
          </option>
          <option value="Critical">Critical</option>
          <option value="Warning">Warning</option>
          <option value="General">General</option>
        </select>
        <i class="bi bi-info-circle input-icon notice-icon"></i>

        <select
          name="duration"
          id="duration"
          className="input notice-input"
          onChange={onChange}
          value={notice.duration}
        >
          <option hidden selected>
            Select message duration
          </option>
          <option value="1 Day">1 Day</option>
          <option value="3 Days">3 Days</option>
          <option value="5 Days">5 Days</option>
          <option value="1 Week">1 Week</option>
          <option value="2 Weeks">2 Weeks</option>
          <option value="1 Month">1 Month</option>
        </select>
        <i class="bi bi-calendar4 input-icon notice-icon"></i>

        <div className="form-btns">
          <button
            type="reset"
            className="btn addnotice-btn"
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="submit" className="btn addnotice-btn">
            Add Notice
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotice;
