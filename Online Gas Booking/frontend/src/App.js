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
import Settings from "./Components/Settings";
import SettingState from "./context/SettingState";
import AddNotice from "./Components/Notice/AddNotice";
import NoticeBoard from "./Components/Notice/NoticeBoard";
import NoticeState from "./context/NoticeState";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
    setRole(localStorage.getItem("role"));
  });
  return (
    <Router>
      <UserState>
        <BookingState>
          <NoticeState>
            <SettingState>
              <Startup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={isLoggedIn ? <Home role={role}/> : <Navigate to="/login" />}
                >
                  <Route
                    exact
                    path="/managecustomers"
                    element={<ManageCustomers />}
                  />
                  <Route
                    exact
                    path="/addcustomers"
                    element={<AddCustomers />}
                  />
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
                  <Route exact path="/settings" element={<Settings />} />
                  <Route exact path="/addnotice" element={<AddNotice />} />
                  <Route exact path="/noticeboard" element={<NoticeBoard role={role}/>} />
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
            </SettingState>
          </NoticeState>
        </BookingState>
      </UserState>
    </Router>
  );
}

export default App;
