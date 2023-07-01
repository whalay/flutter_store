#!/usr/bin/python3
""" objects that handles all default RestFul API actions for categories """
from models.category import Category
from models.product import Product
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

@app_views.route('/categories', methods=['POST'], strict_slashes=False)
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


@app_views.route('/categories/<category_id>/products', methods=['GET'])
def get_product_by_category_products(category_id):
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

@app_views.route('/categories/<category_id>/products/<products_id>', methods=['GET'])
def get_products_by_category(category_id, product_id):
    # Find the category by ID
    category = storage.get(Category, category_id)

    if not category:
        return jsonify({'message': 'Category not found'}), 404

    products = storage.all(Product)
    product = None

    for prod in products.values():
        if prod.category_id == category_id and prod.id == product_id:
            product = prod
            break

    if not product:
        return jsonify({'message': 'Product not found'}), 404
    
    return jsonify(product.to_dict()), 200
