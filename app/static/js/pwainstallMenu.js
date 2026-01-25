let deferredPrompt;

//configuracion minima
const INSTALL_VISIBLE_TIME = 6000; 
const INSTALL_COOLDOWN = 24 * 60 * 60 * 1000; 
const isMenuPage = location.pathname.startsWith("/Menu");

const lastPrompt = localStorage.getItem("menu-pwa-last");
const now = Date.now();

const canShowInstall =
  !lastPrompt || now - lastPrompt > INSTALL_COOLDOWN;

// registra service worher
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/static/sw-menu.js", { scope: "/" })
    .then(() => console.log("SW Menu registrado"))
    .catch(err => console.error(" Error SW Menu:", err));
}

// instalar beforeinstall
window.addEventListener("beforeinstallprompt", (e) => {
  if (!isMenuPage) return;
  if (!canShowInstall) return;

  e.preventDefault();
  deferredPrompt = e;

  showInstallButton();
});

// btn instalar
function showInstallButton() {
  if (document.getElementById("install-btn")) return;

  const btn = document.createElement("button");
  btn.id = "install-btn";
  btn.textContent = "Instalar Menú";
  btn.className = "install-btn";

  document.body.appendChild(btn);
  localStorage.setItem("menu-pwa-last", Date.now());

  const removeButton = () => {
    btn.remove();
    window.removeEventListener("scroll", removeButton);
    window.removeEventListener("click", removeButton);
  };

  // Auto-ocultar
  setTimeout(removeButton, INSTALL_VISIBLE_TIME);

  // Cualquier interaccion lo oculta
  window.addEventListener("scroll", removeButton, { once: true });
  window.addEventListener("click", removeButton, { once: true });

  // Instalar
  btn.addEventListener("click", async (e) => {
    e.stopPropagation();

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    removeButton();
  });
}
