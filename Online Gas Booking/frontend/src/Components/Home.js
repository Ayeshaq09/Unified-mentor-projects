import React from "react";
import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";
import './Component Styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
        <div className="sidenavbar-container">
          <SideNavbar/>  
        </div>
        <div className="content-container">
          <Outlet/>
        </div>
    </div>
  );
};

export default Home;
