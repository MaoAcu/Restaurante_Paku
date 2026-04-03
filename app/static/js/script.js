const SUBMENU_MAP = {
    "para-comenzar": [
        { id: "Para_Compartir", name: "PARA COMPARTIR", img: "Surtido.jpg" },
        { id: "Nachos_y_Cargados", name: "NACHOS Y CARGADOS", img: "Papa_Nacho.jpg" },
        { id: "Crujientes_y_Camarones", name: "CRUJIENTES Y CAMARONES", img: "Cocteles.jpg" },
        { id: "Antojitos_y_Sopas", name: "ANTOJITOS Y SOPAS", img: "Pinto1.jpg" }
    ],
    "plato-fuerte": [
        { id: "Casados_y_Ensaladas", name: "CASADOS Y ENSALADAS", img: "Pinto1.jpg" },
        { id: "Arroces_y_Pastas", name: "ARROCES Y PASTAS", img: "Arroz_Pollo.jpg" },
        { id: "Carnes_y_Pollo", name: "CARNES Y POLLO", img: "Bistec.jpg" },
        { id: "Mariscos", name: "MARISCOS", img: "Corvina.jpg" },
        { id: "Hamburguesas_y_Sandwiches", name: "HAMBURGUESAS Y SANDWICHES", img: "Hamburguesa.jpg" },
        { id: "Menu_Infantil", name: "MENÚ INFANTIL", img: "Pinto1.jpg" }
    ],
    "bebidas-licor": [
        { id: "Bebidas_Naturales", name: "BEBIDAS NATURALES", img: "Naturales.jpg" },
        { id: "Bebidas_Calientes", name: "BEBIDAS CALIENTES", img: "Cafe.jpg" },
        { id: "Gaseosas_y_Sodas_Italianas", name: "GASEOSAS Y SODAS", img: "Gaseosa.jpg" },
        { id: "Cocteles", name: "COCTELES", img: "Cocteles.jpg" },
        { id: "Cervezas", name: "CERVEZAS", img: "Bulldog_Maracuya.jpg" },
        { id: "Shots", name: "SHOTS", img: "Cocteles.jpg" }
    ]
};

const SUB_HEADERS_MAP = {
    // Entradas
    "Para_Compartir": "Para Compartir",
    "Nachos_y_Cargados": "Nachos y Cargados",
    "Crujientes_y_Camarones": "Crujientes y Camarones",
    "Antojitos_y_Sopas": "Antojitos y Sopas",

    // Platos Fuertes
    "Casados_y_Ensaladas": "Casados y Ensaladas",
    "Arroces_y_Pastas": "Arroces y Pastas",
    "Carnes_y_Pollo": "Carnes y Pollo",
    "Mariscos": "Mariscos",
    "Hamburguesas_y_Sandwiches": "Hamburguesas y Sándwiches",
    "Menu_Infantil": "Menú Infantil",

    // Bebidas
    "Bebidas_Naturales": "Bebidas Naturales",
    "Bebidas_Calientes": "Bebidas Calientes",
    "Gaseosas_y_Sodas_Italianas": "Sodas Italianas",
    "Cocteles": "Cócteles",
    "Cervezas": "Cervezas",
    "Shots": "Shots Especiales"
};

let currentSubCategoryId = null;
function openSubMenu(categoryId) {
    navigateTo(categoryId); 
    // CAMBIO DE TÍTULO DINÁMICO 
    const targetView = document.getElementById(`${categoryId}-view`);
    const headerTitle = targetView ? targetView.querySelector('.page-title') : null;
    
    if (headerTitle) {
        const mainHeaderMap = {
            'para-comenzar': 'Entradas',
            'plato-fuerte': 'Platos Fuertes',
            'bebidas-licor': 'Bebidas'
        };
        headerTitle.innerText = mainHeaderMap[categoryId] || categoryId.replace(/_/g, ' '); 
    }

    const subContainer = document.getElementById(`${categoryId}-subcategories`);
    const productsList = document.getElementById(`${categoryId}-products`);

    if (!subContainer) return;

    subContainer.innerHTML = "";
    subContainer.style.display = "flex";
    if (productsList) productsList.style.display = "none";
    
    currentSubCategoryId = null; 

    const sections = SUBMENU_MAP[categoryId];
    if (!sections) return;

    sections.forEach(section => {
        const card = document.createElement("div");
        card.className = "category-card";
        card.onclick = () => filterRealProducts(categoryId, section.id);

        card.innerHTML = `
            <div class="category-text"><h2>${section.name}</h2></div>
            <div class="category-image">
                <img src="${STATIC_MENU_URL}${section.img}" onerror="this.src='${URL_PINTO1}'">
            </div>
        `;
        subContainer.appendChild(card);
    });
}

