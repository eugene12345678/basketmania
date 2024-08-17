import React from "react";
//import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About BasketMania</h3>
          <p>
            BasketMania brings you the latest news and updates from the world of
            basketball. Stay tuned for game highlights, player profiles, and
            more.
          </p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/news">News</a>
            </li>
            <li>
              <a href="/teams">Teams</a>
            </li>
            <li>
              <a href="/players">Players</a>
            </li>
            <li>
              <a href="/schedules">Schedules</a>
            </li>
            <li>
              <a href="/standings">Standings</a>
            </li>
            <li>
              <a href="/tickets">Tickets</a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <a
            href="https://facebook.com/BasketMania"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://www.svgrepo.com/show/32355/facebook.svg" alt="Facebook" />
          </a>
          <a
            href="https://twitter.com/BasketMania"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="data:image/png;base64,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" alt="Twitter" />
          </a>
          <a
            href="https://instagram.com/BasketMania"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/socialsamosa/media/media_files/idDq1WGHPkDqmppGG7QU.png" alt="Instagram" />
          </a>
        </div>
        <div className="footer-legal">
          <ul>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
