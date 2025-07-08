import { useContext, useRef, useState } from "react";
import BookingContext from "../../context/BookingContext";
import '../Component Styles/UpdateModal.css';
import { toast } from "react-toastify";

const BookingUpdateModal = (props) => {
  const { booking, setIsModalOpen } = props;
  const closeBtnRef = useRef();
  const [credentials, setCredentials] = useState({
    id: booking.key,
    address: booking.address,
    mobile: booking.mobile,
  });

  const bookingsContext = useContext(BookingContext);
  const { updateBooking } = bookingsContext;

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBooking(credentials);
    closeBtnRef.current.click();
    toast("Booking Updated!");
  }

  const handleReset = () => {
    setCredentials({
      address: "",
      mobile: "",
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
          <h1 className="login-heading">Update Booking</h1>
          <form onSubmit={handleSubmit} className="modal-form">
            <input
              type="text"
              placeholder="Address"
              className="input modal-input"
              name="address"
              value={credentials.address}
              onChange={onChange}
            />
            <i className="bi bi-geo-alt"></i>

            <input
              type="tel"
              placeholder="Mobile number"
              className="input modal-input"
              name="mobile"
              value={credentials.mobile}
              onChange={onChange}
            />
            <i className="bi bi-telephone"></i>

            <div className="modal-btns">
              <button
                type="reset"
                className="btn modal-btn"
                onClick={handleReset}
              >
                Reset
              </button>
              <button type="submit" className="btn modal-btn">
                Update Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingUpdateModal;
