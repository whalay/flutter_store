#!/usr/bin/python3
""" This module contains the category class """
from models.base_model import Base, BaseModel
from models.product import Product
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

class Category(BaseModel, Base):
    """ defines the category class """

    __tablename__ = "categories"
    name = Column(String(60), nullable=False)

