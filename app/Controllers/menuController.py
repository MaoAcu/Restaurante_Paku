from flask import Blueprint, jsonify,session
from app.extensions import db
from app.models.menu import Menu

menu_bp = Blueprint("menu", __name__)


@menu_bp.route("/menu", methods=["GET"])
def GetMenu():
    try:
        local_id = 1
        if not local_id:
            return jsonify({"error": "Se requiere el parámetro 'local'"}), 400

        menus = Menu.query.filter_by(local=local_id, estado="active").all()

        data = [
            {
                "idmenu": m.idmenu,
                "local": m.local,
                "nombre": m.nombre,
                "descripcion": m.descripcion,
                "precio": float(m.precio),
                "imagen": m.imagen,
                "categoria": m.categoria,
                "estado": m.estado,
            }
            for m in menus
        ]
        print(data)
        return jsonify(data), 200

    except Exception as e:
        print(f"[ERROR get_menu]: {e}")
        return jsonify({"error": "No se pudo obtener el menú"}), 500
