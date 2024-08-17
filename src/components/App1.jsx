import React, { useState, useEffect } from 'react';
import Players from './Players';
import MyTeam from './MyTeam';
import '../App.css';

const App1 = () => {
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myTeam, setMyTeam] = useState([]);
  const [view, setView] = useState('players'); // 'players' or 'myTeam'

  useEffect(() => {
    fetch('https://basketmania-backend.vercel.app/players')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPlayers(data.slice(0, 10)); // First 10 players
        setAllPlayers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('https://team-backend-delta.vercel.app/my_team')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMyTeam(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handlePlayerClick = (player) => {
    const teamPlayers = allPlayers.filter(p => p.team === player.team);
    setSelectedTeamPlayers(teamPlayers);
  };

  const handleAddPlayer = (player) => {
    // Check if the player is already in the team
    const isPlayerInTeam = myTeam.some(p => p.player_id === player.player_id);
  
    if (isPlayerInTeam) {
      alert("You can't add the same player twice to your team!");
      return;
    }
  
    console.log('Adding player:', player); // Debugging line
  
    // Optimistically add the player to the UI
    setMyTeam(prevTeam => [...prevTeam, player]);
  
    fetch('https://team-backend-delta.vercel.app/my_team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Player added:', data); // Debugging line
  
        // No need to update the state again since we optimistically added the player
      })
      
  };
   const handleRemovePlayer = (playerId) => {
    // Optimistically remove the player from the UI
    setMyTeam(prevTeam => prevTeam.filter(player => player.player_id !== playerId));
  
    fetch(`https://team-backend-delta.vercel.app/my_team/${playerId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming your backend returns some JSON response
      })
      .then(data => {
        console.log('Player successfully deleted:', data); // Debugging line
        // Optionally update the state here if needed, but optimistic UI already removed the player
      })
     
  };
  

  const handleViewChange = (view) => {
    setView(view);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      {view === 'players' && (
        <>
          <h1>Best Players</h1>
          {selectedTeamPlayers.length > 0 ? (
            <>
              <Players
                players={selectedTeamPlayers}
                onPlayerClick={() => {}}
                onAddPlayer={handleAddPlayer}
              />
              <button className='button' onClick={() => setSelectedTeamPlayers([])}>Back to Best Players</button>
            </>
          ) : (
            <Players
              players={players}
              onPlayerClick={handlePlayerClick}
              onAddPlayer={handleAddPlayer}
            />
          )}
          <button className='button' onClick={() => handleViewChange('myTeam')}>View My Team</button>
        </>
      )}
      {view === 'myTeam' && (
        <MyTeam
          myTeam={myTeam}
          onRemovePlayer={handleRemovePlayer}
          onBack={() => handleViewChange('players')}
        />
      )}
    </div>
  );
};

export default App1;
