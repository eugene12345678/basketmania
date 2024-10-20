from datetime import datetime  # Import datetime to handle date conversions
from database import db, app  # Import db and app from your database module
from models import User, Team, Player, TeamPlayer

# Sample data to seed the database
users_data = [
    {'username': 'john_doe', 'email': 'john@example.com', 'password': 'password123'},
    {'username': 'jane_smith', 'email': 'jane@example.com', 'password': 'password456'},
]

teams_data = [
    {'name': 'Team Alpha', 'user_id': 1},
    {'name': 'Team Beta', 'user_id': 2},
]

players_data = [
    {'name': 'Player One', 'age': 24, 'position': 'Forward', 'height': 6.1, 'weight': 180, 'birthdate': '1999-01-15', 'image_url': 'http://example.com/player1.jpg'},
    {'name': 'Player Two', 'age': 27, 'position': 'Guard', 'height': 5.9, 'weight': 160, 'birthdate': '1996-03-22', 'image_url': 'http://example.com/player2.jpg'},
]

team_players_data = [
    {'team_id': 1, 'player_id': 1, 'role': 'Captain'},
    {'team_id': 1, 'player_id': 2, 'role': 'Member'},
    {'team_id': 2, 'player_id': 1, 'role': 'Member'},
]

# Function to seed the database
def seed_db():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Create users
        for user_data in users_data:
            new_user = User(
                username=user_data['username'],
                email=user_data['email'],
                password=user_data['password']  # Store raw password for seeding; ideally, hash in production
            )
            db.session.add(new_user)

        db.session.commit()  # Commit after adding users to save them in the database

        # Create teams
        for team_data in teams_data:
            new_team = Team(
                name=team_data['name'],
                user_id=team_data['user_id']
            )
            db.session.add(new_team)

        db.session.commit()  # Commit after adding teams

        # Create players
        for player_data in players_data:
            # Convert birthdate string to a date object
            birthdate = datetime.strptime(player_data['birthdate'], '%Y-%m-%d').date()
            
            new_player = Player(
                name=player_data['name'],
                age=player_data['age'],
                position=player_data['position'],
                height=player_data['height'],
                weight=player_data['weight'],
                birthdate=birthdate,  # Use the date object here
                image_url=player_data['image_url']
            )
            db.session.add(new_player)

        db.session.commit()  # Commit after adding players

        # Create team-players relationships
        for team_player_data in team_players_data:
            new_team_player = TeamPlayer(
                team_id=team_player_data['team_id'],
                player_id=team_player_data['player_id'],
                role=team_player_data['role']
            )
            db.session.add(new_team_player)

        db.session.commit()  # Commit after adding team-players

        print("Database seeded successfully.")

# Run the seed function
if __name__ == '__main__':
    seed_db()
