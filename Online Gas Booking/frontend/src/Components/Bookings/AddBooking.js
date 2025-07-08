import { useContext, useState } from "react";
import "../Component Styles/AddBooking.css";
import BookingContext from "../../context/BookingContext";
import { toast } from "react-toastify";

const AddBooking = () => {
  const bookingsContext = useContext(BookingContext);
  const { addBooking } = bookingsContext;
  const [ booking, setBooking ] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
    cylinder: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking(booking);
    setBooking({
      name: "",
      address: "",
      email: "",
      mobile: "",
      cylinder: "",
    });
    toast("Booking Added!");
  };

  const onChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setBooking({
      name: "",
      address: "",
      email: "",
      mobile: "",
      cylinder: "",
    });
  };
  return (
    <div className="addbooking-container">
      <form onSubmit={handleSubmit}>
        <h1 className="login-heading">Add Booking</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="input booking-input"
          name="name"
          value={booking.name}
          onChange={onChange}
          required
        />
        <i className="bi bi-person"></i>

        <input
          type="text"
          placeholder="Address"
          className="input booking-input"
          name="address"
          value={booking.address}
          onChange={onChange}
          required
        />

        <i className="bi bi-geo-alt"></i>

        <input
          type="text"
          placeholder="Email"
          className="input booking-input"
          name="email"
          value={booking.email}
          onChange={onChange}
          required
        />
        <i className="bi bi-envelope"></i>

        <input
          type="tel"
          placeholder="Mobile no."
          className="input booking-input"
          name="mobile"
          value={booking.mobile}
          onChange={onChange}
          required
        />
        <i className="bi bi-telephone"></i>

        <input
          type="number"
          placeholder="No of Cylinders"
          className="input booking-input"
          name="cylinder"
          min="1"
          max="3"
          onChange={onChange}
          value={booking.cylinder}
          required
        />
        <i className="bi bi-telephone cylinder-icon"></i>

        <div className="form-btns">
          <button
            type="reset"
            className="btn addbooking-btn"
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="submit" className="btn addbooking-btn">
            Add Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
