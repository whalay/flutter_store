#!/usr/bin/python3
""" objects that handles all default RestFul API actions for categories """
from models.category import Category
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/categories', methods=['GET'], strict_slashes=False)
def get_categories():
    """
    Retrieves the list of all user objects
    or a specific user
    """
    all_categories = storage.all(Category).values()
    list_categories = []
    for category in all_categories:
        list_categories.append(category.to_dict())
    return jsonify(list_categories)

@app_views.route('/category', methods=['POST'], strict_slashes=False)
def post_categories():
    """
    Creates a category
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Category(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)
