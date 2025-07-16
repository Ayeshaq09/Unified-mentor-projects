import React, { useContext, useEffect, useState } from "react";
import NoticeContext from "../../context/NoticeContext";
import "../Component Styles/NoticeBoard.css";
import { toast } from "react-toastify";
import UpdateNoticeModal from "./UpdateNoticeModal";

const NoticeBoard = (props) => {
  const noticeContext = useContext(NoticeContext);
  const { notices, fetchNotices, deleteNotice } = noticeContext;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notice, setNotice] = useState(null);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const { role } = props;

  useEffect(() => {
    fetchNotices();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (notices.length > 0) {
      const validNotices = notices.filter((item) => {
        if (!item || !item.endDate) return false;
        let endDate = new Date(item.endDate).toLocaleDateString("en-GB");
        let currentDate = new Date().toLocaleDateString("en-GB");
        return endDate >= currentDate;
      });
      setFilteredNotices(validNotices);
    }
  }, [notices]);

  const messageType = (type) => {
    let color = "";
    if (type === "Critical") {
      color = "Critical";
    } else if (type === "General") {
      color = "General";
    } else if (type === "Warning") {
      color = "Warning";
    }
    return color;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      const itemDeleted = await deleteNotice(id);
      if (itemDeleted) {
        toast("Notice delete!");
      } else {
        toast("Couldn't delete the notice!");
      }
    }
  };

  const handleEdit = (item) => {
    setIsModalOpen(true);
    setNotice(item);
  };

  return (
    <>
      {isModalOpen && (
        <UpdateNoticeModal setIsModalOpen={setIsModalOpen} notice={notice} />
      )}
      <div className="notice-container">
        {filteredNotices && filteredNotices.length > 0 ? (
          filteredNotices
            .filter(
              (item) =>
                item &&
                item.severity &&
                item.title &&
                item.message &&
                item.endDate
            )
            .map((item) => (
              <div
                className={`notice-card ${
                  item.severity ? messageType(item.severity) : ""
                }`}
                key={item.key}
              >
                <div className="notice-details">
                  <p className="item-container">
                    <span className="item-value notice-title">
                      {item.title}
                    </span>
                  </p>
                  <p className="item-container">
                    <span className="item-value">{item.message}</span>
                  </p>
                </div>
                {(role === "admin") && (
                  <div className="notice-btns">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        handleEdit(item);
                      }}
                    >
                      Edit
                      <i className="bi bi-pencil-square booking-edit-icon"></i>
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => handleDelete(item.key)}
                    >
                      Cancel
                      <i className="bi bi-trash booking-del-icon"></i>
                    </button>
                  </div>
                )}
              </div>
            ))
        ) : (
          <div className="no-records">No notices to show</div>
        )}
      </div>
    </>
  );
};

export default NoticeBoard;
