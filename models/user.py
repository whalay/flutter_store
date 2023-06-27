#!/usr/bin/python3
""" holds class User"""

import models
from email_validator import validate_email
from flask_login import UserMixin
from models.base_model import BaseModel, Base
from models.role import Role
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from hashlib import md5


class User(BaseModel, UserMixin, Base):
    """Representation of a user """
    __tablename__ = 'users'
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    username = Column(String(128), unique=True, nullable=False)
    email = Column(String(128), unique=True, nullable=False)
    password = Column(String(128), nullable=False)

    role_id = Column(
                String(60),
                ForeignKey("roles.id"),
                nullable=False)

    role = relationship('Role', backref='users', cascade='all')


    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """ hashes the password to an md5 when set """

        if name == "first_name":
            if not value.isalpha():
                raise ValueError("first name must contain only letters")

        if name == "last_name":
            if not value.isalpha():
                raise ValueError("last name must contain only letters")

        if name == "email":
            try:
                validate_email(value)
            except Exception:
                raise ValueError("email address is invalid")

        if name == "password":
            md5_hash = md5()
            md5_hash.update(value.encode("utf-8"))
            value = md5_hash.hexdigest()

        super().__setattr__(name, value)

