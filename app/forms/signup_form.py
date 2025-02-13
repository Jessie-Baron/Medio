from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from email_validator import validate_email, EmailNotValidError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def real_email(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def image_url_is_valid(form, field):
    image_url = field.data
    print(image_url)
    if not (image_url.endswith("jpg") or image_url.endswith("png") or image_url.endswith("jpeg") or image_url.endswith("gif")):
        raise ValidationError('Please input a valid URL')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    bio = StringField('bio', validators=[DataRequired()])
    image_url = StringField('imageUrl', validators=[
                            DataRequired(), image_url_is_valid])
    password = StringField('password', validators=[DataRequired()])
