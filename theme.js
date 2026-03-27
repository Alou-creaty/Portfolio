/* =========================
   THEME (MODE SOMBRE)
========================= */
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

if (toggleBtn) {
  // Charger thème sauvegardé
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
    }
  });
}

/* =========================
   MENU MOBILE
========================= */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // changer icône
    if (navLinks.classList.contains("active")) {
      menuToggle.textContent = "✖";
    } else {
      menuToggle.textContent = "☰";
    }
  });

  // fermer menu quand on clique sur un lien
  document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.textContent = "☰";
    });
  });
}

/* =========================
   TYPING EFFECT
========================= */
const texts = [
  "Développeur Web & Mobile",
  "Développeur Full Stack",
  "Créateur d'applications modernes",
  "Passionné de technologie",
];

const typingText = document.getElementById("typing-text");

if (typingText) {
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[index];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingText.textContent = currentText.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      speed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
      speed = 300;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}
