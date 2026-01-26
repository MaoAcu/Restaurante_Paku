from functools import wraps
from flask import session, redirect, url_for, flash , request
from flask import make_response

#este metodo se usa para que si no se ha incioado sesion no se pueda navegar por las paginas 
def loginRequired(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "idusuario" not in session:
            flash("Debes iniciar sesión primero.", "warning")
            return redirect(url_for("auth.login"))
        return f(*args, **kwargs)
    return decorated_function

def localRequired(*locales_permitidos):
    def decorador(func):
        @wraps(func)
        def wrapper(*args, **kwargs):

            local_usuario = session.get("local")

            if local_usuario is None:
                flash("Debe iniciar sesión primero.", "warning")
                return redirect(url_for("auth.login"))

            if local_usuario not in locales_permitidos:
                flash("No está autorizado para ingresar a esta vista.", "warning")
                return redirect(url_for("routes.index"))

            return func(*args, **kwargs)
        return wrapper
    return decorador

def codigoRequired(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if session.get("Access") != 1:
            flash("Debe verificar el código de seguridad.", "warning")
            return redirect(url_for("routes.Codigo"))
        return func(*args, **kwargs)
    return wrapper
def noCache(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        response = make_response(func(*args, **kwargs))
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        flash("Accion no permitida.", "warning")
        return response
    return wrapper