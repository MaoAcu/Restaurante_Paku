let deferredPrompt;

//configuracion minima
const INSTALL_VISIBLE_TIME = 6000; 
const INSTALL_COOLDOWN = 24 * 60 * 60 * 1000; 
const now = Date.now();


// Registrar el Service Worker primero
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js", { scope: '/' })
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Error SW:", err));
}

// Escuchar beforeinstallprompt laza el evento si la aplicacion cumple los requisitos
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Evita el prompt automatico
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
 

  const removeButton = () => {
    btn.remove();
    
  };

  // Auto-ocultar
  setTimeout(removeButton, INSTALL_VISIBLE_TIME);

 

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
