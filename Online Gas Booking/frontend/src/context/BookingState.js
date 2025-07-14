import { useState } from "react";
import BookingContext from "./BookingContext";

const BookingState = (props) => {
  const [bookings, setBookings] = useState([]);
  const host = process.env.REACT_APP_API_HOST;

  const fetchBookings = async () => {
    const url = `${host}/booking/getbookings`;
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
        setBookings(json.bookings);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchUserBookings = async () => {
    const url = `${host}/booking/getuserbookings`;
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
        setBookings(json.bookings);
      } else {
        console.log("error");
        setBookings([]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addBooking = async (booking) => {
    const url = `${host}/booking/addbooking`;
    const { name, address, email, mobile, cylinder } = booking;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          name,
          address,
          email,
          mobile,
          cylinder,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setBookings(bookings.concat(json.booking));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateBooking = async (booking) => {
    const url = `${host}/booking/updatebooking/${booking.id}`;
    const { address, mobile } = booking;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          address,
          mobile,
        }),
      });

      const json = await response.json();
      if (json.success) {
        let newBookings = JSON.parse(JSON.stringify(bookings));
        for (let i = 0; i < bookings.length; i++) {
          if (bookings[i].key === booking.id) {
            newBookings[i].address = booking.address;
            newBookings[i].mobile = booking.mobile;
            break;
          }
        }
        setBookings(newBookings);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateBookingStatus = async (key, status) => {
    const url = `${host}/booking/updatebookingstatus/${key}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          status,
        }),
      });

      const json = await response.json();
      if (json.success) {
        let newBookings = JSON.parse(JSON.stringify(bookings));
        for (let i = 0; i < bookings.length; i++) {
          if (bookings[i].key === key) {
            newBookings[i].status = status;
            break;
          }
        }
        // const updatedBookings = bookings.map(booking =>
        //   booking.key === key ? { ...booking, status } : booking
        // );

        setBookings(newBookings);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTotalBarrels = async (barrels) => {
    const url = `${host}/booking/updatebarrel`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          barrels,
        }),
      });

      const json = await response.json();
      if (json.success) {
        const totalBarrels = json.booking;
        console.log("totalBarrels updated");
        return {
          result: true,
          totalBarrels,
        };
      } else {
        console.log("error");
        return {
          result: false,
          error: json.error,
        };
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteBooking = async (id) => {
    const url = `${host}/booking/deletebooking/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setBookings(bookings.filter((item) => item.key !== id));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const sendEmail = async (
    toName,
    toEmail,
    bookingStatus,
    fromName,
    fromEmail,
    subject
  ) => {
    const url = `${host}/booking/sendemail`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          toName,
          toEmail,
          bookingStatus,
          fromName,
          fromEmail,
          subject,
        }),
      });

      const json = await response.json();
      if (json.success) {
        console.log(json.mailSent);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        fetchBookings,
        fetchUserBookings,
        addBooking,
        updateBooking,
        updateBookingStatus,
        updateTotalBarrels,
        deleteBooking,
        sendEmail,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingState;
