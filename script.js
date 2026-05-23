const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");
const toast = document.querySelector(".toast");
let toastTimer;

function updateHeaderLogo() {
  siteHeader?.classList.toggle("logo-hidden", window.scrollY > 120);
}

function updateHeaderLogoAfterLayout() {
  requestAnimationFrame(updateHeaderLogo);
  window.setTimeout(updateHeaderLogo, 120);
}

updateHeaderLogo();
window.addEventListener("scroll", updateHeaderLogo, { passive: true });
window.addEventListener("load", updateHeaderLogoAfterLayout);
window.addEventListener("hashchange", updateHeaderLogoAfterLayout);

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".gallery button, .scrapbook-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  lightboxImage.alt = "";
}

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

async function copyEmail(email) {
  try {
    await navigator.clipboard.writeText(email);
    showToast(`Email address copied: ${email}`);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = email;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    showToast(`Email address copied: ${email}`);
  }
}

document.querySelectorAll(".copy-email").forEach((button) => {
  button.addEventListener("click", () => {
    copyEmail(button.dataset.email || "contact@RememberRyanFoundation.org");
  });
});

document.querySelectorAll(".donate-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.assign(button.href);
  });
});
