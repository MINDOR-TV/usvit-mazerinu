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
  "Místa": [
   /*{ name: "Čmeledon", url: "https://mindor-tv.github.io/usvit-mazerinu/mista/cmeledon.html" },
    { name: "Horní Dolní", url: "https://mindor-tv.github.io/usvit-mazerinu/mista/horni_dolni.html" },
    { name: "Malý Děvkov", url: "https://mindor-tv.github.io/usvit-mazerinu/mista/maly_devkov.html" },
    { name: "Marbolen", url: "https://mindor-tv.github.io/usvit-mazerinu/mista/marbolen.html" }*/
  ],
  "NPC": [
    { name: "Giblin Parfell", url: "https://mindor-tv.github.io/usvit-mazerinu/NPC/giblin/giblin.html" },
    { name: "Velká Berta", url: "https://mindor-tv.github.io/usvit-mazerinu/NPC/velka_berta/velka_berta.html" } 
  ],
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
  //"Cheatsheet": "https://mindor-tv.github.io/usvit_mazerinu/cheatsheet.html"
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

    header.addEventListener("click", (e) => {
      e.stopPropagation();
      submenu.classList.toggle("visible");
    });

    section.appendChild(submenu);
    menuContainer.appendChild(section);
  });

  // Spodní odkaz
  (function addExternalLink() {
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

  // Toggle menu
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menuContainer.classList.toggle("visible");
  });

  // Klik mimo = zavřít
  document.addEventListener("click", (e) => {
    if (!menuContainer.contains(e.target) && !toggleBtn.contains(e.target)) {
      menuContainer.classList.remove("visible");
    }
  });

  // Zvýraznění aktuální stránky
  const currentUrl = window.location.href;
  const links = menuContainer.querySelectorAll("a");

  links.forEach(link => {
    if (link.href === currentUrl) {
      link.style.color = "#ffcc66";

      let parent = link.parentElement;
      while (parent && parent !== menuContainer) {
        if (parent.classList.contains("submenu")) parent.classList.add("visible");

        const header = parent.previousElementSibling;
        if (header && header.classList.contains("menu-category")) {
          header.style.color = "#ffcc66";
        }

        parent = parent.parentElement;
      }
    }
  });
}

// === PRAVÝ SLIDER ===
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

// === ESC zavírání ===
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menuContainer?.classList.remove("visible");
    characterSlider?.classList.remove("visible");
  }
});

// === LIGHTBOX ===
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const images = document.querySelectorAll('#character-slider img');
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

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  });

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  });

  closeBtn?.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
}

// === KARTY ===
const mainCards = document.querySelectorAll(".main-card");
const allSubcards = document.querySelectorAll(".subcards");

mainCards.forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.getElementById(card.dataset.target);
    if (!target) return;

    allSubcards.forEach(sc => {
      if (sc !== target) sc.style.display = "none";
    });

    const isVisible = target.style.display === "flex";
    target.style.display = isVisible ? "none" : "flex";

    if (!isVisible) {
      target.style.top = (card.offsetTop + card.offsetHeight) + "px";
      target.style.left = card.offsetLeft + "px";
    }
  });
});
