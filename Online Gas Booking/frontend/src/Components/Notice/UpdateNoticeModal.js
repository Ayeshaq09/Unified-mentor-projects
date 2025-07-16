import { useContext, useRef, useState } from "react";
import "../Component Styles/UpdateNoticeModal.css";
import { toast } from "react-toastify";
import NoticeContext from "../../context/NoticeContext";

const UpdateNoticeModal = (props) => {
  const { notice, setIsModalOpen } = props;
  const [credentials, setCredentials] = useState({
    title: notice.title,
    message: notice.message,
    severity: notice.severity,
    duration: notice.duration,
    endDate: notice.endDate,
  });
  const closeBtnRef = useRef();

  const noticeContext = useContext(NoticeContext);
  const { updateNotice } = noticeContext;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEndDate = calcEndDate(credentials.duration);
    setCredentials({...credentials, endDate: newEndDate});
    const updatedNotice = await updateNotice(notice.key, credentials, newEndDate);
    if (updatedNotice) {
      toast("Notice Updated!");
    } else {
      toast("Cannot update notice!");
    }
    closeBtnRef.current.click();
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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

  const handleReset = () => {
    setCredentials({
      title: "",
      message: "",
      severity: "",
      duration: "",
    });
  };
  return (
    <>
      <div className="modal-container">
        <div className="modal-content notice-content">
          <span className="close-btn" ref={closeBtnRef} onClick={handleClose}>
            x
          </span>
          <h1 className="login-heading">Update Notice</h1>
          <form onSubmit={handleSubmit} className="modal-form">
            <input
              type="text"
              placeholder="Title"
              className="input updatenotice-input"
              name="title"
              value={credentials.title}
              onChange={onChange}
            />
            <i class="bi bi-pen-fill input-icon"></i>

            <input
              type="text"
              placeholder="Message"
              className="input updatenotice-input"
              name="message"
              value={credentials.message}
              onChange={onChange}
            />
            <i class="bi bi-chat-square input-icon"></i>

            <select
              name="severity"
              id="severity"
              className="input updatenotice-input"
              onChange={onChange}
              value={credentials.severity}
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
              className="input updatenotice-input"
              onChange={onChange}
              value={credentials.duration}
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

            <div className="modal-btns">
              <button
                type="reset"
                className="btn modal-btn"
                onClick={handleReset}
              >
                Reset
              </button>
              <button type="submit" className="btn modal-btn">
                Update Notice
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateNoticeModal;
