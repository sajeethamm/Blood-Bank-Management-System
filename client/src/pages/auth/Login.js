import React from "react";
import Form from "../../components/shared/Form/Form.js";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Spinner from "../../components/shared/Spinner.js";
import "../../styles/Login.css"; // Ensure you have a CSS file for custom styles

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        
        <div className="login-page">
          <div className="login-container">
            <div className="login-banner">
              <div className="login-header">
                <p className="nav-item">
                  <Link to="/wel-home" className="home-btn">Home</Link>
                </p>
                <h2 className="form-title">Welcome Back! <i className="fa-solid fa-hand-holding-heart"></i></h2>
                <p className="form-subtitle">Log in to your account</p>
              </div>
              <img src="./assets/images/loginpage.jpeg" alt="loginImage" className="login-image" />
            </div>

            <div className="login-form-container">
              <Form
                formTitle={"Login"}
                submitBtn={"Login"}
                formType={"login"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
