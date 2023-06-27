#!/usr/bin/python3

"""This module defines a base class for all models in our flutter project"""

import os
import uuid
import models
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer

try:
    from sqlalchemy.ext.declarative import declarative_base
except Exception:
    from sqlalchemy.orm import declarative_base

Base = declarative_base()


class BaseModel:
    """A base class for all hbnb models"""
    id = Column(
            String(60),
            primary_key=True,
            nullable=False,
            unique=True)

    created_at = Column(
                    DateTime,
                    default=datetime.utcnow(),
                    nullable=False)

    updated_at = Column(
                    DateTime,
                    default=datetime.utcnow(),
                    nullable=False)

    def __init__(self, *args, **kwargs):
        """Instatntiates a new model"""

        if not kwargs:
            self.id = str(uuid.uuid4())
            self.created_at = self.updated_at = datetime.now()
        else:
            for key, value in kwargs.items():
                if key == 'created_at' or key == 'updated_at':
                    value = datetime.strptime(value, "%Y-%m-%dT%H:%M:%S.%f")
                if key != '__class__':
                    setattr(self, key, value)
            # If id, created or updated at are not in the kwargs, create them
            if 'id' not in kwargs.keys():
                self.id = str(uuid.uuid4())

            ca = 'created_at'
            ua = 'updated_at'
            if ca not in kwargs.keys() and ua not in kwargs.keys():
                self.created_at = self.updated_at = datetime.now()
            elif 'created_at' not in kwargs.keys():
                self.created_at = datetime.now()
            elif 'updated_at' not in kwargs.keys():
                self.updated_at = datetime.now()

    def __str__(self):
        """Returns a string representation of the instance"""

        cls = (str(type(self)).split('.')[-1]).split('\'')[0]
        return '[{}] ({}) {}'.format(
                cls,
                self.id,
                self.__dict__)

    def __repr__(self):
        """ For string representation in case of print(State) """

        return self.__str__()

    def save(self):
        """Updates updated_at with current time when instance is changed"""

        self.updated_at = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()

    def to_dict(self):
        """Convert instance into dict format"""

        dictionary = dict(self.__dict__)
        dictionary.update(
                {'__class__': (str(type(self)).split('.')[-1]).split('\'')[0]})
        dictionary['created_at'] = self.created_at.isoformat()
        dictionary['updated_at'] = self.updated_at.isoformat()

        if '_sa_instance_state' in dictionary.keys():
            del dictionary["_sa_instance_state"]

        return dictionary

    def delete(self):
        """ deletes the current instance from storage """

        models.storage.delete(self)
