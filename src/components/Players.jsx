import React from 'react';

const Players = ({ players, onPlayerClick, onAddPlayer }) => {
  return (
    <div className="players-container">
      {players.map((player) => (
        <div key={player.player_id} className="player-card">
          <img
            src={player.image_url}
            alt={player.name}
            className="player-image"
            onClick={() => onPlayerClick(player)}
          />
          <h2>{player.name}</h2>
          <p>Team: {player.team}</p>
          <p>Position: {player.position}</p>
          <p>Height: {player.height}</p>
          <p>Weight: {player.weight}</p>
          <p>Birthdate: {player.birthdate}</p>
          <button className="button" onClick={() => onAddPlayer(player)}>Add Player</button>
        </div>
      ))}
    </div>
  );
};

export default Players;
