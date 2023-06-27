#!/usr/bin/python3
""" This module contains the course class """
from models.base_model import Base, BaseModel
from models.user import User
from models.product import Product
from sqlalchemy import Column, String, Integer, Float, DateTime,  ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship

class Comment(BaseModel, Base):
    """ defines the comment class """

    __tablename__ = "comments"
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    product_id = Column(String(60), ForeignKey("products.id"), nullable=False)
    comment = Column(String(255), nullable=False)

    user = relationship('User', backref='comments')
    product = relationship('Product', backref='comments')

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
