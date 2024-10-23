# Backend API for Player Management
## Overview
**BasketMania** is a comprehensive sports management application designed specifically for basketball enthusiasts. The backend of BasketMania serves as a robust API that facilitates seamless interactions between users and the application. It allows users to create and manage basketball teams, track player statistics, and engage with the basketball community.
The application is built using **Flask**, a lightweight and powerful web framework for Python, which makes it easy to develop RESTful APIs. The backend is structured to support various functionalities, including user authentication, team management, and player management, ensuring a smooth and efficient user experience.

### Key Functionalities

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
4 Create a virtual environment:

```bash
python -m venv venv
```
5 Activate the virtual environment:

- On Windows:
```bash
venv\Scripts\activate
```
- On macOS/Linux:
```bash
source venv/bin/activate
```
6 Install the required packages:
```bash
pip install -r requirements.txt
```
7 Set up the database:
```bash
flask db init
flask db migrate
flask db upgrade
```
8 Usage
To start the Flask server, run the following command:
```bash
flask run
```
The server will start on http://127.0.0.1:5000/. You can use tools like Postman or Curl to interact with the API endpoints.
9 Start the server:
```bash
npm run dev
```


### License
This project is licensed under the MIT License. See the LICENSE file for details.