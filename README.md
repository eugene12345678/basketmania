# Backend API for Player Management
## Overview
This backend serves as an API for managing players and user teams in a sports application. It allows you to fetch players, view and manage user teams, and perform CRUD operations.

## Endpoints
### Players
- ### GET /players
  - Retrieves a list of all players.
  - **Response:**
```json
[
  {
    "player_id": "1",
    "name": "LeBron James",
    "team": "cleveland cavaliers",
    "position": "Forward",
    "height": "6'9\"",
    "weight": "250 lbs",
    "birthdate": "1984-12-30",
    "image_url": "https://i.pinimg.com/564x/6a/ae/f7/6aaef74808fdfbe4b25c41699fba6d81.jpg"
  },
  
]
```

- ### POST /my_team

- Adds a new player to the user's team.
- **Request Body:**
```json
{
  "player_id": "1",
  "name": "LeBron James",
  "team": "cleveland cavaliers",
  "position": "Forward",
  "height": "6'9\"",
  "weight": "250 lbs",
  "birthdate": "1984-12-30",
  "image_url": "https://i.pinimg.com/564x/6a/ae/f7/6aaef74808fdfbe4b25c41699fba6d81.jpg"
}
```

- **Response:**
```json
{
  "player_id": "1",
  "name": "LeBron James",
  "team": "cleveland cavaliers",
  "position": "Forward",
  "height": "6'9\"",
  "weight": "250 lbs",
  "birthdate": "1984-12-30",
  "image_url": "https://i.pinimg.com/564x/6a/ae/f7/6aaef74808fdfbe4b25c41699fba6d81.jpg"
}
```

- ### DELETE /my_team/:playerId
- Removes a player from the user's team.
- Response: 204 No Content

## Setup
### Prerequisites
- Node.js
- npm 
### Installation
1 Clone the repository:
```bash
git clone git@github.com:rohbi05/BASKETMANIA.git
```
2 Navigate to the project directory:
```bash
cd BASKETMANIA
```
3 Install dependencies:
```bash
npm install
```
4 Start the JSON Server:

To run the JSON server for players data:

```bash
json-server --watch db.json --port 3000
```
To run the JSON server for the user's team:
```bash
json-server --watch team.json --port 3001
```
5 Start the server:
```bash
npm run dev
```

oo2 The server will run on **http://localhost:3000** for players and **http://localhost:3001** for the user's team.

### License
This project is licensed under the MIT License. See the LICENSE file for details.