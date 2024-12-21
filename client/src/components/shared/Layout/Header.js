import React from "react";
import {  BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/wel-home");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand ">
           <img className="mx-1 "
            src="./assets/images/logo-modified.png" alt="logo" 
            style={{width: '40px', height: '40px' }} 
            />
           <img className="mx-3 " 
            src="./assets/images/hemocare.png" alt="logo" 
            style={{width: '200px', height: '40px' }} 
            />
            
            {/* <> HEMO CARE </> */}
            
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-5 ">
              <p className="nav-link h1">
                <BiUserCircle color="red" size="25px"/> Welcome{" "}
                {user?.name || user?.hospitalName || user?.organizationName}
                &nbsp;
                <><span className="badge bg-secondary mx-4 my-2">{user?.role}</span> </>
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donor" ||
            location.pathname === "/hospital" ? (
              <li className="nav-item mx-4 my-2">
                <Link to="/analytics" className="nav-link"> Analytics   </Link>
              </li>
            ) : (
              <li className="nav-item mx-4 my-2">
                <Link to="/" className="nav-link">  Home </Link>
              </li>
            )}
            <li className="nav-item mx-3 my-2">
              <button className="btn btn-danger" onClick={handleLogout}> Logout   </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;