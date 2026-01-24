from functools import wraps
from flask import session, redirect, url_for, flash , request


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
