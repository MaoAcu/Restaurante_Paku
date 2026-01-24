let deferredPrompt;

// Registrar SW
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Error SW:", err));
}

// Detectar contexto
const isMenu = location.pathname.startsWith("/menu");
const isDashboard = location.pathname.startsWith("/login");

// Evento que instala
window.addEventListener("beforeinstallprompt", (e) => {
  if (!isMenu && !isDashboard) return;

  e.preventDefault();
  deferredPrompt = e;
  createInstallButton();
});

function createInstallButton() {
  if (document.getElementById("install-btn")) return;

  const installBtn = document.createElement("button");
  installBtn.id = "install-btn";
  installBtn.textContent = "Instalar App";
  installBtn.classList.add("install-btn");

  document.body.appendChild(installBtn);

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    installBtn.remove();
  });
}
