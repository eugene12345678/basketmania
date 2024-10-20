// import React from 'react';
// import '../App.css';

// const About = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>X</button>
//         <h1>About This Project</h1>
//         <p>
//           This project is a comprehensive basketball management application called BasketMania. It allows users to view and manage players, create and organize teams, and analyze player statistics.
//         </p>
//         <p>
//           The application is built using modern web technologies including React for the frontend, Tailwind CSS for styling, and a backend API for managing data.
//         </p>
//         <p>
//           Key Features:
//         </p>
//         <ul>
//           <li>Player management and statistics tracking</li>
//           <li>Team creation and management</li>
//           <li>Responsive design for seamless use across devices</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import '../App.css';

const About = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close modal">X</button>
        <h1>About This Project</h1>
        <p>
          Welcome to <strong>BasketMania</strong>, a comprehensive basketball management application. This platform enables users to view and manage players, create and organize teams, and analyze player statistics efficiently.
        </p>
        <p>
          Built with modern web technologies, this application leverages <strong>React</strong> for the frontend, <strong>Tailwind CSS</strong> for responsive styling, and a robust <strong>Flask API</strong> backend to manage data seamlessly.
        </p>
        <h2>Key Features:</h2>
        <ul className="feature-list">
          <li>Player management and detailed statistics tracking</li>
          <li>Team creation and management with ease</li>
          <li>Responsive design for seamless use across all devices</li>
          <li>User authentication and session management</li>
          <li>Interactive UI for better user experience</li>
        </ul>
        <h2>Technologies Used:</h2>
        <ul className="tech-list">
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>Flask</li>
          <li>SQLite</li>
          <li>Formik for form handling and validation</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
