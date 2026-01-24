from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from app import db
from app.models.login import Login

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":

        correo = request.form.get("usuario")
        password = request.form.get("password")

        login = Login.query.filter_by(correo=correo).first()

        if not login:
            flash("Usuario o contraseña incorrectos")
            return redirect(url_for("auth.login"))

        if not login.esta_activo():
            flash("Usuario bloqueado. Restablezca la contraseña.", "error")
            return redirect(url_for("auth.login"))

        if not login.verificar_password(password):
            login.registrar_fallo()
            db.session.commit()

            if login.estado == 0:
                flash(
                    "Usuario bloqueado por demasiados intentos fallidos. Restablezca la contraseña",
                    "error"
                )
            else:
                flash("Usuario o contraseña incorrectos")

            return redirect(url_for("auth.login"))

        # ---- LOGIN CORRECTO ----
        login.registrar_login_exitoso()
        db.session.commit()

        session.clear()

        session["idusuario"] = login.idusuario
        session["correo"] = login.correo
        session["local"] = login.local

        print("SESSION:", dict(session))

        return redirect(url_for("routes.dashboard"))

    return render_template("login.html")

@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("auth.login"))