function filterRealProducts(categoryId, subId) {
    const subContainer = document.getElementById(`${categoryId}-subcategories`);
    const productsContainerId = (categoryId === 'para-comenzar') ? 'entradas-products' : `${categoryId}-products`;
    const productsList = document.getElementById(productsContainerId);
    const targetView = document.getElementById(`${categoryId}-view`);
    const headerTitle = targetView ? targetView.querySelector('.page-title') : null;

    if (!subContainer || !productsList) {
        console.error("No se encontró el contenedor para:", categoryId);
        return;
    }

    currentSubCategoryId = subId; 

    subContainer.style.display = "none";
    productsList.style.display = "grid";

    // CAMBIO DE TÍTULO DINÁMICO 
    if (headerTitle) {
        headerTitle.innerText = SUB_HEADERS_MAP[subId] || subId.replace(/_/g, ' '); 
    }
    // Filtrar items
    const items = productsList.querySelectorAll(".product-card");
    let encontrados = 0;

    items.forEach(item => {
        if (item.dataset.subcategoria === subId) {
            item.style.display = "flex";
            encontrados++;
        } else {
            item.style.display = "none";
        }
    });

    if(encontrados === 0) {
        console.warn("No hay productos para la subcategoría:", subId);
    }
    
    window.scrollTo(0, 0);
}

// Contenedor global de productos
let products = {};
const subcategory={
  nachosycargados:1,
  crujientes:2,
  antojitos:3,
  casados:4,
  arroces:5,
  carnes:6,
  mariscos:7
}
// Función principal para cargar productos desde la DB
async function loadMenu() {
  try {
    const response = await fetch("/menu/GetMenu", { credentials: "include" });
    console.log(response)
    if (!response.ok) throw new Error("Error al cargar productos");

    const menuItems = await response.json();
    
    // Filtrar solo productos activos (manejando string o número)
    const activeMenuItems = menuItems.filter(item => {
      // Convertir a número si es necesario
      const estadoNum = Number(item.estado);
      return estadoNum === 1;
    });
    
    console.log(`Total productos: ${menuItems.length}, Activos: ${activeMenuItems.length}`);

    // Si no hay productos activos, mostrar mensaje o continuar
    if (activeMenuItems.length === 0) {
      console.warn("No se encontraron productos con estado = 1");
      // Puedes mostrar un mensaje en el HTML si lo deseas
    }

    // Mapear categorías → contenedores HTML
    const categoryMap = {
      "bebidas-licor": document.getElementById("bebidas-licor-products"),
      "bebidas-sin": document.getElementById("bebidas-sin-products"),
      entradas: document.getElementById("entradas-products"),
      hamburguesas: document.getElementById("hamburguesas-products"),
      ensaladas: document.getElementById("ensaladas-products"),
      ninos: document.getElementById("ninos-products"),
      postres: document.getElementById("postres-products"),
      desayunos: document.getElementById("desayunos-tipicos-products"),
      promos: document.getElementById("promos-products"),
      "plato-fuerte": document.getElementById("plato-fuerte"),
    };

    // Limpiar contenedores
    Object.values(categoryMap).forEach(c => c && (c.innerHTML = ""));

    activeMenuItems.forEach(item => {
      // Guardar producto global
      products[item.idmenu] = {
        id: item.idmenu,
        name: item.nombre,
        price: `₡${Number(item.precio).toLocaleString("es-CR")}`,
        description: item.descripcion || "",
        images: item.imagen ? [item.imagen] : ["/images/no-image.png"],
        category: item.categoria,
        status: item.estado
      };

      // Crear card dinámica
      const card = document.createElement("div");
      card.className = "product-card";
      card.dataset.productId = item.idmenu;
      card.dataset.category = item.categoria;
      card.dataset.subcategoria = item.subcategoria;

      card.innerHTML = `
        <img src="${STATIC_MENU_URL}${item.imagen || '/images/no-image.png'}" alt="${item.nombre}">
        <div class="product-info">
          <h3>${item.nombre}</h3> 
          <p>${item.descripcion}</p>
          <div class="product-footer">
            <span class="price">₡${item.precio}+10% de servicio</span>
            <button class="show-btn" onclick="event.stopPropagation(); showProductDetail('${item.idmenu}')">Ver Detalle</button>
          </div>
        </div>
      `;

      // Insertar card en el contenedor correcto
      const container = categoryMap[item.categoria.toLowerCase()];
      if (container) container.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando menú:", err);
  }
}
// Llamar a loadMenu cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
  loadMenu();
});


