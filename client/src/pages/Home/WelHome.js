import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Home/WelHome.css"; // Ensure you have the correct path to your CSS file

const WelComeHome = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "/assets/images/donorday.jpg",
    "/assets/images/second-image.png",
    "/assets/images/third-image.png",
    "/assets/images/fourth-image.png"
  ];

  return (
    <div className="welcome-home">
      <header className="custom-header">
        <div className="logo-container">
          <img 
            className="logo-small" src="/assets/images/logo-modified.png" alt="logo" 
            style={{ marginTop: '20px', marginLeft:'20px' }}
          />
          <img 
            className="mx-3" src="/assets/images/hemocare.png" alt="logo" 
            style={{ width: '200px', height: '40px', marginTop: '20px' }}
          />
        </div>
        <nav className="custom-nav">
          <ul className="nav-list" style={{ marginTop: '-20px' }}>
            {/* <li className="nav-item"><Link to="/wel-home">Home</Link></li> */}
            <li className="nav-item"><Link to="/about-donation">About Donation</Link></li>
            <li className="nav-item"><Link to="/contact-details">Contact</Link></li>     
            <li className="nav-item"><Link to="/login" className="join-btn">Join!</Link></li>
          </ul>
        </nav>
      </header>

      <main className="content">
        <div className="hero-section">
          <div className="hero-text">
            <h2>Donate Blood To Save Life</h2>
            <p>BloodBank is a responsive blood bank and donor Content Management System (CMS). Agents can register and manage donors easily.</p>
            <div className="hero-buttons">
              <Link to="/login" className="hero-btn contact-us-btn">Join Now</Link>
            </div>
          </div>
          <div className="hero-slider">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`slide-${index}`} className="slider-image" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </main>

      <footer className="custom-footer">
        <p>Created By <span className="highlight">Hemo Care Team</span> | &copy; 2024 All Rights Reserved.</p>
        <Link to="/team-members" className="team-members-btn">TEAM MEMBERS</Link>
      </footer>
    </div>
  );
};

export default WelComeHome;
