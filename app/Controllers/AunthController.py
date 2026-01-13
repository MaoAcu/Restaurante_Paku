from flask import Blueprint, render_template, request, redirect, url_for, session, flash,current_app,jsonify
from sqlalchemy import text
from app import db
import bcrypt

auth_bp = Blueprint("auth", __name__)



@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        
        
        
        usuario = request.form.get("usuario")
        password = request.form.get("password")

        # Valida usuario y obtener hash de la contraseña
        sql_user = text("SELECT idusuario, password, intentos, estado, tipo FROM usuario WHERE usuario=:usuario")
        result_user = db.session.execute(sql_user, {"usuario": usuario})
        user = result_user.fetchone()

        if not user:
            flash("Usuario o password incorrecto inténtelo de nuevo")
            return redirect(url_for("auth.login"))

        if user.estado != 1:
            flash("Usuario bloqueado. Restablezca la contraseña.", "error")
            return redirect(url_for("auth.login"))

        #  Verifica contrasena con bcrypt
        if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
            session["usuarioLog"] = user.idusuario
            # Obtener teléfono según tipo
            if user.tipo in (1, 3, 4):  # Consultante
               sql_tel = text("SELECT telefono FROM consultante WHERE idusuario = :idusuario")
            elif user.tipo == 2:  # Terapeuta
                sql_tel = text("SELECT telefono FROM terapeuta WHERE idusuario = :idusuario")
            else:
                sql_tel = None

            telefono = None
            if sql_tel is not None:
               result_tel = db.session.execute(sql_tel, {"idusuario": user.idusuario})
               telefono = result_tel.scalar()
    
            session["phoneLog"] = telefono
            # Incrementar intentos
            intentos = user.intentos + 1
            estado = 0 if intentos >= 3 else 1
            sql_update = text("UPDATE usuario SET intentos=:intentos, estado=:estado WHERE idusuario=:idusuario")
            db.session.execute(sql_update, {"intentos": intentos, "estado": estado, "idusuario": user.idusuario})
            db.session.commit()
            
            if estado == 0:
                flash("Usuario bloqueado por demasiados intentos fallidos. Restablezca la contraseña", "error")
               
#            smsservice.BloqueoCuenta(telefono)
            else:
                flash("Usuario o password incorrecto inténtelo de nuevo")
               
            
            return redirect(url_for("auth.login"))

        # si la contrasena es correcta  resetea intentos
        sql_reset = text("UPDATE usuario SET intentos=0 WHERE idusuario=:idusuario")
        db.session.execute(sql_reset, {"idusuario": user.idusuario})
        db.session.commit()

        #  limpia la sesion previa
        session.clear()

        
        sql_func = text("SELECT * FROM loginUsuario(:usuario)")
        result_func = db.session.execute(sql_func, {"usuario": usuario})
        user_data = result_func.fetchone()

        if not user_data:
            flash("Error al cargar datos del usuario", "error")
            return redirect(url_for("auth.login"))

        # Guardar datos en sesión
        session["idusuario"] = user_data.idusuario
        session["usuario"] = usuario
        session["rol"] = user_data.tipo
        session["nombre"] = user_data.nombre
        session["apellido1"] = user_data.apellido1
        session["correo"] = user_data.consultante_correo
       
        
     
        
        return redirect(url_for("routes.dashboard"))
    
    return render_template("login.html")
@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("auth.login"))