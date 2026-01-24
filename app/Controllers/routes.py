from flask import Blueprint, render_template,send_from_directory,current_app
import os
from .decorators import loginRequired,localRequired

routes_bp = Blueprint("routes", __name__)



@routes_bp.route('/')
def index():
    return render_template('index.html')

@routes_bp.route("/service-worker.js")
def service_worker():
    return send_from_directory(
        os.path.join(current_app.root_path, "static"),
        "service-worker.js",
        mimetype="application/javascript"
    )
    

@routes_bp.route("/dashboard", endpoint="dashboard")
@loginRequired
@localRequired(1,2)
def DashBoard():
    return render_template('dashboard.html')



@routes_bp.route("/Menu", endpoint="Menu")
def Menu():
    return render_template('index.html')

@routes_bp.route("/login", endpoint="login")
def Login():
    return render_template('login.html')






