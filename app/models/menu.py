from app.extensions import db
from sqlalchemy import Column, Integer, String, Numeric, Text, ForeignKey, Boolean

class Menu(db.Model):
    __tablename__ = "menu"
    
    idmenu = Column(Integer, primary_key=True)
    local = Column(Integer, ForeignKey("locales.idlocal", ondelete="CASCADE"), nullable=False)
    nombre = Column(String(150), nullable=False)
    descripcion = Column(Text)
    precio = Column(Numeric(10, 2), nullable=False)
    imagen = Column(String(255))
    categoria = Column(String(100), nullable=False)
    estado = Column(Integer, default=1)   
    subcategoria = Column(String(50), default='')
    destacado = Column(Boolean, default=False)