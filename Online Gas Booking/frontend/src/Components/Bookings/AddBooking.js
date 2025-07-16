import { useContext, useEffect, useState } from "react";
import "../Component Styles/AddBooking.css";
import BookingContext from "../../context/BookingContext";
import { toast } from "react-toastify";
import SettingContext from "../../context/SettingContext";
import UserContext from "../../context/UserContext";

const AddBooking = () => {
  const bookingsContext = useContext(BookingContext);
  const { bookings, addBooking, fetchUserBookings, updateTotalBarrels } =
    bookingsContext;
  const settingsContext = useContext(SettingContext);
  const { settings, fetchSettings } = settingsContext;

  const userContext = useContext(UserContext);
  const { user, fetchUser } = userContext;

  const [booking, setBooking] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
    cylinder: "",
  });

  useEffect(() => {
    fetchSettings();
    fetchUserBookings();
    // fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateTotalBarrels(booking.cylinder);
    if (result.result) {
      addBooking(booking);
      setBooking({
        name: "",
        address: "",
        email: "",
        mobile: "",
        cylinder: "",
      });
      toast("Booking Added!");
    }else toast(result.error);
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
        <i className="bi bi-person input-icon"></i>

        <input
          type="text"
          placeholder="Address"
          className="input booking-input"
          name="address"
          value={booking.address}
          onChange={onChange}
          required
        />

        <i className="bi bi-geo-alt input-icon"></i>

        <input
          type="text"
          placeholder="Email"
          className="input booking-input"
          name="email"
          value={booking.email}
          onChange={onChange}
          required
        />
        <i className="bi bi-envelope input-icon"></i>

        <input
          type="tel"
          placeholder="Mobile no."
          className="input booking-input"
          name="mobile"
          value={booking.mobile}
          onChange={onChange}
          required
        />
        <i className="bi bi-telephone input-icon"></i>

        <input
          type="number"
          placeholder="No of Cylinders"
          className="input booking-input"
          name="cylinder"
          min="1"
          max={settings.cylinder}
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
