/* Maileny Skincare - configuración inicial
   IMPORTANTE: reemplaza el número de WhatsApp en la constante WHATSAPP_NUMBER.
   Usa el formato internacional solo con dígitos, sin +, espacios ni guiones.
*/
const WHATSAPP_NUMBER = "1809XXXXXXXX"; // Cambiar por el número real de Maileny Skincare.

document.addEventListener("DOMContentLoaded", () => {
  // Año automático en el pie de página.
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Enlaces de WhatsApp con mensajes predefinidos.
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (WHATSAPP_NUMBER.includes("X") || WHATSAPP_NUMBER.length < 10) {
        alert("Antes de publicar, agrega el número real de WhatsApp en js/main.js.");
        return;
      }
      const message = link.dataset.message || "Hola, Maileny Skincare. Quiero más información.";
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  // Cierra el menú móvil al elegir una sección.
  document.querySelectorAll("#mainNav .nav-link").forEach((navLink) => {
    navLink.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      if (nav && nav.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  // Animaciones suaves al entrar en pantalla.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Galería con vista ampliada.
  const galleryModal = document.getElementById("galleryModal");
  const galleryImage = document.getElementById("galleryModalImage");
  if (galleryModal && galleryImage && window.bootstrap) {
    const modal = bootstrap.Modal.getOrCreateInstance(galleryModal);
    document.querySelectorAll("[data-gallery-src]").forEach((item) => {
      item.addEventListener("click", () => {
        galleryImage.src = item.dataset.gallerySrc;
        galleryImage.alt = item.querySelector("img")?.alt || "Imagen de Maileny Skincare";
        modal.show();
      });
    });
    galleryModal.addEventListener("hidden.bs.modal", () => { galleryImage.src = ""; });
  }
});
