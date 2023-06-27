#!/usr/bin/python3

""" This module instantiates an object of class FileStorage """
from models.engine.db_storage import DBStorage
from models.base_model import BaseModel
import os

storage = DBStorage()

storage.reload()
