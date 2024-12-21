import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Home/Contact.css"; // Assuming you have a CSS file for styling

const Contact = () => {
  return (
    <div className="contact-container">
      <header className="header">
        <div className="logo-container">
        <img 
            className="logo-small" src="/assets/images/logo-modified.png" alt="logo" 
            style={{ marginTop: '20px', marginLeft:'20px' }}
          />
            <img className="mx-3"  src="/assets/images/hemocare.png"  alt="logo" 
            style={{ width: '200px', height: '40px',marginTop: '20px' }}
          />
        </div>
        <nav className="navigation">
          <ul className="nav-list"  style={{ marginTop: '-20px'}}>
            <li className="nav-item"><Link to="/wel-home">Home</Link></li>
            <li className="nav-item"><Link to="/about-donation">About Donation</Link></li>
            {/* <li className="nav-item"><Link to="/contact-details">Contact</Link></li>           */}
            <li className="nav-item"><Link to="/login" className="login-btn">Login</Link></li>
            <li className="nav-item"><Link to="/team-members" className="login-btn">TEAM MEMBERS</Link></li>

          </ul>
        </nav>
      </header>

      <section className="contact-info">
        <h2>Our Contact Details</h2>
        <div className="contact-details">
          <div className="contact-item">
            <i className="fa fa-map-marker-alt"></i>
            <div className="contact-text">
              <h3>Address</h3>
              <p>123 Blood Drive Street,<br/> Donor City,<br/> DC 12345</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fa fa-phone"></i>
            <div className="contact-text">
              <h3>Phone</h3>
              <p>(123) 456-7890</p>
              <p>(098) 765-4321</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fa fa-envelope"></i>
            <div className="contact-text">
              <h3>Email</h3>
              <p>contact@blooddonation.org</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fa fa-clock"></i>
            <div className="contact-text">
              <h3>Working Hours</h3>
              <p>Monday - Friday : <br/>9:00 AM - 6:00 PM</p>
              <p>Saturday : 10:00 AM - 4:00 PM</p>
              <p>Sunday : Closed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>
      
      <footer>
        <p>Created By <span className="highlight">Hemo Care Team </span> | &copy; 2024 All Rights Reserved.</p>
        
      </footer>

    </div>
  );
};

export default Contact;
