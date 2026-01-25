// Contenedor global de productos
let products = {};

// Función principal para cargar productos desde la DB
async function loadMenu() {
  try {
    const response = await fetch(MENU_URL, { credentials: "include" });
    console.log(response)
    if (!response.ok) throw new Error("Error al cargar productos");

    const menuItems = await response.json();

    // Mapear categorías → contenedores HTML
    const categoryMap = {
      bebidas: document.getElementById("bebidas-products"),
      entradas: document.getElementById("entradas-products"),
      hamburguesas: document.getElementById("hamburguesas-products"),
      ensaladas: document.getElementById("ensaladas-products"),
      ninos: document.getElementById("ninos-products"),
      postres: document.getElementById("postres-products"),
      desayunos: document.getElementById("desayunos-products"),
      promos: document.getElementById("promos-products"),
    };

    // Limpiar contenedores
    Object.values(categoryMap).forEach(c => c && (c.innerHTML = ""));

    menuItems.forEach(item => {
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

      card.innerHTML = `
        <img src="${item.imagen || '/images/no-image.png'}" alt="${item.nombre}">
        <div class="product-info">
          <h3>${item.nombre}</h3>
          <p>${item.descripcion || ""}</p>
          <div class="product-footer">
            <span class="price">₡${item.precio}</span>
            <button class="show-btn" onclick="event.stopPropagation(); showProductDetail('${item.idmenu}')">Ver</button>
          </div>
        </div>
      `;

      // Insertar card en el contenedor correcto
      const container = categoryMap[item.categoria];
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
  if (navigationHistory.length > 1) {
    navigationHistory.pop()
    const previousView = navigationHistory[navigationHistory.length - 1]
    navigateTo(previousView)
    navigationHistory.pop() // Remove duplicate
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
    "mi-creacion": 1,
    search: 2,
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
  modalImage.src = product.images?.[0] || "/static/img/no-image.png"
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
  const filterTabs = document.querySelectorAll(".filter-tab")

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.category
      const parentContainer = tab.closest(".main-content")
      const productsList = parentContainer.querySelector(".products-list")
      const products = productsList.querySelectorAll(".product-card")

      // Update active tab
      tab.parentElement.querySelectorAll(".filter-tab").forEach((t) => {
        t.classList.remove("active")
      })
      tab.classList.add("active")

      // Filter products
      products.forEach((product) => {
        const productCategory = product.dataset.category

        if (category === "all" || productCategory === category) {
          product.style.display = "flex"
        } else {
          product.style.display = "none"
        }
      })
    })
  })
})

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
              <img src="${product.images[0]}" alt="${product.name}">
              <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                  <span class="price">${product.price}</span>
                  <button class="show-btn" onclick="event.stopPropagation(); showProductDetail('${product.id}')">SHOW</button>
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

