// import React from 'react'

// function Home() {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get('http://localhost:5000/api/teams');
      setTeams(response.data);
    };
    fetchTeams();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
