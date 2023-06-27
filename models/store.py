#!/usr/bin/python3
""" holds class User"""

import models
from models.user import User
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

class Store(BaseModel, Base):
    """Representation of a user """
    __tablename__ = 'stores'
    store_name = Column(String(255),
			nullable=False,
			unique=True)
    owner_id = Column(String(128),
		      ForeignKey("users.id"),
		       nullable=False)
    location = Column(String(255), nullable=False)

    owner = relationship('User',
			 backref='stores',
			 cascade='all')
