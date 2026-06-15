/* ==========================================================================
   1. GESTION DU THÈME (MODE SOMBRE / CLAIR)
   ========================================================================== */
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

if (toggleBtn) {
  // Charger le thème sauvegardé dans le navigateur de l'utilisateur
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

/* ==========================================================================
   2. MENU MOBILE (HAMBURGER)
   ========================================================================== */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Changer l'icône selon l'état
    if (navLinks.classList.contains("active")) {
      menuToggle.textContent = "✖";
    } else {
      menuToggle.textContent = "☰";
    }
  });

  // Fermer le menu mobile automatiquement quand on clique sur un lien d'ancre
  document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.textContent = "☰";
    });
  });
}

/* ==========================================================================
   3. EFFET D'ÉCRITURE (TYPING EFFECT)
   ========================================================================== */
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

    // Ajustement de la vitesse (plus rapide quand on efface)
    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      speed = 1500; // Pause quand le mot est complet
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length; // Passer au mot suivant
      speed = 500; // Petite pause avant d'écrire le nouveau mot
    }

    setTimeout(typeEffect, speed);
  }

  // Lancement de l'effet
  setTimeout(typeEffect, 200);
}

/* ==========================================================================
   4. FILTRAGE INTERACTIF DES PROJETS
   ========================================================================== */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Retirer la classe active du bouton précédent et l'ajouter au nouveau
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      // Si "tous" ou si la carte contient la classe demandée
      if (filterValue === "all" || card.classList.contains(filterValue)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

/* ==========================================================================
   5. ANIMATIONS AU SCROLL AVANCÉES (INTERSECTION OBSERVER)
   ========================================================================== */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("#navLinks a");

// 1. Ajouter dynamiquement des délais (Stagger effect) sur les cartes avant le scroll
document.querySelectorAll(".skills-grid, .project-grid").forEach((grid) => {
  const cards = grid.children;
  Array.from(cards).forEach((card, index) => {
    // Chaque carte aura 150ms de délai de plus que la précédente
    card.style.transitionDelay = `${index * 0.15}s`;
  });
});

// Configuration de l'observateur
const observerOptions = {
  root: null,
  threshold: 0.15, // Déclenche un peu plus tôt pour plus de fluidité
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Activer l'animation de la section
      entry.target.classList.add("visible");

      // Mettre à jour le menu de navigation
      const id = entry.target.getAttribute("id");
      navItems.forEach((item) => {
        if (item.getAttribute("href") === `#${id}`) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  });
}, observerOptions);

// Lancer l'observation sur chaque section
sections.forEach((section) => {
  sectionObserver.observe(section);
});
// Décalage pour les textes des sections au scroll
document.querySelectorAll(".section-reveal").forEach((section) => {
  const children = section.querySelectorAll(".animate-child");
  children.forEach((child, index) => {
    child.style.transitionDelay = `${index * 0.1}s`;
  });
});
/* ==========================================================================
   6. SYSTÈME LIGHTBOX (ZOOM DES IMAGES DE PROJETS)
   ========================================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeBtn = document.querySelector(".lightbox-close");

// Sélectionner toutes les images situées dans tes cartes de projets
const projectImages = document.querySelectorAll(".project-card img");

projectImages.forEach((img) => {
  img.addEventListener("click", () => {
    // 1. Récupérer le titre du projet correspondant à l'image cliquée
    const projectTitle =
      img.parentElement.querySelector("h3")?.textContent || "";

    // 2. Injecter la source de l'image et la légende dans la lightbox
    lightboxImg.src = img.src;
    lightboxCaption.textContent = projectTitle;

    // 3. Afficher la lightbox avec l'animation
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden"; // Bloque le scroll de la page en arrière-plan
  });
});

// Fermer la lightbox en cliquant sur la croix
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto"; // Réactive le scroll de la page
  });
}

// Fermer la lightbox automatiquement si l'utilisateur clique en dehors de l'image
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  });
}
/* ==========================================================================
   7. CALCUL DU POSITIONNEMENT EN ORBITE 3D (CORRIGÉ RESPONSIVE)
   ========================================================================== */
const orbitWrap = document.getElementById("orbitWrap");

if (orbitWrap) {
  const cards = orbitWrap.querySelectorAll(".orbit-card");
  const totalCards = cards.length;

  // Fonction pour définir les rayons selon la taille de l'écran
  function getOrbitRadii() {
    if (window.innerWidth <= 768) {
      return { radiusX: 160, radiusZ: 70 }; // Dimensions adaptées au mobile (Moitié de 320px et 140px)
    } else {
      return { radiusX: 350, radiusZ: 110 }; // Dimensions d'origine pour ordinateur
    }
  }

  let { radiusX, radiusZ } = getOrbitRadii();

  // Écouter le redimensionnement de l'écran pour recalculer les rayons en direct
  window.addEventListener("resize", () => {
    const radii = getOrbitRadii();
    radiusX = radii.radiusX;
    radiusZ = radii.radiusZ;
  });

  cards.forEach((card, i) => {
    // Calcul de l'angle fixe pour répartir les compétences sur le cercle
    const angle = (i / totalCards) * Math.PI * 2;

    function counterRotate() {
      // 1. Calculer les positions X et Z en utilisant les rayons dynamiques (PC ou mobile)
      const x = Math.cos(angle) * radiusX;
      const z = Math.sin(angle) * radiusZ;

      // 2. Analyser la rotation globale actuelle de l'anneau parent
      const computedStyle = window.getComputedStyle(orbitWrap);
      const matrix = new WebKitCSSMatrix(computedStyle.transform);
      const currentYAngle = Math.atan2(-matrix.m13, matrix.m11);

      // 3. Appliquer la translation 3D ET annuler la rotation pour faire face à l'utilisateur
      card.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${-currentYAngle}rad)`;

      // 4. Effet d'échelle basé sur la profondeur (Z)
      const scale = ((z + radiusZ) / (2 * radiusZ)) * 0.3 + 0.85; // Échelle douce entre 0.85 et 1.15
      card.style.transform += ` scale(${scale})`;

      // 5. Gestion de l'empilement (Z-index) pour éviter que l'arrière passe devant
      card.style.zIndex = z > 0 ? 10 : 2;

      requestAnimationFrame(counterRotate);
    }

    requestAnimationFrame(counterRotate);
  });
}
