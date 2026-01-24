let deferredPrompt;

//registar el server worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/static/service-worker.js", { scope: "/" })
        .then(() => console.log("✅ Service Worker registrado"))
        .catch(err => console.error("❌ Error registrando SW:", err));
}

// configuracion basica
const INSTALL_COOLDOWN = 24 * 60 * 60 * 1000; // 24 horas
const lastPrompt = localStorage.getItem("pwa-install-last");
const now = Date.now();

const canShowInstall =
    !lastPrompt || now - lastPrompt > INSTALL_COOLDOWN;

// Mostrar solo en login y menu
const allowedPaths = ["/login", "/Menu"];
const canShowOnThisPage = allowedPaths.includes(location.pathname);

//evento pwa
window.addEventListener("beforeinstallprompt", (e) => {
    if (!canShowOnThisPage) return;
    if (!canShowInstall) return;

    e.preventDefault();
    deferredPrompt = e;

    createInstallButton();
});

// boton de instalacion
function createInstallButton() {
    if (document.getElementById("install-btn")) return;

    const btn = document.createElement("button");
    btn.id = "install-btn";
    btn.textContent = "Instalar App";
    btn.className = "install-btn";

    document.body.appendChild(btn);

    localStorage.setItem("pwa-install-last", Date.now());

    btn.addEventListener("click", async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;

        deferredPrompt = null;
        btn.remove();
    });
}
