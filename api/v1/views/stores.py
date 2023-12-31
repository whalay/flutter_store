#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models.store import Store
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flask_login import current_user,  login_required
from flask_cors import cross_origin

@app_views.route('/stores', methods=['GET'], strict_slashes=False)
@login_required
def get_stores():
    """
    Retrieves the list of all product objects
    or a specific product
    """
    all_stores = storage.all(Store).values()
    list_stores = []
    for store in all_stores:
        list_stores.append(store.to_dict())
    return jsonify(list_stores)

@app_views.route('/stores/<store_id>', methods=['GET'], strict_slashes=False)
def get_store(store_id):
    """ Retrieves an product """
    store = storage.get(Store, store_id)
    if not store:
        abort(404)

    return jsonify(store.to_dict())


@app_views.route('/store', methods=['POST'], strict_slashes=False)
def post_store():
    """
    Creates a product
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'store_name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Store(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/stores', methods=['POST'], strict_slashes=False)
@login_required
def post_userstore():
    """
    Creates a product
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'store_name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Store(**data, owner_id = current_user.id)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/mystores', methods=['GET'], strict_slashes=False)
@login_required
def get_user_stores():
    """
    Retrieves the list of stores owned by the logged-in user
    """
    user_stores = current_user.stores
    if not user_stores:
        return make_response(jsonify({'message': 'User has no stores'}), 404)

    list_stores = [store.to_dict() for store in user_stores]
    return make_response(jsonify(list_stores), 200)
