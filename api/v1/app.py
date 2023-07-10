#!/usr/bin/python3
""" Flask Application """
from models import storage
from models.user import User
from api.v1.views import app_views
from api.v1.auths import auth
from os import environ
from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS
from flask_login import LoginManager
from flasgger import Swagger
from flasgger.utils import swag_from

app = Flask(__name__)
CORS(app,
     resources={r"/*": {"origins": "*"}},
     supports_credentials=True,
     expose_headers=['Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
     allow_headers=['Content-Type', 'Authorization'])
app.config['SECRET_KEY'] = 'thisthatthisthat'

login_manager = LoginManager(app)

app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True


app.register_blueprint(app_views)
app.register_blueprint(auth)

@login_manager.user_loader
def load_user(user_id):
    user = storage.get(User, user_id)
    if user is not None:
        return user

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()



@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Page not found"}), 404)

app.config['SWAGGER'] = {
    'title': 'Market Place',
    'uiversion': 1
}

Swagger(app)


if __name__ == "__main__":
    """ Main Function """
    host = environ.get('HBNB_API_HOST')
    port = environ.get('HBNB_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    app.run(host=host, port=port, threaded=True)

