from app.extensions import db
from sqlalchemy import Column, Integer, String


class Usuario(db.Model):
    __tablename__ = "usuario"

    idusuario = Column(Integer, primary_key=True)
    correo = Column(String, nullable=False, unique=True)
    contrasena_hash = Column(String, nullable=False)
    estado = Column(Integer, default=1)
    local = Column(Integer)
    intentos = Column(Integer, default=0)
