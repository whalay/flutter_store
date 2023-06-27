#!/usr/bin/python3
""" This module contains the role class """
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Integer, ForeignKey, Table





role_permission = Table(
    'role_permission',
    Base.metadata,
    Column('role_id', String(60), ForeignKey('roles.id'), primary_key=True),
    Column('permission_id', String(60), ForeignKey('permissions.id'), primary_key=True)
)

class Permission(BaseModel, Base):
    """ defines the permission class """

    __tablename__ = "permissions"
    name = Column(String(255), unique=True, nullable=False)

