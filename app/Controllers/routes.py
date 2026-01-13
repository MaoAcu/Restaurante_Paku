from flask import Blueprint, render_template



routes_bp = Blueprint("routes", __name__)



@routes_bp.route('/')
def index():
    return render_template('index.html')


@routes_bp.route("/dashboard", endpoint="dashboard")
def DashBoard():
    return render_template('dashboard.html')






