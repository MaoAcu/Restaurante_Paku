document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    // Credenciales de demostración
    const demoCredentials = {
        username: 'admin',
        password: 'admin123'
    };
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Validación simple
        if (!username || !password) {
            showError('Por favor, completa todos los campos');
            return;
        }
        
        // Simular validación de credenciales
        if (username === demoCredentials.username && password === demoCredentials.password) {
            // Simular redirección exitosa
            loginForm.innerHTML = `
                <div style="text-align: center; padding: 20px 0;">
                    <i class="fas fa-spinner fa-spin fa-2x" style="color: #667eea;"></i>
                    <p style="margin-top: 15px;">Iniciando sesión...</p>
                </div>
            `;
            
            // Redirigir al dashboard después de un breve retraso
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showError('Credenciales incorrectas. Usa: admin / admin123');
        }
    });
    
    function showError(message) {
        loginError.textContent = message;
        loginError.style.display = 'block';
        
        // Agitar el formulario para indicar error
        loginForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
        
        setTimeout(() => {
            loginError.style.display = 'none';
        }, 5000);
    }
    
    // Añadir animación de shake
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Auto-completar credenciales para facilitar las pruebas
    document.getElementById('username').value = 'admin';
    document.getElementById('password').value = 'admin123';
});