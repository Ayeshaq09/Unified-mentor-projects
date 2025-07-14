import React, { useContext, useEffect, useState } from "react";
import BookingContext from "../../context/BookingContext";
import "../Component Styles/BookingHistory.css";
import BookingUpdateModal from "./BookingUpdateModal";
import { toast } from "react-toastify";
import Search from "../Search";

const BookingHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booking, setBooking] = useState(null);
  const bookingsContext = useContext(BookingContext);
  const { bookings, fetchUserBookings, deleteBooking } = bookingsContext;

  const [searchName, setSearchName] = useState("");
  const [searchCylinder, setSearchCylinder] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [filteredBooking, setFilteredBooking] = useState([]);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  useEffect(() => {
    const filteredBookings = [...bookings].filter((item) => {
      const bookingSearchName = searchName
        ? item.name.toLowerCase().includes(searchName.toLowerCase())
        : true;
      const bookingSearchStatus = searchStatus
        ? item.status === searchStatus
        : true;
      const bookingSearchCylinder = searchCylinder
        ? item.cylinder === searchCylinder
        : true;
      return bookingSearchName && bookingSearchStatus && bookingSearchCylinder;
    });
    setFilteredBooking(filteredBookings);
  }, [bookings, searchName, searchStatus, searchCylinder]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      deleteBooking(id);
      toast("Booking Deleted!");
    }
  };

  const handleEdit = (booking) => {
    setIsModalOpen(true);
    setBooking(booking);
  };

  const isEditable = (bookingDateStr, bookingStatus) => {
    const bookingDate = new Date(bookingDateStr);
    const currentDate = new Date();

    const differenceInTime = currentDate.getTime() - bookingDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays <= 3 && bookingStatus === "Pending";
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
        searchUserBookings={true}
        searchBookings={true}
      />
      {isModalOpen && (
        <BookingUpdateModal setIsModalOpen={setIsModalOpen} booking={booking} />
      )}
      <div className="bookings-container">
        {filteredBooking.length > 0 ? (
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
              {isEditable(item.date, item.status) && (
                <div className="booking-status">
                  <button className="edit-btn" onClick={() => handleEdit(item)}>
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
          <div className="no-records">No bookings to show</div>
        )}
      </div>
    </>
  );
};

export default BookingHistory;
