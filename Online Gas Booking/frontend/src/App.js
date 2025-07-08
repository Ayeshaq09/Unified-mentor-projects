import "./App.css";
import Startup from "./Components/Startup";
import { UserState } from "./context/UserState";
import Login from "./Components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import ManageCustomers from "./Components/Customers/ManageCustomers";
import AddCustomers from "./Components/Customers/AddCustomers";
import AddBooking from "./Components/Bookings/AddBooking";
import BookingHistory from "./Components/Bookings/BookingHistory";
import BookingState from "./context/BookingState";
import ManageBookings from "./Components/Bookings/ManageBookings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  });
  return (
    <Router>
      <UserState>
        <BookingState>
          <Startup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route
              exact
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            >
              <Route
                exact
                path="/managecustomers"
                element={<ManageCustomers />}
              />
              <Route exact path="/addcustomers" element={<AddCustomers />} />
              <Route exact path="/addbooking" element={<AddBooking />} />
              <Route
                exact
                path="/bookinghistory"
                element={<BookingHistory />}
              />
              <Route
                exact
                path="/managebookings"
                element={<ManageBookings />}
              />
            </Route>
            <Route
              exact
              path="/login"
              element={
                !isLoggedIn ? (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </BookingState>
      </UserState>
    </Router>
  );
}

export default App;
