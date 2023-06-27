#!/usr/bin/python3

""" Product Module for my project """

import models
import os
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

class Product(BaseModel, Base):
    """ The Product class, contains seller ID and name, price """
    __tablename__ = 'products'
    product_name = Column(String(128), nullable=False)
    price = Column(Float, nullable=False)
    description = Column(String(200), nullable=False)
    store_id = Column(String(60), ForeignKey('stores.id'), nullable=False)
    category_id = Column(String(60), ForeignKey('categories.id'), nullable=False)

    store =relationship('Store', backref='products')
    category =relationship('Category', backref='products')
    

    def __init__(self, *args, **kwargs):
        """initializes products"""
        super().__init__(*args, **kwargs)
