#!/usr/bin/python3

""" This module defines a class to manage database storage for hbnb clone"""

import os
import models
from models.base_model import Base
from models.user import User
from models.store import Store
from models.product import Product
from models.category import Category
from models.order import Order
from models.order_Item import Order_Item
from models.comment import Comment
from models.permission import Permission
from models.role import Role
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session


classes = {"User": User,"Product": Product,"Store": Store, 
	   "Comment": Comment, "Category": Category,"Order": Order, 
	   "Order_Item": Order_Item, "Permission": Permission, "Role": Role}

class DBStorage:
    """ Database storage using mysql db and sqlalchemy module """

    __engine = None
    __session = None
    __objects = {}

    

    def __init__(self):
        """ Initialization of engine """

        dialect = "mysql"
        driver = "mysqldb"
        user = os.getenv("PRAC_MYSQL_USER", default="prac_dev")
        password = os.getenv("PRAC_MYSQL_PWD", default="prac_dev_pwd")
        host = os.getenv("PRAC_MYSQL_HOST", default="localhost")
        database = os.getenv("PRAC_MYSQL_DB", default="prac_dev_db")
        is_test = os.getenv("PRAC_ENV")

        self.__engine = create_engine("{}+{}://{}:{}@{}/{}".format(
            dialect, driver, user, password, host, database),
            pool_pre_ping=True)

        if is_test == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

        return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count