// Navigation system
const navigationHistory = ["menu"]

function navigateTo(viewId) {
  
  // Hide all views
  const views = document.querySelectorAll(".view")
  views.forEach((view) => view.classList.remove("active"))

  // Show target view
  const targetView = document.getElementById(`${viewId}-view`)
  if (targetView) {
    targetView.classList.add("active")

    // Add to history if not going back
    if (navigationHistory[navigationHistory.length - 1] !== viewId) {
      navigationHistory.push(viewId)
    }

    // Scroll to top
    window.scrollTo(0, 0)

    // Update active nav item
    updateNavigation(viewId)
  } else {
    console.log("[v0] View not found:", viewId)
  }
}

function goBack() {
    const currentView = document.querySelector('.view.active');
    if (!currentView) return;

    const categoryId = currentView.id.replace('-view', '');
    const subContainer = document.getElementById(`${categoryId}-subcategories`);
    const productsList = document.getElementById(
        (categoryId === 'para-comenzar') ? 'entradas-products' : `${categoryId}-products`
    );

    if (productsList && productsList.style.display === "grid") {
        productsList.style.display = "none";
        subContainer.style.display = "grid";
        const headerTitle = currentView.querySelector('.page-title');
        if (headerTitle) {
            const mainHeaderMap = {
                'para-comenzar': 'Entradas',
                'plato-fuerte': 'Platos Fuertes',
                'bebidas-licor': 'Bebidas'
            };
            headerTitle.innerText = mainHeaderMap[categoryId] || "Menú";
        }
        
        window.scrollTo(0, 0);
    } else {
        navigateTo('menu');
    }
}

function updateNavigation(currentView) {
  const allNavItems = document.querySelectorAll(".nav-item")
  allNavItems.forEach((item) => item.classList.remove("active"))

  // Set active based on view
  const navMapping = {
    splash: 0,
    menu: 1,
    bebidas: 1,
    "para-comenzar": 1,
    hamburguesas: 1,
    ensaladas: 1,
    "menu-ninos": 1,
    postres: 1,
    "desayunos": 1,
    search: 2,
    "plato-fuerte": 1,
    contact: 3,
  }

  const activeIndex = navMapping[currentView]
  if (activeIndex !== undefined) {
    document.querySelectorAll(".bottom-nav").forEach((nav) => {
      const items = nav.querySelectorAll(".nav-item")
      if (items[activeIndex]) {
        items[activeIndex].classList.add("active")
      }
    })
  }
}

// Product Modal Functions
function showProductDetail(productId) {
  const product = products[productId]
  if (!product) {
    console.warn("Producto no encontrado:", productId)
    return
  }

  currentProduct = product
  currentImageIndex = 0

  const modal = document.getElementById("product-modal")
  const modalImage = document.getElementById("modal-image")
  const modalTitle = document.getElementById("modal-title")
  const modalPrice = document.getElementById("modal-price")
  const modalDescription = document.getElementById("modal-description")
  const modalOptions = document.getElementById("modal-options")

  /* ===== Contenido principal ===== */
  modalImage.src = `${STATIC_MENU_URL}${product.images?.[0]}` || "/static/img/no-image.png"
  modalTitle.textContent = product.name
  modalPrice.textContent = product.price
  modalDescription.textContent = product.description || ""

  /* ===== Galeria ===== */
  if (typeof updateGalleryNav === "function") {
    updateGalleryNav()
  }

  /* ===== Opciones===== */
  modalOptions.innerHTML = ""

  if (product.options && typeof product.options === "object") {
    let optionsHTML = ""

    if (product.options.breadType && Array.isArray(product.options.breadOptions)) {
      optionsHTML += `
        <div class="modal-option">
          <h4>${product.options.breadType}</h4>
          <p>${product.options.breadOptions.join(", ")}</p>
        </div>
      `
    }

    modalOptions.innerHTML = optionsHTML
  }

  /* ===== Mostrar modal ===== */
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}


function closeProductModal() {
  const modal = document.getElementById("product-modal")
  modal.classList.remove("active")
  document.body.style.overflow = ""
  currentProduct = null
  currentImageIndex = 0
}

