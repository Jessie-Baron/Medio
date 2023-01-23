from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)

like_story = db.Table(
    "like_story",
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("story_id", db.Integer, db.ForeignKey(add_prefix_for_prod("stories.id")))
)

like_comment = db.Table(
    "like_comment",
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("comment_id", db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")))
)

if environment == "production":
    follows.schema = SCHEMA
    like_story.schema = SCHEMA
    like_comment.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    image_url = db.Column(db.String(255), nullable=True, unique=True)
    bio = db.Column(db.String(255), nullable=True, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.followed_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic",
    )

    liked = db.relationship(
        "Story",
        secondary=like_story,
        lazy='dynamic',
        back_populates = "liked_story_user"
    )

    liked_comment = db.relationship(
        "Comment",
        secondary=like_comment,
        lazy='dynamic',
        back_populates = "liked_comment_user"
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            'bio': self.bio,
            'image_url': self.image_url,
        }


    stories = db.relationship("Story", back_populates="user")

    # user_id = db.relationship("LikeStory", back_populates="")

    comments = db.relationship("Comment", back_populates="user")
