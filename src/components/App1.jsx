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
  const [myTeamAlpha, setMyTeamAlpha] = useState([]);
  const [myTeamBeta, setMyTeamBeta] = useState([]);
  const [view, setView] = useState('players'); // 'players', 'myTeamAlpha', 'myTeamBeta'

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

  const handlePlayerClick = (player) => {
    const teamPlayers = allPlayers.filter(p => p.team === player.team);
    setSelectedTeamPlayers(teamPlayers);
  };

  const handleAddPlayer = (player) => {
    // Prompt the user for the team selection (Team Alpha or Team Beta)
    const teamChoice = window.prompt('Which team would you like to add the player to? (Alpha/Beta)', 'Alpha');
    
    if (!teamChoice) return; // If no choice is made, exit

    // Check if player is already in the chosen team
    if (teamChoice.toLowerCase() === 'alpha') {
      const isPlayerInAlpha = myTeamAlpha.some(p => p.player_id === player.player_id);
      if (isPlayerInAlpha) {
        alert('This player is already in Team Alpha!');
        return;
      }
      // Add player to Team Alpha
      setMyTeamAlpha(prevTeam => [...prevTeam, player]);
    } else if (teamChoice.toLowerCase() === 'beta') {
      const isPlayerInBeta = myTeamBeta.some(p => p.player_id === player.player_id);
      if (isPlayerInBeta) {
        alert('This player is already in Team Beta!');
        return;
      }
      // Add player to Team Beta
      setMyTeamBeta(prevTeam => [...prevTeam, player]);
    } else {
      alert('Invalid team choice. Please choose either Alpha or Beta.');
    }
  };

  const handleRemovePlayer = (playerId, team) => {
    if (team === 'Alpha') {
      setMyTeamAlpha(prevTeam => prevTeam.filter(player => player.player_id !== playerId));
    } else if (team === 'Beta') {
      setMyTeamBeta(prevTeam => prevTeam.filter(player => player.player_id !== playerId));
    }

    // If you want to remove from the backend, you'd make a DELETE request here
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
              <button className="button" onClick={() => setSelectedTeamPlayers([])}>Back to Best Players</button>
            </>
          ) : (
            <Players
              players={players}
              onPlayerClick={handlePlayerClick}
              onAddPlayer={handleAddPlayer}
            />
          )}
          <button className="button" onClick={() => handleViewChange('myTeamAlpha')}>View Team Alpha</button>
          <button className="button" onClick={() => handleViewChange('myTeamBeta')}>View Team Beta</button>
        </>
      )}

      {view === 'myTeamAlpha' && (
        <MyTeam
          teamName="Alpha"
          myTeam={myTeamAlpha}
          onRemovePlayer={playerId => handleRemovePlayer(playerId, 'Alpha')}
          onBack={() => handleViewChange('players')}
        />
      )}

      {view === 'myTeamBeta' && (
        <MyTeam
          teamName="Beta"
          myTeam={myTeamBeta}
          onRemovePlayer={playerId => handleRemovePlayer(playerId, 'Beta')}
          onBack={() => handleViewChange('players')}
        />
      )}
    </div>
  );
};

export default App1;