const menuToggle = document.getElementById("menu-toggle");
const phoneMenu = document.getElementById("phone-menu");

// Agrega un event listener al hacer clic
menuToggle.addEventListener("click", function() {
    // Alterna la visibilidad del menú
    if (phoneMenu.style.display === "block") {
        phoneMenu.style.display = "none";
    } else {
        phoneMenu.style.display = "block";
    }
});

const menuLinks = document.querySelectorAll(".phone-menu a");

// Agregar event listeners a cada enlace para ocultar el menú al hacer clic
menuLinks.forEach(link => {
    link.addEventListener("click", function() {
        // Oculta el menú cuando un enlace es seleccionado
        phoneMenu.style.display = "none";
    });
});