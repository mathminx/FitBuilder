const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
});

// Click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  butInstall.setAttribute("disabled", true);
  butInstall.textContent = "Installed";
});

// Handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
});
