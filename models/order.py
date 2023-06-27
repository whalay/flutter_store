#!/usr/bin/python3
""" This module contains the course class """
from models.base_model import Base, BaseModel
from models.user import User
from models.store import Store
from sqlalchemy import Column, String, Integer, Float, DECIMAL,  ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship


class Order(BaseModel, Base):
    """ defines the order class """

    __tablename__ = "orders"
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    store_id = Column(String(60), ForeignKey("stores.id"), nullable=False)
    total_amount = Column(DECIMAL(10,2), nullable=False)
    status = Column(String(60), nullable=False, default='Pending')
    user = relationship('User', backref='orders')
    product = relationship('Store', backref='orders')

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
