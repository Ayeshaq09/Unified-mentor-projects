import React, { useContext, useEffect, useState } from "react";
import BookingContext from "../../context/BookingContext";
import { toast } from "react-toastify";
import "../Component Styles/ManageBookings.css";
import Search from "../Search";
import SettingContext from "../../context/SettingContext";

const ManageBookings = () => {
  const bookingsContext = useContext(BookingContext);
  const { bookings, fetchBookings, updateBookingStatus, sendEmail } =
    bookingsContext;
  const [sortedBooking, setSortedBooking] = useState([]);
  const [filteredBooking, setFilteredBooking] = useState([]);
  const settingsContext = useContext(SettingContext);
  const { settings, fetchSettings } = settingsContext;

  const [searchName, setSearchName] = useState("");
  const [searchCylinder, setSearchCylinder] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      const sorted = [...bookings].sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      setSortedBooking(sorted);

      const filteredBookings = [...sorted].filter((booking) => {
        const bookingCustomerName = searchName
          ? booking.name.toLowerCase().includes(searchName.toLowerCase())
          : true;
        const bookingStatus = searchStatus
          ? booking.status === searchStatus
          : true;
        const bookingCylinder = searchCylinder
          ? booking.cylinder === searchCylinder
          : true;
        return bookingCustomerName && bookingStatus && bookingCylinder;
      });

      setFilteredBooking(filteredBookings);
    }
  }, [bookings, searchName, searchStatus, searchCylinder]);

  const handleStatusChange = async (key, bookingStatus, toName, toEmail) => {
    let cancelBooking = false;
    if (bookingStatus === "Cancelled") {
      if (window.confirm("Are you sure you want to cancel this booking?")) {
        cancelBooking = true;
      }
    }

    if (
      (bookingStatus === "Cancelled" && cancelBooking) ||
      bookingStatus === "Approved"
    ) {
      updateBookingStatus(key, bookingStatus);
      if (bookingStatus === "Cancelled") {
        toast("Booking Cancelled!");
      } else toast("Booking Approved!");
      fetchSettings();
      sendEmail(
        toName,
        toEmail,
        bookingStatus,
        settings.name,
        settings.email,
        settings.subject
      );
      cancelBooking = false;
    }
  };

  return (
    <>
      <Search
        searchName={searchName}
        setSearchName={setSearchName}
        searchCylinder={searchCylinder}
        setSearchCylinder={setSearchCylinder}
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
        searchBookings={true}
      />
      <div className="bookings-container">
        {filteredBooking !== null &&
          filteredBooking.length > 0 &&
          filteredBooking.map((item) => (
            <div className="booking-card" key={item.key}>
              <div className="booking-details">
                <p className="booking-item-container">
                  <span className="item-title">Name:</span>
                  <span className="item-value">{item.name}</span>
                </p>
                <p className="booking-item-container">
                  <span className="item-title">Email:</span>
                  <span className="item-value">{item.email}</span>
                </p>
                <p className="booking-item-container">
                  <span className="item-title">Address:</span>
                  <span className="item-value">{item.address}</span>
                </p>
                <p className="booking-item-container">
                  <span className="item-title">Mobile Number:</span>
                  <span className="item-value">{item.mobile}</span>
                </p>
                <p className="booking-item-container">
                  <span className="item-title">Number of Cylinders:</span>
                  <span className="item-value">{item.cylinder}</span>
                </p>
                <p className="booking-item-container">
                  <span className="item-title">Status:</span>
                  <span className="item-value">{item.status}</span>
                </p>
                <p className="booking-item-container">
                  <span className="item-title">Date:</span>
                  <span className="item-value">{item.date}</span>
                </p>
              </div>
              {item.status === "Pending" && (
                <div className="booking-status">
                  <button
                    className="approve-btn"
                    onClick={() =>
                      handleStatusChange(
                        item.key,
                        "Approved",
                        item.name,
                        item.email
                      )
                    }
                  >
                    Approve
                    <i className="bi bi-check-circle-fill booking-approve-icon"></i>
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() =>
                      handleStatusChange(
                        item.key,
                        "Cancelled",
                        item.name,
                        item.email
                      )
                    }
                  >
                    Cancel
                    <i className="bi bi-x-circle-fill booking-cancel-icon"></i>
                  </button>
                </div>
              )}
              {item.status === "Approved" && (
                <div className="approved">
                  Approved<i className="bi bi-check-lg"></i>
                </div>
              )}
              {item.status === "Cancelled" && (
                <div className="cancelled">
                  Cancelled<i className="bi bi-x-lg"></i>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default ManageBookings;
