// import React from 'react';

// const MyTeam = ({ myTeam, onRemovePlayer, onBack }) => {
//   return (
//     <div>
//       <h2>My Team</h2>
//       <div className="my-team-container">
//         {myTeam.length === 0 ? (
//           <p>No players in your team</p>
//         ) : (
//           myTeam.map(player => (
//             <div key={player.player_id} className="player-card">
//               <img src={player.image_url} alt={player.name} className="player-image" />
//               <h2>{player.name}</h2>
//               <p>Team: {player.team}</p>
//               <p>Position: {player.position}</p>
//               <p>Height: {player.height}</p>
//               <p>Weight: {player.weight}</p>
//               <p>Birthdate: {player.birthdate}</p>
//               <button className="button" onClick={() => onRemovePlayer(player.player_id)}>Remove Player</button>
//             </div>
//           ))
//         )}
//       </div>
//       <button className='button' onClick={onBack}>Back to Players</button>
//     </div>
//   );
// };


import React from 'react';

const MyTeam = ({ teamName, myTeam, onRemovePlayer, onBack }) => {
  return (
    <div>
      <h2>Team {teamName}</h2>
      <div className="my-team-container">
        {myTeam.length === 0 ? (
          <p>No players in Team {teamName}</p>
        ) : (
          myTeam.map(player => (
            <div key={player.player_id} className="player-card">
              <img src={player.image_url} alt={player.name} className="player-image" />
              <h2>{player.name}</h2>
              <p>Team: {player.team}</p>
              <p>Position: {player.position}</p>
              <p>Height: {player.height}</p>
              <p>Weight: {player.weight}</p>
              <p>Birthdate: {player.birthdate}</p>
              <button className="button" onClick={() => onRemovePlayer(player.player_id)}>Remove Player</button>
            </div>
          ))
        )}
      </div>
      <button className="button" onClick={onBack}>Back to Players</button>
    </div>
  );
};

export default MyTeam;
