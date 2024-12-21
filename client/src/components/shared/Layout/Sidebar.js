import React from "react";
//import { userMenu } from "./Menus/userMenu";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = () => {
  //GET USER STATE
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === "organization" && (
            <>

              <div
                className={`menu-item ${
                  location.pathname === "/donor" && "active"
                }`}
              >
                <i class="fa-solid fa-hand-holding-droplet"></i>
                <Link to="/donor">Donors</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i class="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital">Hospitals </Link>
              </div>
            </>
            
          )}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donor-list" && "active"
                }`}
              >
                <i class="fa-solid fa-hand-holding-droplet"></i>
                <Link to="/donor-list">Donors</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i class="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospitals </Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i class="fa-solid fa-hands-holding-circle"></i>
                <Link to="/org-list">Organizations </Link>
              </div>

              <div  className={`menu-item ${
                  location.pathname === "/inventory-list" && "active"
                }`}   
               >
                <i class="fa-solid fa-clock-rotate-left"></i>
                <Link to="/inventory-list" >Blood Summary</Link>
              </div>
  

            </>
          )}
                    {user?.role === "donor" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i class="fa-solid fa-hand-holding-droplet"></i>
              <Link to="/donation">Donation</Link>
            </div>
          )}
          {(user?.role === "donor" ) && (
            <div
              className={`menu-item ${
                location.pathname === "/organization" && "active"
              }`}
            >
              <i class="fa-solid fa-hands-holding-circle"></i>
              <Link to="/organization">Orgnaization</Link>
            </div>
          )}

          {user?.role === "hospital" && (
              <div
              className={`menu-item ${
                location.pathname === "/donor" && "active"
              }`}
            >
              <i class="fa-solid fa-hand-holding-droplet"></i>
              <Link to="/donor">Donors</Link>
            </div>
          )}

            {user?.role === "hospital" && (
            <div
            className={`menu-item ${
              location.pathname === "/organization" && "active"
            }`}
          >
            <i class="fa-solid fa-hands-holding-circle"></i>
            <Link to="/organization">Orgnaization</Link>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;