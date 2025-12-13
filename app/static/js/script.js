// Product database
const products = {
  ImperialLight: {
    name: "Imperial Light",
    price: "₡1500",
    description:
      " Refrescante cerveza ligera, con un sabor equilibrado y diferente. Una cerveza Ligth es buena cualquier momento del día.",
    images: ["https://info.megasuper.com/ecommerce/764009000651_1.jpeg"],
  },
  ImperialSilver: {
    name: "Imperial Silver",
    price: "₡1500",
    description:
      " La imperial ofrece un sabor suave y equilibrado, perfecta para disfrutar en cualquier ocasión.",
    images: ["https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800"],
  },
  heineken: {
    name: "Heineken",
    price: "₡1500",
    description:
      " La imperial ofrece un sabor suave y equilibrado, perfecta para disfrutar en cualquier ocasión.",
    images: ["https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800"],
  },
  Imperial: {
    name: "Imperial",
    price: "₡1500",
    description:
      "Con más de 150 de historia, Heineken es reconocida por sus ingredientes puros y naturales. Una cerveza premium con un sabor único y balanceado.",
    images: ["https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800"],
  },
  corona: {
    name: "Corona",
    price: "₡2000",
    description:
      "Cerveza mexicana refrescante con un sabor suave y equilibrado, perfecta con limón. Ideal para disfrutar en cualquier momento.",
    images: ["https://walmartcr.vtexassets.com/arquivos/ids/1020886/cerveza-corona-extra-botella-355-ml-7503034941200.jpg?v=638985672026930000"],
  },
  bavariaGold: {
    name: "Bavaria Gold",
    price: "₡2500",
    description: "Es una bebida milenaria, natural y refrescante, con un incomparable sabor y aroma, producida a partir de malta, agua, levadura y lúpulo y adjuntos.",
    images: ["https://walmartcr.vtexassets.com/arquivos/ids/921562-800-450?v=638826759337670000&width=800&height=450&aspect=true"],
  },
  imperial: {
    name: "Imperial-Regular",
    price: "₡1500",
    description: "Cerveza costarricense, la número uno del país con su sabor único y refrescante.",
    images: ["https://walmartcr.vtexassets.com/arquivos/ids/901171/14486_01.jpg?v=638796933315530000"],
  },
   bulldog: {
    name: "Margarita Bulldog",
    price: "Desde los ₡4500",
    description: "Refescante y deliciosa bebida a base de cerveza (a su eleccion) con tequila y maracuya",
    images: [URL_BULLDOG],
  },
  pilsen: {
    name: "Pilsen",
    price: "₡1500",
    description: "Cerveza tradicional costarricense con cuerpo ligero y sabor suave.",
    images: ["https://howlermag.com/wp-content/uploads/2024/01/Untitled-design-2024-01-08T091121.775.jpg"],
  },
  alitas: {
    name: "Alitas",
    price: "5500",
    description: "6 unidades denustras deliciosas alitas de pollo, acompañadas o bañadas en la salsa de su eleccion",
    images: ["https://images.getrecipekit.com/20220914180525-alas-20de-20pollo-20fritas.png?width=650&quality=90&"],
  },
  "chicken-fingers": {
    name: "Chicken Fingers",
    price: "₡5000",
    description: "4 unidades de deditos de pollo empanizados, con deliciosas papas fritas",
    images: ["https://img.freepik.com/fotos-premium/tiras-pollo-empanizadas-papas-fritas-salsa-mojar_665346-27557.jpg"],
  },
  "papas-fritas": {
    name: "Papas Fritas",
    price: "₡3000",
    description:
      "Deliciosas papa fritas acompañadas de salsa de tomate y mayonesa",
    images: ["https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800"],
  },
  "papas-romero": {
    name: "Papas con Romero y Parmesano",
    price: "₡5500",
    description: "Papas fritas servidas con romero fresco y queso parmesano",
    images: ["https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800"],
  },
 
  cesar: {
    name: "Ensalada César",
    price: "₡5500",
    description: "Lechuga romana, crutones, queso parmesano y aderezo césar",
    images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"],
  },
  "pollo-parrilla": {
    name: "Ensalada con Pollo a la Parrilla",
    price: "₡5500",
    description: "Mix de lechugas, tomates cherry, aguacate, pollo a la parrilla y vinagreta balsámica",
    images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"],
  },
  nuggets: {
    name: "Nuggets de Pollo",
    price: "₡5500",
    description: "6 nuggets de pollo con papas fritas y salsa",
    images: ["https://images.unsplash.com/photo-1562967914-608f82629710?w=800"],
  },
  "mini-burger-ninos": {
    name: "Mini Hamburguesa",
    price: "₡5500",
    description: "Mini hamburguesa con queso, lechuga y tomate, servida con papas",
    images: ["/images/9.jpg"],
  },
  "brownie-helado": {
    name: "Brownie con Helado",
    price: "₡5500",
    description: "Delicioso brownie tibio con helado de vainilla y salsa de chocolate",
    images: ["https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800"],
  },
  TresLeches: {
    name: "Tres Leches",
    price: "₡5500",
    description: "Suave y delicioso 3 leches",
    images: ["https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800"],
  },
  
  Pinto1: {
    name: "Gallo Pinto",
    price: "₡4500",
    description:
      "Delicioso y tradicional gallo pinto costarricense, acompa;ado de huevo, tortillas, salchichon y natilla",
    images: [URL_PINTO1],
  },
  "le-blue": {
    name: "Le Blue 1/2",
    price: "₡5500",
    description:
      "1/2 libra de Angus blend Hamburguesia, queso gouda, jalea de tocino, Blue cheese mayo, coronada con cebolla crispy, en nuestro pan Brioche artesanal",
    images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"],
  },
  "say-cheeese": {
    name: "Say Cheeese",
    price: "₡5500",
    description:
      "Angus Blend Hamburguesia, cebollas caramelizadas con maple y ron añejo, papas crunch, pinky spice mayo, mucho queso cheddar fundido, lluvia de bacon y pan artesanal",
    images: ["https://images.unsplash.com/photo-1550547660-d9450f859349?w=800"],
  },
  
  "la-crack": {
    name: "La Crack",
    price: "₡5500",
    description:
      "Jugosa carne de Angus blend Hamburguesia, abrazada con doble queso cheddar, sobre una base de arúgula, contraste de ajoili de puerro y Wichu mayo",
    images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"],
  },
  "juicy-queen": {
    name: "Juicy Queen",
    price: "₡5500",
    description:
      " Carne Angus blend Hamburguesia, queso suizo, jalea de tocineta, coronados con chutney de mango",
    images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"],
  },
  "cheesy-kissy": {
    name: "Cheesy Kissy",
    price: "₡5500",
    description:
      '  1/2 libra de nuestro Angus blend, rellena de quesos fundidos (Gouday, Monterrey Jack). Cubierta de queso cheddar. Bañada con Pinkyspice Mayo Chile - Jelly de tomate en reducción de "Ron Abuelo". Coronada con lluvia de bacon & cebollas crispy. Lechuga rizada en pan artesanal.',
    images: [
      "/images/12.jpg",
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
    ],
    options: {
      breadType: "Escoge Tipo de Pan:",
      breadOptions: ["Brioche", "Pan Artesanal", "Sin Pan"],
    },
  },
  "mini-hamburguesa": {
    name: "Mini Hamburguesa",
    price: "₡5500",
    description: "Una mini hamburguesa con queso cheddar, lechuga y tomate, incluye papas fritas",
    images: ["/images/9.jpg"],
  },
}

