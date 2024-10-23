from database import db  

# User model (One-to-Many with Team)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Add password field
    username = db.Column(db.String(80), unique=True, nullable=False)
    teams = db.relationship('Team', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'teams': [team.to_dict() for team in self.teams]
        }

    def __repr__(self):
        return f'<User {self.email}>'

# Team model (One-to-Many with Player, Many-to-One with User)
class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    players = db.relationship('TeamPlayer', backref='team', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'players': [team_player.to_dict() for team_player in self.players]
        }

# Player model (Many-to-Many with Team through TeamPlayer)
class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    position = db.Column(db.String(80), nullable=False)
    height = db.Column(db.Float)  # Assuming height is a float
    weight = db.Column(db.Float)  # Assuming weight is a float
    birthdate = db.Column(db.Date)  # Assuming birthdate is a date
    image_url = db.Column(db.String(255))

    teams = db.relationship('TeamPlayer', backref='player', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'position': self.position,
            'height': self.height,  # Include height in to_dict
            'weight': self.weight,   # Include weight in to_dict
            'birthdate': str(self.birthdate) if self.birthdate else None,  # Format birthdate to string
            'image_url': self.image_url,
            'teams': [team_player.to_dict() for team_player in self.teams]
        }

# Association table for Many-to-Many between Team and Player
class TeamPlayer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    role = db.Column(db.String(80), nullable=False)  # User-submittable attribute

    def to_dict(self):
        return {
            'id': self.id,
            'team_id': self.team_id,
            'player_id': self.player_id,
            'role': self.role
        }