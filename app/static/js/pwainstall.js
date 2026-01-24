let deferredPrompt;

const INSTALL_VISIBLE_TIME = 6000; // 6 segundos
const INSTALL_COOLDOWN = 24 * 60 * 60 * 1000; // 24 horas

// Registrar SW
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

// Detectar contexto donde eesta el usuario
const isMenu = location.pathname.startsWith("/menu");
const isDashboard = location.pathname.startsWith("/dashboard");

// Evitar spam
const lastPrompt = localStorage.getItem("pwa-install-last");
const now = Date.now();
const canShowInstall =
  !lastPrompt || now - lastPrompt > INSTALL_COOLDOWN;

// Evento PWA
window.addEventListener("beforeinstallprompt", (e) => {
  if (!isMenu && !isDashboard) return;
  if (!canShowInstall) return;

  e.preventDefault();
  deferredPrompt = e;

  showInstallButton();
});

function showInstallButton() {
  if (document.getElementById("install-btn")) return;

  const btn = document.createElement("button");
  btn.id = "install-btn";
  btn.textContent = "Instalar App";
  btn.classList.add("install-btn");

  document.body.appendChild(btn);
  localStorage.setItem("pwa-install-last", Date.now());

  const removeButton = () => {
    btn.remove();
    window.removeEventListener("scroll", removeButton);
    window.removeEventListener("click", removeButton);
  };

  // Interaccion del usuario quita el btn
  window.addEventListener("scroll", removeButton, { once: true });
  window.addEventListener("click", removeButton, { once: true });

  // Tiempo maximo visible
  setTimeout(removeButton, INSTALL_VISIBLE_TIME);

  // Click explicito para instalar
  btn.addEventListener("click", async (e) => {
    e.stopPropagation(); // evita cerrar antes de instalar

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    removeButton();
  });
}
