import React from "react";
import Form from "../../components/shared/Form/Form.js";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner.js";
import "../../styles/Register.css"; // Ensure you have a CSS file for custom styles
// import { Link } from 'react-router-dom';

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="register-page">
          <div className="register-container">
            <div className="register-banner">
              <div className="register-header">
                <h2 className="form-title">Create an Account</h2>
                <p className="form-subtitle">Join us and help save lives <i class="fa-solid fa-heart-pulse"></i></p>
              </div>
              <img src="./assets/images/banner2.jpg" alt="registerImage" className="register-image" />
            </div>

            <div className="register-form-container">
            {/* <p className="nav-item">
                  <Link to="/wel-home" className="home-btn2">Home</Link>
                </p> */}
              <Form
                formTitle={"Register"}
                submitBtn={"Register"}
                formType={"register"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
