from flask import Flask
from app.extensions import db
import os
from dotenv import load_dotenv
from .Controllers.routes import routes_bp



def create_app():
    app = Flask(__name__)
    
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    
    
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.secret_key = os.getenv("SECRET_KEY")
    #  Inicializa la base de datos
    db.init_app(app)

    # Seguridad de cookies
    app.config["SESSION_COOKIE_SECURE"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    
    #  Registra los blueprints
    app.register_blueprint(routes_bp)
    return app
