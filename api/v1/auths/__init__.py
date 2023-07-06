#!/usr/bin/python3
""" creates the auth blueprint """
from flask import Blueprint


auth = Blueprint('auth', __name__, url_prefix='/api/auth/')


from api.v1.auths.login import *