function previousImage() {
  if (!currentProduct || currentProduct.images.length <= 1) return

  currentImageIndex--
  if (currentImageIndex < 0) {
    currentImageIndex = currentProduct.images.length - 1
  }

  const modalImage = document.getElementById("modal-image")
  modalImage.src = currentProduct.images[currentImageIndex]
  updateGalleryNav()
}

function nextImage() {
  if (!currentProduct || currentProduct.images.length <= 1) return

  currentImageIndex++
  if (currentImageIndex >= currentProduct.images.length) {
    currentImageIndex = 0
  }

  const modalImage = document.getElementById("modal-image")
  modalImage.src = currentProduct.images[currentImageIndex]
  updateGalleryNav()
}

function updateGalleryNav() {
  const prevBtn = document.querySelector(".gallery-prev")
  const nextBtn = document.querySelector(".gallery-next")

  if (!currentProduct || currentProduct.images.length <= 1) {
    prevBtn.classList.add("hidden")
    nextBtn.classList.add("hidden")
  } else {
    prevBtn.classList.remove("hidden")
    nextBtn.classList.remove("hidden")
  }
}

// Filter functionality
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.category;
      const view = tab.closest(".view");
      const products = view.querySelectorAll(".product-card");

      // Activar tab
      tab.parentElement.querySelectorAll(".filter-tab")
        .forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      products.forEach(card => {
        const subcategoria = card.dataset.subcategoria;

        const show =
          filter === "all" ||
          subcategoria === filter;

        card.style.display = show ? "flex" : "none";
      });
    });
  });
});

// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input")
  const searchPlaceholder = document.getElementById("search-placeholder")
  const searchResults = document.getElementById("search-results")

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim()

      if (query.length === 0) {
        searchPlaceholder.classList.remove("hidden")
        searchResults.classList.remove("active")
        searchResults.innerHTML = ""
        return
      }

      searchPlaceholder.classList.add("hidden")

      // Search in products
      const results = []
      for (const [id, product] of Object.entries(products)) {
        if (product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)) {
          results.push({ id, ...product })
        }
      }

      if (results.length > 0) {
        let resultsHTML = '<div class="products-list">'
        results.forEach((product) => {
          resultsHTML += `
            <div class="product-card" onclick="showProductDetail('${product.id}')">
              <img src="${STATIC_MENU_URL}${product.images[0]}" alt="${product.name}">
              <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                  <span class="price">${product.price}</span>
                  <button class="show-btn" onclick="event.stopPropagation(); showProductDetail('${product.id}')">Ver</button>
                </div>
              </div>
            </div>
          `
        })
        resultsHTML += "</div>"
        searchResults.innerHTML = resultsHTML
      } else {
        searchResults.innerHTML =
          '<p style="text-align: center; color: #999; padding: 2rem;">No se encontraron resultados</p>'
      }

      searchResults.classList.add("active")
    })
  }
})

// Handle browser back button
window.addEventListener("popstate", () => {
  if (navigationHistory.length > 1) {
    navigationHistory.pop()
    const currentView = navigationHistory[navigationHistory.length - 1]
    navigateTo(currentView)
    navigationHistory.pop() // Remove duplicate
  }
})

// Touch gestures for mobile
let touchStartX = 0
let touchEndX = 0

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  // Swipe right to go back
  if (touchEndX - touchStartX > 100) {
    goBack()
  }
}

// Keyboard navigation for modal
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("product-modal")
  if (modal && modal.classList.contains("active")) {
    if (e.key === "Escape") {
      closeProductModal()
    } else if (e.key === "ArrowLeft") {
      previousImage()
    } else if (e.key === "ArrowRight") {
      nextImage()
    }
  }
})

let currentLang = 'es'; 

function toggleLanguage() {
    const flagImg = document.getElementById('lang-flag');
    const langText = document.getElementById('lang-text');
    
    if (currentLang === 'es') {
        // Cambiar a Inglés
        currentLang = 'en';
        flagImg.src = "https://flagcdn.com/w80/us.png"; // Bandera USA
        langText.innerText = "EN";
        console.log("Cambiando interfaz a Inglés...");
        // llamar traductor a inglés
    } else {
        // Cambiar a Español
        currentLang = 'es';
        flagImg.src = "https://flagcdn.com/w80/cr.png"; // Bandera Costa Rica
        langText.innerText = "ES";
        console.log("Cambiando interfaz a Español...");
        // llamar traductor a español
    }
}