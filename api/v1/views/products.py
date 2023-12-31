#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models.store import Store
from models.category import Category
from models.product import Product
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flask_login import login_required

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




@app_views.route('/products/categories/<category_id>', methods=['GET'])
def get_product_by_products_category(category_id):
    # Find the category by ID
    category = storage.get(Category, category_id)

    if not category:
        return jsonify({'message': 'Category not found'}), 404

    # Retrieve products associated with the category
    products = storage.all(Product)
    matching_products = []

    for prod in products.values():
        if prod.category_id == category_id:
            matching_products.append({
                'product_id': prod.id,
                'product_name': prod.product_name,
                'price': prod.price,
                'description': prod.description,
                'category_name': category.name
                # Include additional fields if necessary
            })

    if not matching_products:
        return jsonify({'message': 'No products found for the category'}), 404

    return jsonify(matching_products), 200



@app_views.route('/stores/<store_id>/products', methods=['POST'], strict_slashes=False)
@login_required
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


@app_views.route('/stores/<store_id>/product/<product_id>', methods=['GET'], strict_slashes=False)
@login_required
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

@app_views.route('/stores/<store_id>/product/<product_id>', methods=['PUT'], strict_slashes=False)
@login_required
def update_store_product(store_id, product_id):
    """ Updates a product within a store """
    store = storage.get(Store, store_id)
    if not store:
        return jsonify({'message': 'Store not found'}), 404

    product = storage.get(Product, product_id)
    if not product or product.store_id != store_id:
        return jsonify({'message': 'Product not found'}), 404

    if not request.get_json():
        abort(400, description="Not a JSON")


    ignore = ['id']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(product, key, value)
    storage.save()
    return make_response(jsonify(product.to_dict()), 200)


@app_views.route('/stores/<store_id>/product/<product_id>', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_store_product(store_id, product_id):
    """ Deletes a product within a store """
    store = storage.get(Store, store_id)
    if not store:
        return jsonify({'message': 'Store not found'}), 404

    product = storage.get(Product, product_id)
    if not product or product.store_id != store_id:
        return jsonify({'message': 'Product not found'}), 404

    storage.delete(product)
    storage.save()
    return jsonify({'message': 'Product deleted'}), 200


@app_views.route('/stores/<store_id>/products/', methods=['GET'], strict_slashes=False)
@login_required
def get_store_products(store_id):
    store = storage.get(Store, store_id)
    if not store:
        return jsonify({'message': 'Store not found'}), 404

    products = storage.all(Product)
    list_products = []

    for prod in products.values():
        if prod.store_id == store_id:
            list_products.append(prod.to_dict())

    if not list_products:
        return jsonify({'message': 'Product not found'}), 404

    return jsonify(list_products)



@app_views.route('/stores/<store_id>/p/', methods=['GET'])
@login_required
def get_store_p(store_id):
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
