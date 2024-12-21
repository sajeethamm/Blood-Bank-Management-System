import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Home/TeamMembers.css"; // Ensure you have the correct path to your CSS file

const teamMembers = [
  {
    name: 'M.Fathima Samla',
    position: 'Project Manager',
    image: '/assets/images/F2.png',
    bio: 'Samla is a seasoned project manager with a passion for projects.'
  },
  {
    name: 'A.M.Mohamed Sajeeth',
    position: 'Lead Developer',
    image: '/assets/images/B1.jpg',
    bio: 'Sajeeth is a full-stack developer specializing in MERN.'
  },
  {
    name: 'H.Shaffron Wazny',
    position: 'UI/UX Designer',
    image: '/assets/images/F1.png',
    bio: 'Wazny is a creative designer with a passion for user experience.'
  },
  {
    name: 'I.L.Mohamed Kamil',
    position: 'UI/UX Designer',
    image: '/assets/images/B2.jpg',
    bio: 'Kamil is a creative designer with a passion for user experience.'
  },
  // Add more team members as needed
];

const TeamMembers = () => {
  return (
    <div className="team-members-page">
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
            <li className="nav-item"><Link to="/wel-home">Home</Link></li>
            <li className="nav-item"><Link to="/about-donation">About Donation</Link></li>
            <li className="nav-item"><Link to="/contact-details">Contact</Link></li>     
            <li className="nav-item"><Link to="/login" className="join-btn">Join!</Link></li>
          </ul>
        </nav>
      </header>

      <main className="team-members-content">
        <h2 className="team-members-title">Meet Our Team</h2>
        <div className="team-members-container">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <img src={member.image} alt={member.name} className="team-member-image" />
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-position">{member.position}</p>
              <p className="team-member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="custom-footer">
        <p>Created By <span className="highlight">Hemo Care Team</span> | &copy; 2024 All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TeamMembers;
