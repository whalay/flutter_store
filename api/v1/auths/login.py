#!/usr/bin/python3
""" configures the auth """
from api.v1.auths import auth
from flask import current_app, make_response, jsonify, request, abort
from flask_login import current_user, login_user, logout_user, login_required
from models import storage
from models.user import User
import jwt
from hashlib import md5

@auth.route('/login',
            methods=['POST'],
            strict_slashes=False)
def login():
    """ Login the user """

    try:
        credentials = request.get_json()
    except Exception:
        abort(401, 'Not a valid json')

    email = credentials.get('email')
    password = credentials.get('password')

    value = md5(password.encode()).hexdigest()

    all_objs = storage.all(User)
    user = None
    for obj in all_objs.values():
        if obj.email == email:
            if obj.password == value:
                user = obj
                break
            else:
                response = jsonify({'message': 'Incorrect Password'})
                return make_response(response, 401)

    if user:
        login_user(user)
        """token = jwt.encode(
            {'user_id': user.id},
            current_app.config['SECRET_KEY'],
            algorithm='HS256')"""

        user_dict = user.to_dict()
        response = make_response(jsonify({'message': 'Login successful',
                                          'user': user_dict}), 200)
        """response.set_cookie('token', token, httponly=False)"""
        return response
    else:
        return make_response(jsonify({'message': 'user not found'}), 404)


@auth.route('/logout')
@login_required
def logout():
    """ Log the user out """

    logout_user()

    response = jsonify({'message': 'Logout successful'})
    """response.delete_cookie('token')"""
    return response


@auth.route('/auth_status')
def auth_status():
    """ Checks the authentication status """

    if current_user.is_authenticated:
        user_dict = current_user.to_dict() 
        return jsonify({'authenticated': True, 'user': user_dict})
    return jsonify({'authenticated': False})
