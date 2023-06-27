#!/usr/bin/python3
""" This module contains the role class """
from models.base_model import Base, BaseModel
from models.permission import Permission
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Role(BaseModel, Base):
    """ defines the role class """

    __tablename__ = "roles"
    name = Column(String(255), nullable=False)
    permissions = relationship('Permission', secondary='role_permission',
			     backref='roles')
