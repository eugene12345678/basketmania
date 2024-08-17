import React from "react";

const teams = [
  "New Orleans Pelicans",
  "Golden State Warriors",
  "Phoenix Suns",
  "Boston Celtics",
  "Cleveland Cavaliers",
  "Los Angeles Lakers",
  "Milwaukee Bucks",
  "Los Angeles Clippers",
  "Dallas Mavericks",
  "Philadelphia 76ers",
];

function Fixtures() {
  return (
    <div className="fixtures">
      <h2>Teams</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
    </div>
  );
}

export default Fixtures;