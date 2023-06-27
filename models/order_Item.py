#!/usr/bin/python3
""" This module contains the course class """
from models.base_model import Base, BaseModel
from models.order import Order
from models.product import Product
from sqlalchemy import Column, String, Integer, Float, DECIMAL,  ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship

class Order_Item(BaseModel, Base):
    """ defines the order item class """

    __tablename__ = "order_items"
    order_id = Column(String(60), ForeignKey("orders.id"), nullable=False)
    product_id = Column(String(60), ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price =  Column(DECIMAL(10,2), nullable=False)
    order = relationship('Order', backref='order_items')
    product = relationship('Product', backref='order_items')

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
