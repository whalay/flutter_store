#!/usr/bin/python3
""" objects that handles all default RestFul API actions for roles """
from models.role import Role
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/roles', methods=['GET'], strict_slashes=False)
def get_role():
    """
    Retrieves the list of all user objects
    or a specific user
    """
    all_roles = storage.all(Role).values()
    list_roles = []
    for role in all_roles:
        list_roles.append(role.to_dict())
    return jsonify(list_roles)

@app_views.route('/role', methods=['POST'], strict_slashes=False)
def post_role():
    """
    Creates a category
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Role(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)
