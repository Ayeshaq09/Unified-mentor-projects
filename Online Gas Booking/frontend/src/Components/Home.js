import React from "react";
import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";
import './Component Styles/Home.css';

const Home = (props) => {
  const { role, authToken } = props;
  return (
    <div className="home-container">
        <div className="sidenavbar-container">
          <SideNavbar role={role} authToken={authToken}/>  
        </div>
        <div className="content-container">
          <Outlet/>
        </div>
    </div>
  );
};

export default Home;
