import smtplib
import os
import threading
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_server = None
        self.smtp_port = None
        self.sender_email = None 
        self.password = None
        self.sender_name = None

    def init_app(self, app):
        """Inicializa el servicio con variables de entorno"""
        self.smtp_server = os.getenv("SMTP_SERVER")
        self.smtp_port = int(os.getenv("SMTP_PORT", 587)) 
        self.sender_email = os.getenv("SMTP_USER")
        self.password = os.getenv("SMTP_PASSWORD")
        self.sender_name = os.getenv("SMTP_NAME", "Notificaciones OASIS")
        
        if not all([self.smtp_server, self.sender_email, self.password]):
            logger.error("  Faltan credenciales SMTP en variables de entorno")
        else:
            logger.info(f"  EmailService iniciado - Enviando como {self.sender_name}")

    def _send_smtp(self, to_email, subject, html_content, text_content=None):
        try:
            msg = MIMEMultipart('alternative')
            msg["From"] = f"{self.sender_name} <no-reply@logiclookcr.com>"
            msg["To"] = to_email
            msg["Subject"] = subject
            msg["Reply-To"] = "no-reply@logiclookcr.com"

            if text_content:
                msg.attach(MIMEText(text_content, 'plain', 'utf-8'))
            msg.attach(MIMEText(html_content, 'html', 'utf-8'))

            server = smtplib.SMTP(self.smtp_server, self.smtp_port, timeout=10)
            server.starttls()
            server.login(self.sender_email, self.password)
            server.sendmail(
               "no-reply@logiclookcr.com",
                to_email,
                msg.as_string()
            )
            server.quit()

            logger.info(f"Correo enviado correctamente a {to_email}")
            return True

        except Exception as e:
            logger.error(f"Error SMTP Brevo: {e}")
            return False
    def SendVerificationCode(self, email, code):
        try:
            username="Emilio"
            subject = "Tu código de verificación - Paku"
            html = f"""
                <!DOCTYPE html>
                <html lang="es">
                <head>
                   <meta charset="UTF-8">
                   <meta name="viewport" content="width=device-width, initial-scale=1.0">
                   <title>Código de Verificación - Paku</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9;">
                    <table role="presentation" style="max-width: 600px; width: 100%; margin: 0 auto; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 20px 10px;">
                            <table role="presentation" style="width: 100%; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #eeeeee;">
                            
                                <tr>
                                    <td style="background: linear-gradient(135deg, #B62021 0%, #E6871B 100%); padding: 40px 30px; text-align: center;">
                                        <div style=" width: 70px; height: 70px; background: url('https://logic-look.onrender.com/static/img/0.png') no-repeat center; background-size: cover;
                                            border-radius: 50%;
                                            margin: 0 auto 15px;
                                            border: 3px solid #ffffff;
                                        "></div>
                                        <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: 1px;">
                                        Verificación de Cuenta
                                        </h1>
                                    </td>
                                </tr>
                            
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <p style="margin: 0 0 15px; color: #2d3436; font-size: 18px; font-weight: 600;">
                                           Hola, {username}
                                        </p>
                                        <p style="margin: 0 0 30px; color: #636e72; font-size: 16px; line-height: 1.6;">
                                            Estás intentando acceder al panel de <strong>Paku</strong>. Para continuar, utiliza el siguiente código de seguridad:
                                        </p>
                                    
                                        <table role="presentation" style="width: 100%; margin: 0 0 30px;">
                                            <tr>
                                                <td style="text-align: center; padding: 30px; background-color: #fdf2f2; border-radius: 15px; border: 2px dashed #B62021;">
                                                    <p style="margin: 0 0 10px; color: #B62021; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 800;">
                                                        Código Temporal
                                                    </p>
                                                    <p style="margin: 0; color: #2d3436; font-size: 48px; font-weight: 800; letter-spacing: 10px; font-family: 'Courier New', monospace;">
                                                        {code}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    
                                    
                                        <p style="margin: 0; color: #b2bec3; font-size: 13px; line-height: 1.6; text-align: center;">
                                            Si no solicitaste este código, puedes ignorar este mensaje o contactar a administración por seguridad.
                                        </p>
                                    </td>
                                </tr>
                            
                                <tr>
                                    <td style="background-color: #fafafa; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
                                        <p style="margin: 0 0 5px; color: #B62021; font-size: 18px; font-weight: 700;">
                                           Logic Look
                                        </p>
                                        <p style="margin: 0; color: #999999; font-size: 12px;">
                                            © 2026 Logic Look. Todos los derechos reservados.<br>
                                            Gestión Administrativa Interna.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            """
            text = f"""
        PAKU- Verificación de Acceso
        
        Hola {username},
        
        Tu código de seguridad es: {code} 
        
        Si no solicitaste este código, por favor ignora este correo.
        
        ✦ PAKU · Restaurante & Bar ✦
        """

            return self._send_smtp(email, subject, html,text)
        except Exception as e:
             print(f"Error enviando código 2FA: {e}")
    