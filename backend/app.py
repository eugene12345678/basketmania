from flask import jsonify, request
from database import app, db  # Importing app and db from the database.py
from models import User, Team, Player, TeamPlayer
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash
from datetime import datetime

# Initialize migration
migrate = Migrate(app, db)

# Create all database tables if they don't exist
with app.app_context():
    db.create_all()

# Helper function for error responses
def error_response(message, status_code):
    return jsonify({'error': message}), status_code

# Routes for Users
@app.route('/users', methods=['GET', 'POST'])
def manage_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])

    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')  # Ensure username is captured for new users
        email = data.get('email')
        password = data.get('password')

        # Basic validation
        if not username or not email or not password:
            return error_response("Username, email, and password are required.", 400)

        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return error_response("User already exists.", 400)

        # Create new user with hashed password
        hashed_password = generate_password_hash(password, method='sha256')
        new_user = User(username=username, email=email, password=hashed_password)  # Ensure username is included
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201

# Update user details
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id) 

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

   
    if username:
        user.username = username
    if email:
        user.email = email
    if password:
        user.password = generate_password_hash(password, method='sha256')

    db.session.commit()  # Commit changes to the database
    return jsonify(user.to_dict()), 200

@app.route('/signup', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        data = request.get_json()  # Get the JSON data sent from the frontend
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Validate user credentials
        if not username or not email or not password:
            return error_response("Username, email, and password are required.", 400)

        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return error_response("User already exists.", 400)

        # Create new user with raw password (not recommended)
        new_user = User(username=username, email=email, password=password)  # Store raw password
        db.session.add(new_user)
        db.session.commit()

        return jsonify(new_user.to_dict()), 201

    elif request.method == 'GET':
        email = request.args.get('email')  # Optional query parameter for specific user
        if email:
            user = User.query.filter_by(email=email).first()
            if user:
                return jsonify(user.to_dict()), 200
            else:
                return error_response("User not found.", 404)
        else:
            # Return all users if no email is provided
            users = User.query.all()
            return jsonify([user.to_dict() for user in users]), 200



# Routes for Teams
@app.route('/teams', methods=['GET', 'POST'])
def manage_teams():
    if request.method == 'GET':
        teams = Team.query.all()
        return jsonify([team.to_dict() for team in teams])

    if request.method == 'POST':
        data = request.get_json()
        # Ensure both team name and user_id are provided
        name = data.get('name')
        user_id = data.get('user_id')
        if not name or not user_id:
            return error_response("Team name and user ID are required.", 400)
        new_team = Team(name=name, user_id=user_id)
        db.session.add(new_team)
        db.session.commit()
        return jsonify(new_team.to_dict()), 201

# Routes for Players
@app.route('/players', methods=['GET', 'POST'])
def manage_players():
    if request.method == 'GET':
        players = Player.query.all()
        return jsonify([player.to_dict() for player in players])

    if request.method == 'POST':
        data = request.get_json()
        
        # Basic validation for player details
        if not data.get('name') or not data.get('age') or not data.get('position'):
            return error_response("Name, age, and position are required.", 400)
        
        new_player = Player(
            name=data['name'],
            age=data['age'],
            position=data['position'],
            height=data.get('height'),
            weight=data.get('weight'),
            birthdate=datetime.strptime(data['birthdate'], '%Y-%m-%d') if data.get('birthdate') else None,
            image_url=data.get('image_url')
        )
        db.session.add(new_player)
        db.session.commit()
        return jsonify(new_player.to_dict()), 201

# Routes for TeamPlayer (Many-to-Many association)
@app.route('/team-players', methods=['GET', 'POST'])
def manage_team_players():
    if request.method == 'POST':
        data = request.get_json()
        # Validate input
        team_id = data.get('team_id')
        player_id = data.get('player_id')
        role = data.get('role')
        
        if not team_id or not player_id or not role:
            return error_response("Team ID, Player ID, and Role are required.", 400)

        new_team_player = TeamPlayer(
            team_id=team_id,
            player_id=player_id,
            role=role
        )
        db.session.add(new_team_player)
        db.session.commit()
        return jsonify(new_team_player.to_dict()), 201

    elif request.method == 'GET':
        team_id = request.args.get('team_id')
        
        if team_id:
            # Fetch players for a specific team
            team_players = TeamPlayer.query.filter_by(team_id=team_id).all()
            return jsonify([player.to_dict() for player in team_players]), 200
        else:
            # Fetch all team players
            team_players = TeamPlayer.query.all()
            return jsonify([player.to_dict() for player in team_players]), 200


# Full CRUD actions for Teams
@app.route('/teams/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_team(id):
    team = Team.query.get_or_404(id)

    if request.method == 'GET':
        return jsonify(team.to_dict())

    if request.method == 'PUT':
        data = request.get_json()
        team.name = data.get('name', team.name)  # Update name only if provided
        db.session.commit()
        return jsonify(team.to_dict())

    if request.method == 'DELETE':
        db.session.delete(team)
        db.session.commit()
        return jsonify({'message': 'Team deleted successfully'}), 204

if __name__ == '__main__':
    app.run(debug=True)