// Current product modal state
let currentProduct = null
let currentImageIndex = 0

// Navigation system
const navigationHistory = ["splash"]

function navigateTo(viewId) {
  console.log("[v0] Navigating to:", viewId)

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
  if (!product) return

  currentProduct = product
  currentImageIndex = 0

  const modal = document.getElementById("product-modal")
  const modalImage = document.getElementById("modal-image")
  const modalTitle = document.getElementById("modal-title")
  const modalPrice = document.getElementById("modal-price")
  const modalDescription = document.getElementById("modal-description")
  const modalOptions = document.getElementById("modal-options")

  // Set content
  modalImage.src = product.images[0]
  modalTitle.textContent = product.name
  modalPrice.textContent = product.price
  modalDescription.textContent = product.description

  // Handle gallery navigation visibility
  updateGalleryNav()

  // Handle options
  if (product.options) {
    let optionsHTML = ""
    if (product.options.breadType) {
      optionsHTML += `
        <div class="modal-option">
          <h4>${product.options.breadType}</h4>
          <p>${product.options.breadOptions.join(", ")}</p>
        </div>
      `
    }
    modalOptions.innerHTML = optionsHTML
  } else {
    modalOptions.innerHTML = ""
  }

  // Show modal
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

// Initialize app
console.log("Restaurante Paku - Menú Digital")
console.log("Paraíso de Cartago, Costa Rica")
