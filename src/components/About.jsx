import React from 'react';
import '../App.css';

const About = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h1>About This Project</h1>
        <p>
          This project is a comprehensive basketball management application called BasketMania. It allows users to view and manage players, create and organize teams, and analyze player statistics.
        </p>
        <p>
          The application is built using modern web technologies including React for the frontend, Tailwind CSS for styling, and a backend API for managing data.
        </p>
        <p>
          Key Features:
        </p>
        <ul>
          <li>Player management and statistics tracking</li>
          <li>Team creation and management</li>
          <li>Responsive design for seamless use across devices</li>
        </ul>
      </div>
    </div>
  );
};

export default About;