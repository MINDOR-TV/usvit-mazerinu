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
    //{ name: "Stogorin", url: "https://mindor-tv.github.io/popel_trisiasu/postavy/stogorin/character.html" },
    { name: "", url: "https://mindor-tv.github.io/popel_trisiasu/postavy/aeriel/character.html" },
    { name: "Bogdan", url: "https://mindor-tv.github.io/popel_trisiasu/postavy/bogdan/character.html" },
    { name: "Celeana Dawnshield", url: "https://mindor-tv.github.io/popel_trisiasu/postavy/celeana/character.html" },
    { name: "Ofélie", url: "https://mindor-tv.github.io/popel_trisiasu/postavy/ofelie/character.html" }, 
    { name: "Thalor", url: "https://mindor-tv.github.io/popel_trisiasu/postavy/thalor/character.html" }
  ],
  "Mapy": [
    { name: "Oblagun", url: "https://mindor-tv.github.io/popel_trisiasu/mapy/oblagun.html" },
    { name: "Trisias", url: "https://mindor-tv.github.io/popel_trisiasu/mapy/trisias.html" },
  ],
  "Místa": [
    /*{ "Ostrovy Gunner": [
    ]},
    { "Mazerin": [
    ]},*/
    { "Trisias": [
      { "Království Allveir": [
        { name: "Averindor", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/averindor/averindor.html" },
        { name: "Černé Hory", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/cerne_hory/cerne_hory.html" },
        { name: "Horní Krupá", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/horni_krupa/horni_krupa.html" },
        { name: "Kamenolec", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/kamenolec/kamenolec.html" },
        { name: "Ostrokolí", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/ostrokoli/ostrokoli.html" },
        { name: "Prachovice", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/prachovice/prachovice.html" },
        { name: "Smrčná", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/smrcna/smrcna.html" },
        { name: "Stříbrná Rokle", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/stribrna_rokle/stribrna_rokle.html" },
        { name: "Suchý Pahorek", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/suchy_pahorek/suchy_pahorek.html" },
        { name: "Trisiaský Trezor", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/kralovstvi_severniho_lidu/trisiasky_trezor/trisiasky_trezor.html" }
      ]},
      { "Království Morvallat": [
        { name: "Dûm Karak", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/dum_karak/dum_karak.html" },
        { name: "Faünerithler", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/faunerithler/faunerithler.html" },
        { name: "Hvozdlina", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/hvozdlina/hvozdlina.html" },
        { name: "Lešijky", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/lesijky/lesijky.html" },
        { name: "Monaryn", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/monaryn/monaryn_mesto.html" },
        { name: "Popelgrad", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/popelgrad/popelgrad.html" },
        { name: "Prachtemir", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/prachtemir/prachtemir.html" },
        { name: "Praskliny", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/praskliny/praskliny.html" },
        { name: "Sky Reach", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/sky_reach/sky_reach.html" },
        { name: "Trilldas", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/trilldas/trilldas.html" },
        { name: "Záhořlice", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/zahorlice/zahorlice.html" },
        { name: "Zlatohrádek", url: "https://mindor-tv.github.io/popel_trisiasu/mista/trisias/monarynske_kralovstvi/zlatohradek/zlatohradek.html" }
      ]}
    ]},
    /*{ "Tromin": [
    ]},*/
  ],
  "NPC": [
    { name: "Ariana Dawnshield", url:"https://mindor-tv.github.io/popel_trisiasu/NPC/ariana_minstrell.html" },
    { name: "Aurora Dawnshield", url:"https://mindor-tv.github.io/popel_trisiasu/NPC/aurora.html" },
    { name: "Benjamin Dawnshield", url:"https://mindor-tv.github.io/popel_trisiasu/NPC/benjamin.html" },
    { name: "Chaol Dawnshield", url:"https://mindor-tv.github.io/popel_trisiasu/NPC/chaol.html" },
    { name: "Dudo", url:"https://mindor-tv.github.io/popel_trisiasu/NPC/dudo.html" },
    { name: "Eliška ze mlejna", url:"https://mindor-tv.github.io/popel_trisiasu/NPC/eliska_ze_mlejna.html" },
    { name: "Folken", url: "https://mindor-tv.github.io/popel_trisiasu/NPC/folken.html" },
    { name: "Jindřich ze mlejna", url:"https://mindor-tv.github.io/popel_trisiasu/NPC/jindrich_ze_mlejna.html" },
    { name: "Marcel", url: "https://mindor-tv.github.io/popel_trisiasu/NPC/marcel.html" },
    { name: "Oren Talld", url: "https://mindor-tv.github.io/popel_trisiasu/NPC/oren_talld.html" },
    { name: "Pavel Perlík", url:"https://mindor-tv.github.io/popel_trisiasu/NPC/pavel_perlik.html" },
    { name: "Plea", url: "https://mindor-tv.github.io/popel_trisiasu/NPC/plea.html" },
    { name: "Sarajev Slim", url:"https://mindor-tv.github.io/popel_trisiasu/NPC/sarajev_slim.html" },
    { name: "Starosta Velebníček", url: "https://mindor-tv.github.io/popel_trisiasu/NPC/starosta_velebnicek.html" },
    { name: "Štěpán", url: "https://mindor-tv.github.io/popel_trisiasu/NPC/stepan.html" },
    { name: "Vaelor Minstrell", url: "https://mindor-tv.github.io/popel_trisiasu/NPC/vaelor_minstrell.html" }
  ],
  "Božstvo": [
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
  ],
  "Dějiny Oblagunu": "https://mindor-tv.github.io/popel_trisiasu/dejiny-oblagunu.html",
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
