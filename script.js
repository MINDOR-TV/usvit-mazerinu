// === Globální favicon pro všechny podstránky ===
(function setGlobalFavicon() {
  const url = "https://mindor-tv.github.io/usvit-mazerinu/assets/usvit_mazerinu_logo.png";
  document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(el => el.remove());

  const createIcon = (rel) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.type = "image/png";
    link.href = url;
    document.head.appendChild(link);
  };

  createIcon("icon");
  createIcon("shortcut icon");
  createIcon("apple-touch-icon");
})();

// --- Konfigurace menu ---
const menuData = {
  "Hlavní stránka": "https://mindor-tv.github.io/usvit-mazerinu/index.html",
  "Družina": [
    { name: "Adolfo Derion", url: "https://mindor-tv.github.io/usvit-mazerinu/postavy/adolfo/adolfo.html" },
    { name: "Alexander Woods", url: "https://mindor-tv.github.io/usvit-mazerinu/postavy/alex/alex.html" },
    { name: "Gorik Hammersy", url: "https://mindor-tv.github.io/usvit-mazerinu/postavy/gorik/gorik.html" },
    { name: "Richmond Edmunze", url: "https://mindor-tv.github.io/usvit-mazerinu/postavy/richmond/richmond.html" } 
  ],
  "Místa": [],
  "NPC": [],
  "Spellbook": [
    { name: "Bard", url: "https://dnd5e.wikidot.com/spells:bard" },
    { name: "Cleric", url: "https://dnd5e.wikidot.com/spells:cleric" },
    { name: "Druid", url: "https://dnd5e.wikidot.com/spells:druid" },
    { name: "Paladin", url: "https://dnd5e.wikidot.com/spells:paladin" },
    { name: "Ranger", url: "https://dnd5e.wikidot.com/spells:ranger" },
    { name: "Sorcerer", url: "https://dnd5e.wikidot.com/spells:sorcerer" },
    { name: "Warlock", url: "https://dnd5e.wikidot.com/spells:warlock" },
    { name: "Wizard", url: "https://dnd5e.wikidot.com/spells:wizard" }
  ],
  "Cheatsheet": "https://mindor-tv.github.io/usvit_mazerinu/cheatsheet.html"
};

// === LEVÉ MENU ===
const menuContainer = document.getElementById("side-menu");
const toggleBtn = document.getElementById("menu-toggle");

if (menuContainer && toggleBtn) {
  function createSubmenu(items, parentCategory) {
    const submenu = document.createElement("div");
    submenu.classList.add("submenu");

    items.forEach(item => {
      if (item.url) {
        const link = document.createElement("a");
        link.textContent = item.name;
        link.href = item.url;
        if (parentCategory === "Spellbook") {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        submenu.appendChild(link);
      } else if (typeof item === "object") {
        const key = Object.keys(item)[0];
        const nestedHeader = document.createElement("div");
        nestedHeader.textContent = key;
        nestedHeader.classList.add("menu-category", "nested-category");

        const nestedSubmenu = createSubmenu(item[key]);
        nestedHeader.addEventListener("click", () => nestedSubmenu.classList.toggle("visible"));

        submenu.appendChild(nestedHeader);
        submenu.appendChild(nestedSubmenu);
      }
    });
    return submenu;
  }

  Object.keys(menuData).forEach(category => {
    const section = document.createElement("div");
    section.classList.add("menu-section");
    const value = menuData[category];

    if (typeof value === "string") {
      const link = document.createElement("a");
      link.textContent = category;
      link.href = value;
      link.classList.add("menu-category", "direct-link");
      section.appendChild(link);
      menuContainer.appendChild(section);
      return;
    }

    const header = document.createElement("div");
    header.textContent = category;
    header.classList.add("menu-category");
    section.appendChild(header);

    const submenu = createSubmenu(value, category);
    header.addEventListener("click", () => submenu.classList.toggle("visible"));

    section.appendChild(submenu);
    menuContainer.appendChild(section);
  });
  
  (function addExternalLink() {
    menuContainer.style.display = "flex";
    menuContainer.style.flexDirection = "column";
    menuContainer.style.overflowY = "auto";

    const section = document.createElement("div");
    section.classList.add("menu-section");
    section.style.marginTop = "auto";

    const link = document.createElement("a");
    link.textContent = "Oblagun";
    link.href = "https://mindor-tv.github.io/oblagun/index.html";
    link.classList.add("menu-category", "direct-link");

    section.appendChild(link);
    menuContainer.appendChild(section);
  })();

  toggleBtn.addEventListener("click", () => menuContainer.classList.toggle("visible"));
}

// === Zvýraznění aktuální stránky ===
const currentUrl = window.location.href;
const links = menuContainer?.querySelectorAll("a") || [];

links.forEach(link => {
  if (link.href === currentUrl) {
    link.style.color = "#ffcc66";
    let parent = link.parentElement;
    while (parent && parent !== menuContainer) {
      if (parent.classList.contains("submenu")) parent.classList.add("visible");
      const header = parent.previousElementSibling;
      if (header && header.classList.contains("menu-category")) header.style.color = "#ffcc66";
      parent = parent.parentElement;
    }
  }
});

// === PRAVÝ SLIDER OBRÁZKŮ ===
const imagesToggle = document.getElementById("images-toggle");
const characterSlider = document.getElementById("character-slider");

if (imagesToggle && characterSlider) {
  imagesToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    characterSlider.classList.toggle("visible");
  });
  document.addEventListener("click", (e) => {
    if (!characterSlider.contains(e.target) && !imagesToggle.contains(e.target)) {
      characterSlider.classList.remove("visible");
    }
  });
}

// === LIGHTBOX ===
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const images = document.querySelectorAll('.character-image');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.close');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  let currentIndex = 0;

  function showImage() {
    if (images.length === 0) return;
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.getAttribute('data-caption') || '';
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage();
      lightbox.style.display = 'flex';
    });
  });

  if (nextBtn) nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % images.length; showImage(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + images.length) % images.length; showImage(); });
  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') lightbox.style.display = 'none';
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    }
  });
}

// === KARTY (Rozcestník) - Fix pozice dolů ===
const mainCards = document.querySelectorAll(".main-card");
const allSubcards = document.querySelectorAll(".subcards");

mainCards.forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = card.dataset.target;
    const target = document.getElementById(targetId);

    if (!target) return;

    // Zavřít ostatní
    allSubcards.forEach(sc => {
      if (sc !== target) sc.style.display = "none";
    });

    // Toggle zobrazení
    const isVisible = target.style.display === "flex";
    target.style.display = isVisible ? "none" : "flex";

    if (!isVisible) {
      // Použijeme offsetTop místo getBoundingClientRect, 
      // protože offsetTop není ovlivněn CSS transformací (scale při hoveru)
      const parent = card.parentElement;
      
      // Umístění natvrdo pod kartu
      target.style.top = (card.offsetTop + card.offsetHeight) + "px";
      target.style.left = card.offsetLeft + "px";

    }
  });
});