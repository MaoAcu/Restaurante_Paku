class RestaurantDashboard {
    constructor() {
        this.currentUser = { name: 'Administrador', role: 'Dueño' };
        this.currentSection = 'menu';
        this.isSidebarOpen = false;
        
        // Datos de ejemplo estáticos
        this.items = {
            menu: [
                {
                    id: 1,
                    name: 'Hamburguesa Especial',
                    description: 'Carne 200g, queso cheddar, tomate, lechuga, cebolla y salsa especial de la casa. Acompañada de papas fritas.',
                    price: 5500,
                    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    status: 'active',
                    category: 'menu'
                },
                {
                    id: 2,
                    name: 'Pizza Margarita',
                    description: 'Masa artesanal, salsa de tomate natural, mozzarella fresca y albahaca. Horneada en horno de leña.',
                    price: 5500,
                    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    status: 'active',
                    category: 'menu'
                },
                {
                    id: 3,
                    name: 'Ensalada César',
                    description: 'Lechuga romana, pollo a la parrilla, crutones, queso parmesano y aderezo césar casero.',
                    price: 5500,
                    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    status: 'active',
                    category: 'menu'
                }
            ],
            promos: [
                {
                    id: 101,
                    name: 'Martes de Hamburguesas',
                    description: '¡2x1 en todas nuestras hamburguesas! Todos los martes de 12:00 a 22:00 hrs.',
                    price: 5500,
                    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    status: 'active',
                    category: 'promos',
                    days: ['martes']
                },
                {
                    id: 102,
                    name: 'Jueves de Tacos',
                    description: 'Tacos al pastor a mitad de precio todos los jueves. ¡No te lo pierdas!',
                    price: 5500,
                    image: 'https://images.unsplash.com/photo-1613514785940-ea1a6b2e673c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    status: 'active',
                    category: 'promos',
                    days: ['jueves']
                }
            ],
            bebidas: [
                {
                    id: 201,
                    name: 'Limonada Natural',
                    description: 'Limonada fresca con hierbabuena y un toque de jengibre.',
                    price: 5500,
                    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    status: 'active',
                    category: 'bebidas'
                },
                {
                    id: 202,
                    name: 'Cerveza Artesanal',
                    description: 'Nuestra cerveza IPA especial con notas cítricas.',
                    price: 5500,
                    image: 'https://images.unsplash.com/photo-1618885472181-5d1f4b2b6b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    status: 'active',
                    category: 'bebidas'
                }
            ],
            postres: [
                {
                    id: 301,
                    name: 'Cheesecake de Fresa',
                    description: 'Delicioso cheesecake con base de galleta y coulis de fresa natural.',
                    price: 5500,
                    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    status: 'active',
                    category: 'postres'
                },
                {
                    id: 302,
                    name: 'Flan de Vainilla',
                    description: 'Tradicional flan casero con caramelo y un toque de vainilla.',
                    price: 5500,
                    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    status: 'active',
                    category: 'postres'
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadSectionItems('menu');
        this.handleResize();
        this.updateUserInfo();
        
        // Cargar configuración inicial
        this.loadConfigData();
    }
    
    bindEvents() {
        // Menú hamburguesa
        document.getElementById('menuToggle').addEventListener('click', () => {
            this.toggleSidebar();
        });
        
        // Overlay para cerrar menú en móviles
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.toggleSidebar(false);
            });
        }
        
        // Navegación del sidebar
        document.querySelectorAll('.sidebar-nav li').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
                
                // En móviles, cerrar el menú después de seleccionar
                if (window.innerWidth <= 768) {
                    this.toggleSidebar(false);
                }
            });
        });
        
        // Guardar todo
        document.getElementById('saveAllBtn').addEventListener('click', () => {
            this.saveAll();
        });
        
        // Agregar items
        document.querySelectorAll('.btn-add-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.openEditModal(null, category);
            });
        });
        
        // Modal
        document.querySelectorAll('.close-modal, .btn-cancel').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });
        
        // Formulario de item
        document.getElementById('itemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveItem();
        });
        
        // Configuración
        document.getElementById('saveConfigBtn').addEventListener('click', () => {
            this.saveConfig();
        });
        
        // Upload modal
        document.getElementById('cancelUpload')?.addEventListener('click', () => {
            document.getElementById('uploadModal').style.display = 'none';
        });
        
        document.getElementById('confirmUpload')?.addEventListener('click', () => {
            this.confirmImageUpload();
        });
        
        // Subir imagen
        const dropArea = document.getElementById('dropArea');
        const fileInput = document.getElementById('fileUpload');
        
        if (dropArea && fileInput) {
            dropArea.addEventListener('click', () => fileInput.click());
            
            dropArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropArea.style.borderColor = '#667eea';
                dropArea.style.background = 'rgba(102, 126, 234, 0.05)';
            });
            
            dropArea.addEventListener('dragleave', () => {
                dropArea.style.borderColor = '';
                dropArea.style.background = '';
            });
            
            dropArea.addEventListener('drop', (e) => {
                e.preventDefault();
                dropArea.style.borderColor = '';
                dropArea.style.background = '';
                
                if (e.dataTransfer.files.length) {
                    this.handleFileUpload(e.dataTransfer.files[0]);
                }
            });
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) {
                    this.handleFileUpload(e.target.files[0]);
                }
            });
        }
        
        // Botón de subir imagen
        document.getElementById('imageUpload')?.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Toggle de estado
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const status = e.target.dataset.status;
                this.setStatus(status);
            });
        });
        
        // Logout (simulado)
        document.getElementById('logoutBtn').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                window.location.href = 'index.html';
            }
        });
        
        // Manejar redimensionamiento de ventana
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Cerrar modal al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
                document.getElementById('uploadModal').style.display = 'none';
            }
        });
    }
    
    toggleSidebar(forceState) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (typeof forceState !== 'undefined') {
            this.isSidebarOpen = forceState;
        } else {
            this.isSidebarOpen = !this.isSidebarOpen;
        }
        
        if (sidebar) {
            if (this.isSidebarOpen) {
                sidebar.classList.add('active');
                if (overlay) overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    handleResize() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        
        // En pantallas grandes, asegurar que el sidebar esté visible
        if (window.innerWidth > 768) {
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            this.isSidebarOpen = false;
            document.body.style.overflow = '';
        }
    }
    
    switchSection(section) {
        this.currentSection = section;
        
        // Actualizar navegación
        document.querySelectorAll('.sidebar-nav li').forEach(li => {
            li.classList.remove('active');
            if (li.dataset.section === section) {
                li.classList.add('active');
            }
        });
        
        // Actualizar título
        const titles = {
            menu: 'Menú Principal',
            promos: 'Promociones Semanales',
            bebidas: 'Bebidas',
            postres: 'Postres',
            config: 'Configuración'
        };
        document.getElementById('sectionTitle').textContent = titles[section];
        
        // Mostrar sección correspondiente
        document.querySelectorAll('.content-section').forEach(div => {
            div.style.display = 'none';
        });
        
        const sectionElement = document.getElementById(`${section}Section`);
        if (sectionElement) {
            sectionElement.style.display = 'block';
        }
        
        // En móviles, hacer scroll al top
        if (window.innerWidth <= 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Cargar datos de la sección
        if (section !== 'config') {
            this.loadSectionItems(section);
        }
    }
    
    loadSectionItems(section) {
        const container = document.getElementById(`${section}Items`);
        if (!container) return;
        
        const items = this.items[section] || [];
        
        container.innerHTML = items.map(item => this.createItemCard(item, section)).join('');
        
        // Agregar eventos a los botones de editar/eliminar
        container.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.currentTarget.dataset.id);
                const item = items.find(i => i.id === itemId);
                if (item) {
                    this.openEditModal(item, section);
                }
            });
        });
        
        container.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.currentTarget.dataset.id);
                if (confirm('¿Estás seguro de eliminar este item?')) {
                    this.deleteItem(itemId, section);
                }
            });
        });
    }
    
    createItemCard(item, section) {
        const priceDisplay = item.price === 0 ? 'GRATIS' : `$${item.price.toFixed(2)}`;
        
        return `
            <div class="item-card">
                <div class="item-image">
                    <img src="${item.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'}" 
                         alt="${item.name}" 
                         onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'">
                </div>
                <div class="item-info">
                    <div class="item-header">
                        <h3 class="item-name">${item.name}</h3>
                        <span class="item-price">${priceDisplay}</span>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-status">
                        <span class="status-badge ${item.status}">
                            <i class="fas fa-${item.status === 'active' ? 'check' : 'pause'}"></i>
                            ${item.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                    <div class="item-actions">
                        <button class="btn-edit" data-id="${item.id}">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn-delete" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    openEditModal(item = null, category) {
        const modal = document.getElementById('editModal');
        const form = document.getElementById('itemForm');
        
        if (item) {
            // Modo edición
            document.getElementById('modalTitle').textContent = 'Editar Item';
            document.getElementById('itemId').value = item.id;
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemDescription').value = item.description || '';
            document.getElementById('itemPrice').value = item.price;
            document.getElementById('itemImage').value = item.image || '';
            document.getElementById('itemStatus').value = item.status || 'active';
            document.getElementById('itemCategory').value = category;
            
            // Actualizar toggle de estado
            this.setStatus(item.status || 'active');
        } else {
            // Modo nuevo
            document.getElementById('modalTitle').textContent = 'Agregar Nuevo Item';
            form.reset();
            document.getElementById('itemId').value = '';
            document.getElementById('itemCategory').value = category;
            document.getElementById('itemStatus').value = 'active';
            
            // Establecer valores por defecto según categoría
            const defaultImages = {
                menu: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                promos: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                bebidas: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                postres: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
            };
            
            document.getElementById('itemImage').value = defaultImages[category] || '';
            this.setStatus('active');
        }
        
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    }
    
    setStatus(status) {
        document.getElementById('itemStatus').value = status;
        
        // Actualizar botones de toggle
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.status === status) {
                btn.classList.add('active');
            }
        });
    }
    
    closeModal() {
        const modal = document.getElementById('editModal');
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
    
    saveItem() {
        const itemId = document.getElementById('itemId').value;
        const itemData = {
            id: itemId ? parseInt(itemId) : Date.now(),
            name: document.getElementById('itemName').value,
            description: document.getElementById('itemDescription').value,
            price: parseFloat(document.getElementById('itemPrice').value) || 0,
            image: document.getElementById('itemImage').value,
            status: document.getElementById('itemStatus').value,
            category: document.getElementById('itemCategory').value
        };
        
        const category = itemData.category;
        
        // Simular guardado
        console.log('Guardando item:', itemData);
        
        if (itemId) {
            // Actualizar item existente
            const index = this.items[category].findIndex(item => item.id == itemId);
            if (index !== -1) {
                this.items[category][index] = itemData;
            } else {
                this.items[category].push(itemData);
            }
        } else {
            // Nuevo item
            this.items[category].push(itemData);
        }
        
        // Mostrar mensaje de éxito
        this.showNotification('✅ Item guardado correctamente', 'success');
        
        this.closeModal();
        this.loadSectionItems(category);
    }
    
    deleteItem(itemId, category) {
        // Filtrar el array para eliminar el item
        this.items[category] = this.items[category].filter(item => item.id !== itemId);
        
        // Mostrar mensaje
        this.showNotification('🗑️ Item eliminado', 'info');
        
        // Recargar la sección
        this.loadSectionItems(category);
    }
    
    saveAll() {
        // Simular guardado en "base de datos"
        console.log('Guardando todos los cambios:', this.items);
        
        // Mostrar animación de guardado
        const saveBtn = document.getElementById('saveAllBtn');
        const originalText = saveBtn.innerHTML;
        
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
        saveBtn.disabled = true;
        
        setTimeout(() => {
            saveBtn.innerHTML = '<i class="fas fa-check"></i> ¡Guardado!';
            saveBtn.style.background = 'var(--success-dark)';
            
            setTimeout(() => {
                saveBtn.innerHTML = originalText;
                saveBtn.style.background = '';
                saveBtn.disabled = false;
            }, 2000);
            
            this.showNotification('✅ Todos los cambios han sido guardados', 'success');
        }, 1500);
    }
    
    saveConfig() {
        const restaurantName = document.getElementById('restaurantName').value;
        const restaurantDescription = document.getElementById('restaurantDescription').value;
        const restaurantHours = document.getElementById('restaurantHours').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (restaurantName) {
            // Actualizar nombre en el sidebar
            document.querySelector('.logo h2').innerHTML = `<i class="fas fa-utensils"></i> ${restaurantName}`;
        }
        
        if (restaurantDescription) {
            console.log('Descripción actualizada:', restaurantDescription);
        }
        
        if (restaurantHours) {
            console.log('Horario actualizado:', restaurantHours);
        }
        
        if (newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                console.log('Contraseña cambiada (simulado)');
            } else {
                this.showNotification('⚠️ Las contraseñas no coinciden', 'error');
                return;
            }
        }
        
        // Mostrar mensaje de éxito
        this.showNotification('⚙️ Configuración guardada correctamente', 'success');
    }
    
    loadConfigData() {
        // Establecer valores por defecto
        document.getElementById('restaurantName').value = 'Mi Restaurante';
        document.getElementById('restaurantDescription').value = 'Restaurante familiar con los mejores platos tradicionales';
        document.getElementById('restaurantHours').value = 'Lunes a Viernes: 9:00 - 22:00, Sábados: 10:00 - 23:00';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }
    
    handleFileUpload(file) {
        if (!file.type.match('image.*')) {
            this.showNotification('⚠️ Solo se permiten imágenes', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('imagePreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
            
            document.getElementById('confirmUpload').disabled = false;
        };
        reader.readAsDataURL(file);
    }
    
    confirmImageUpload() {
        const preview = document.getElementById('imagePreview');
        
        if (preview.src && preview.src !== '') {
            document.getElementById('itemImage').value = preview.src;
            document.getElementById('uploadModal').style.display = 'none';
            this.showNotification('📸 Imagen seleccionada correctamente', 'success');
        }
    }
    
    showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
        `;
        
        // Botón para cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            font-size: 1rem;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        document.body.appendChild(notification);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    updateUserInfo() {
        document.querySelector('.user-name').textContent = this.currentUser.name;
        document.querySelector('.user-role').textContent = this.currentUser.role;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Añadir estilos para animaciones de notificación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    const app = new RestaurantDashboard();
    
    // Para desarrollo: log inicial
    console.log('Dashboard de Restaurante cargado');
    console.log('Accede directamente a: dashboard.html');
});