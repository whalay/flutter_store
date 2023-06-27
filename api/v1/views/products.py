#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models.store import Store
from models.product import Product
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request

@app_views.route('/products', methods=['GET'], strict_slashes=False)
def get_products():
    """
    Retrieves the list of all product objects
    or a specific product
    """
    all_products = storage.all(Product).values()
    list_products = []
    for product in all_products:
        list_products.append(product.to_dict())
    return jsonify(list_products)

@app_views.route('/products/<product_id>', methods=['GET'], strict_slashes=False)
def get_byproduct(product_id):
    """ Retrieves an product """
    product = storage.get(Product, product_id)
    if not product:
        abort(404)

    return jsonify(product.to_dict())


@app_views.route('/stores/<store_id>/products', methods=['POST'], strict_slashes=False)
def add_product(store_id):
    """
    Creates a product for a store
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'product_name' not in request.get_json():
        abort(400, description="Missing name")
    if 'price' not in request.get_json():
        abort(400, description="Missing price")
    if 'category_id' not in request.get_json():
        abort(400, description="Missing category")

    store = storage.get(Store, store_id)
    if not store:
        return jsonify({'message': 'Store not found'}), 404

    data = request.get_json()
    data['store_id'] = store_id
    instance = Product(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/stores/<store_id>/products/<product_id>', methods=['GET'])
def get_product(store_id, product_id):
    store = storage.get(Store, store_id)
    if not store:
        return jsonify({'message': 'Store not found'}), 404

    products = storage.all(Product)
    product = None

    for prod in products.values():
        if prod.store_id == store_id and prod.id == product_id:
            product = prod
            break

    if not product:
        return jsonify({'message': 'Product not found'}), 404


    response = {
        'product_id': product.id,
        'product_name': product.product_name,
        'price': product.price,
        'description': product.description,
	'store_name': store.store_name
        # Include additional fields if necessary
    }

    return jsonify(response), 200
    #return jsonify(product.to_dict()), 200

@app_views.route('/stores/<store_id>/products/', methods=['GET'])
def get_store_products(store_id):
    store = storage.get(Store, store_id)
    if not store:
        return jsonify({'message': 'Store not found'}), 404

    products = storage.all(Product)
    product = None

    for prod in products.values():
        if prod.store_id == store_id:
            product = prod
            break

    if not product:
        return jsonify({'message': 'Product not found'}), 404


    response = {
        'product_id': product.id,
        'product_name': product.product_name,
        'price': product.price,
        'description': product.description,
        'store_name': store.store_name
        # Include additional fields if necessary
    }

    return jsonify(response), 200
    #return jsonify(product.to_dict()), 200
