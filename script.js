// === Globální favicon pro všechny podstránky ===
(function setGlobalFavicon() {
  const url = "https://mindor-tv.github.io/popel_trisiasu/assets/z_popela_logo.png";

  // smažeme staré favicony (pokud nějaké jsou)
  document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(el => el.remove());

  // vytvoříme nové
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

// === FAVICON ===
(function setFavicon(url) {
  const head = document.head;

  function upsert(rel, href, extra = {}) {
    let link = head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      head.appendChild(link);
    }
    Object.entries(extra).forEach(([k, v]) => (link[k] = v));
    link.href = href;
  }

  // Standard favicon
  upsert("icon", url, { type: "image/png" });
  // Pro starší prohlížeče
  upsert("shortcut icon", url, { type: "image/png" });
  // iOS/Android PWA dlaždice (nebývá na škodu)
  upsert("apple-touch-icon", url, {});

})("https://mindor-tv.github.io/popel_trisiasu/assets/z_popela_logo.png");


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
   // { name: "Malý Děvkov", url: "https://mindor-tv.github.io/usvit-mazerinu/postavy/adolfo/adolfo.html" },
  ],
  "NPC": [
   // { name: "Giblin Parfell", url: "https://mindor-tv.github.io/usvit-mazerinu/postavy/adolfo/adolfo.html" },
  ],
  /*"Božstvo": [
    { name: "Celkový přehled bohů", url: "https://mindor-tv.github.io/popel_trisiasu/bohove/bohove.html" },
    { "Vyšší Pantheon": [
      { name: "Marlůvar", url: "https://mindor-tv.github.io/popel_trisiasu/bohove/marluvar.html" },
      { name: "Ilnur", url: "https://mindor-tv.github.io/popel_trisiasu/bohove/ilnur.html" },
      { name: "Glordi", url: "https://mindor-tv.github.io/popel_trisiasu/bohove/glordi.html" },
      { name: "Malté", url: "https://mindor-tv.github.io/popel_trisiasu/bohove/malte.html" },
      { name: "Monaryn", url: "https://mindor-tv.github.io/popel_trisiasu/bohove/monaryn.html" },
      { name: "Tórlien", url: "https://mindor-tv.github.io/popel_trisiasu/bohove/torlien.html" }
    ]},
    { "Nižší Pantheon": [
      { name: "Mondyl", url: "https://mindor-tv.github.io/popel_trisiasu/bohove/nizsi_bohove/mondyl/mondyl.html" }
    ]},
  ],*/
  //"Dějiny Oblagunu": "https://mindor-tv.github.io/popel_trisiasu/dejiny-oblagunu.html",
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
  "Cheatsheet": "https://mindor-tv.github.io/popel_trisiasu/cheatsheet.html"
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
        nestedHeader.addEventListener("click", () => {
          nestedSubmenu.classList.toggle("visible");
        });

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
    header.addEventListener("click", () => {
      submenu.classList.toggle("visible");
    });

    section.appendChild(submenu);
    menuContainer.appendChild(section);
  });
  
 // --- Přidání externího odkazu úplně dolů levého slideru ---
(function addExternalLink() {
  const menuContainer = document.getElementById("side-menu");
  if (!menuContainer) return;

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

  toggleBtn.addEventListener("click", () => {
    menuContainer.classList.toggle("visible");
  });
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

const images = document.querySelectorAll('.character-image');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = 'flex';
  });
});

function showImage() {
  const img = images[currentIndex];
  lightboxImg.src = img.src;
  lightboxCaption.textContent = img.getAttribute('data-caption') || '';
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.style.display = 'none';
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
});
