// ==============================
// FansManager Pro - main.js
// ==============================

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu?.querySelectorAll("a") || [];
const faqItems = document.querySelectorAll(".faq-item");
const revealElements = document.querySelectorAll(".reveal");
const year = document.getElementById("currentYear");

// Navbar con efecto al hacer scroll
function handleNavbarScroll() {
  if (window.scrollY > 24) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();

// Menú móvil
function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeMobileMenu();
});

// FAQ: solo una pregunta abierta a la vez
faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  const icon = item.querySelector(".faq-icon");

  button.addEventListener("click", () => {
    const wasActive = item.classList.contains("active");

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
      const otherButton = otherItem.querySelector(".faq-question");
      const otherIcon = otherItem.querySelector(".faq-icon");
      otherButton.setAttribute("aria-expanded", "false");
      otherIcon.textContent = "+";
    });

    if (!wasActive) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      icon.textContent = "−";
    }
  });
});

// Animaciones suaves al entrar en viewport
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Año automático
if (year) {
  year.textContent = new Date().getFullYear();
}
