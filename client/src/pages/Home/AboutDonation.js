import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Home/AboutDonation.css";

const AboutDonation = () => {
  return (
    <div className="about-donation-container">
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
          <ul className="nav-list"   style={{ marginTop: '-20px'}}>
            <li className="nav-item" style={{ color: '-20px'}}><Link to="/wel-home">Home</Link></li>
            {/* <li className="nav-item"><Link to="/about-donation">About Donation</Link></li> */}
            <li className="nav-item"><Link to="/contact-details">Contact</Link></li>          
            <li className="nav-item"><Link to="/login" className="login-btn">Login</Link></li>
            <li className="nav-item"><Link to="/team-members" className="login-btn">TEAM MEMBERS</Link></li>
                      </ul>
        </nav>
      </header>
      <div className="heading-container text-center">
        <h1 className="learn-about-heading">Learn About Donation</h1>
      </div>
      <div className="content-container">
        <div className="donor-info-container">
          <img src="./assets/images/donationguidline.png" alt="Donation-guid" className="donor-image" />
          <blockquote className="donor-info">
            <p>
              After donating blood, the body works to replenish the blood loss. This
              stimulates the production of new blood cells and helps in maintaining good health.
            </p>
          </blockquote>
          <Link to="/login" className="donate-now-button">
            <i className="fa fa-tint"></i> Donate Now
          </Link>
        </div>
        <div className="blood-type-info-container">
          <h2 className="blood-type-heading">Compatible Blood Type Donors</h2>
          <table className="blood-type-table">
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Donate Blood To</th>
                <th>Receive Blood From</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'A+', donateTo: 'A+ AB+', receiveFrom: 'A+ A- O+ O-' },
                { type: 'O+', donateTo: 'O+ A+ B+ AB+', receiveFrom: 'O+ O-' },
                { type: 'B+', donateTo: 'B+ AB+', receiveFrom: 'B+ B- O+ O-' },
                { type: 'AB+', donateTo: 'AB+', receiveFrom: 'Everyone' },
                { type: 'A-', donateTo: 'A+ A- AB+ AB-', receiveFrom: 'A- O-' },
                { type: 'O-', donateTo: 'Everyone', receiveFrom: 'O-' },
                { type: 'B-', donateTo: 'B+ B- AB+ AB-', receiveFrom: 'B- O-' },
                { type: 'AB-', donateTo: 'AB+ AB-', receiveFrom: 'AB- A- B- O-' },
              ].map(({ type, donateTo, receiveFrom }) => (
                <tr key={type}>
                  <td className="blood-type">{type}</td>
                  <td>{donateTo}</td>
                  <td>{receiveFrom}</td>
                </tr>
              ))}


            </tbody>

          </table>
        </div>
      </div>
      <footer>
        <p>Created By <span className="highlight">Hemo Care Team</span> | &copy; 2024 All Rights Reserved.</p>
         </footer>
         
    </div>
  );
};

export default AboutDonation;
