let deferredPrompt;

// ==============================
// REGISTRAR SERVICE WORKER
// ==============================
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/static/sw.js", { scope: "/" })
        .then(() => console.log("✅ Service Worker registrado"))
        .catch(err => console.error("❌ Error registrando SW:", err));
}

// ==============================
// CONFIGURACIÓN
// ==============================
const INSTALL_COOLDOWN = 24 * 60 * 60 * 1000; // 24 horas
const lastPrompt = localStorage.getItem("pwa-install-last");
const now = Date.now();

const canShowInstall =
    !lastPrompt || now - lastPrompt > INSTALL_COOLDOWN;

// Mostrar SOLO en /login
const isLoginPage = location.pathname === "/login";

// ==============================
// EVENTO beforeinstallprompt
// ==============================
window.addEventListener("beforeinstallprompt", (e) => {
    if (!isLoginPage) return;        // ❌ fuera del login
    if (!canShowInstall) return;     // ❌ cooldown activo

    e.preventDefault();              // 🔒 control manual
    deferredPrompt = e;

    createInstallButton();
});


function createInstallButton() {
    if (document.getElementById("install-btn")) return;

    const btn = document.createElement("button");
    btn.id = "install-btn";
    btn.textContent = "Instalar App";
    btn.className = "install-btn";

    document.body.appendChild(btn);

    // Registrar que se mostró
    localStorage.setItem("pwa-install-last", Date.now());

    btn.addEventListener("click", async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;

        deferredPrompt = null;
        btn.remove();
    });
}
